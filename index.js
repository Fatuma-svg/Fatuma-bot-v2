import pkg from '@whiskeysockets/baileys';
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore 
} = pkg;
import { Boom } from '@hapi/boom';
import Pino from 'pino';
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionFolder = process.env.SESSION_FOLDER || './auth_info_multi';
const store = makeInMemoryStore({ logger: Pino().child({ level: 'silent', stream: 'store' }) });

async function startSock() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionFolder);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        printQRInTerminal: true,
        auth: state,
        logger: Pino({ level: 'silent' }),
        browser: ['Ben Whittaker Tech', 'Safari', '1.0.0']
    });

    store.bind(sock.ev);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed, reconnecting:', shouldReconnect);
            if (shouldReconnect) startSock();
        } else if (connection === 'open') {
            console.log('Ben Whittaker Tech iko connected! Mumeyakanyanga nyie watu! 😂😂😂');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        try {
            const msg = messages[0];
            if (!msg.message || msg.key.fromMe) return;

            const from = msg.key.remoteJid;
            const type = Object.keys(msg.message)[0];
            const body = (type === 'conversation') ? msg.message.conversation : (msg.message[type]?.text || msg.message[type]?.caption || '');

            const prefix = process.env.PREFIX || '!';

            if (process.env.AUTO_TYPING === 'on') await sock.sendPresenceUpdate('composing', from);
            if (process.env.AUTO_RECORD === 'on') await sock.sendPresenceUpdate('recording', from);

            if (process.env.OPEN_VIEW_ONCE === 'on' && type === 'viewOnceMessageV2') {
                const originalMsg = msg.message.viewOnceMessageV2.message;
                await sock.sendMessage(from, { forward: originalMsg });
            }

            // Commands
            if (body.startsWith(prefix + 'ping')) {
                await sock.sendMessage(from, { text: 'Pong! 🥊' }, { quoted: msg });
            }

            // Load plugins
            const pluginsPath = path.join(__dirname, 'plugins');
            if (fs.existsSync(pluginsPath)) {
                fs.readdirSync(pluginsPath).forEach(async (file) => {
                    if (file.endsWith('.js')) {
                        const plugin = await import(path.join(pluginsPath, file));
                        try {
                            plugin.default(sock, msg, body, from, prefix);
                        } catch (e) {
                            console.error('Plugin error:', e);
                        }
                    }
                });
            }
        } catch (e) {
            console.error('Message handling error:', e);
        }
    });
}

startSock();
