
import pkg from '@whiskeysockets/baileys'
const {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  jidNormalizedUser
} = pkg

import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import Pino from 'pino'
import qrcode from 'qrcode-terminal'
import 'dotenv/config'
import { Boom } from '@hapi/boom'

const __dirname = path.dirname(fileURLToPath(import.meta.url)); const sessionFolder = process.env.SESSION_FOLDER || 'auth_info_multi'; const store = makeInMemoryStore({ logger: Pino().child({ level: 'silent', stream: 'store' }) });

const startSock = async () => { const { state, saveCreds } = await useMultiFileAuthState(sessionFolder); const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({ version, printQRInTerminal: true, auth: state, logger: Pino({ level: 'silent' }), browser: ['FatumaBot', 'Safari', '1.0.0'] });

store.bind(sock.ev);

sock.ev.on('creds.update', saveCreds);

sock.ev.on('connection.update', (update) => { const { connection, lastDisconnect } = update; if (connection === 'close') { const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut; console.log('connection closed due to', lastDisconnect.error, ', reconnecting:', shouldReconnect); if (shouldReconnect) startSock(); } else if (connection === 'open') { console.log('Connected as', sock.user.id); } });

// Auto features if (process.env.ONLINE_MODE === 'on') { setInterval(() => sock.sendPresenceUpdate('available'), 10000); }

sock.ev.on('messages.upsert', async ({ messages }) => { const msg = messages[0]; if (!msg.message || msg.key.fromMe) return;

const from = msg.key.remoteJid;
const type = Object.keys(msg.message)[0];
const body = msg.message[type]?.text || msg.message[type]?.caption || '';
const prefix = process.env.PREFIX || '!';

// Auto typing or recording
if (process.env.AUTO_TYPING === 'on') await sock.sendPresenceUpdate('composing', from);
if (process.env.AUTO_RECORD === 'on') await sock.sendPresenceUpdate('recording', from);

// View once opener
if (process.env.OPEN_VIEW_ONCE === 'on' && type === 'viewOnceMessageV2') {
  const originalMsg = msg.message.viewOnceMessageV2.message;
  await sock.sendMessage(from, { forward: originalMsg });
}

// Plugin system
const pluginsPath = path.join(__dirname, 'plugins');
fs.readdirSync(pluginsPath).forEach(file => {
  if (file.endsWith('.js')) {
    import(path.join(pluginsPath, file)).then(plugin => {
      try {
        plugin.default(sock, msg, body, from, prefix);
      } catch (e) {
        console.error('Plugin error:', e);
      }
    });
  }
});

}); };

startSock();

