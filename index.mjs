import { makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import Pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Boom } from '@hapi/boom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Owner Number
const ownerNumber = ['255760317060@s.whatsapp.net'];

// Setup auth
const { state, saveCreds } = await useMultiFileAuthState('./session');

// Setup logger
const logger = Pino({ level: 'silent' });

// Fetch latest Baileys version
const { version } = await fetchLatestBaileysVersion();

// Create socket
const conn = makeWASocket({
    version,
    logger,
    printQRInTerminal: true,
    auth: state,
    defaultQueryTimeoutMs: undefined,
    browser: ['Ben Whittaker Tech', 'Safari', '1.0.0'],
});

// Auto-reconnect
conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('connection closed, reconnecting...', shouldReconnect);
        if (shouldReconnect) {
            process.exit(0);
        }
    } else if (connection === 'open') {
        console.log('✅ Ben Whittaker Tech Connected!');
    }
});

// Save creds
conn.ev.on('creds.update', saveCreds);

// Auto Typing / Recording / Online Presence
conn.ev.on('messages.upsert', async (chatUpdate) => {
    const m = chatUpdate.messages[0];
    if (!m.message) return;
    if (m.key && m.key.remoteJid === 'status@broadcast') return;
    if (m.key.fromMe) return;

    await conn.sendPresenceUpdate('composing', m.key.remoteJid);
    await conn.sendPresenceUpdate('recording', m.key.remoteJid);
    await conn.sendPresenceUpdate('available', m.key.remoteJid);
});

// Plugins loading
const pluginsDir = path.join(__dirname, 'plugins');
let plugins = [];

async function loadPlugins() {
    plugins = [];
    if (!fs.existsSync(pluginsDir)) {
        fs.mkdirSync(pluginsDir, { recursive: true });
    }
    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));
    for (const file of files) {
        try {
            const pluginPath = path.join(pluginsDir, file);
            const plugin = await import(`file://${pluginPath}`);
            plugins.push(plugin.default);
            console.log(`✅ Plugin loaded: ${file}`);
        } catch (err) {
            console.error(`❌ Failed to load plugin ${file}:`, err);
        }
    }
}
await loadPlugins();

// Message event
conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const m = chatUpdate.messages[0];
        if (!m.message) return;
        if (m.key && m.key.remoteJid === 'status@broadcast') return;

        const messageType = Object.keys(m.message)[0];
        const text = (m.message.conversation || m.message.extendedTextMessage?.text || '').trim();

        const prefix = '!';
        if (!text.startsWith(prefix)) return;

        const commandBody = text.slice(prefix.length).trim().split(' ')[0].toLowerCase();
        const args = text.trim().split(/ +/).slice(1);
        const sender = m.key.remoteJid;

        console.log(`📩 Received command: ${commandBody} from ${sender}`);

        for (const plugin of plugins) {
            if (plugin.command === commandBody) {
                await plugin.run(conn, m, args, { ownerNumber });
                break;
            }
        }
    } catch (e) {
        console.error('❌ Error in message event:', e);
    }
});
