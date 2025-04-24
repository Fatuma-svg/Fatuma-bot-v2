// index.js example - Basic structure for your WhatsApp bot
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { writeFileSync, existsSync } = require('fs');
const { Boom } = require('@hapi/boom');

// Create the WhatsApp socket instance
const startBot = async () => {
    const { state, saveState } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveState);
    sock.ev.on('connection.update', update => {
        if (update.connection === 'close') {
            startBot();
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        console.log(m);
        if (m.type === 'notify') {
            const msg = m.messages[0];
            if (msg.message) {
                if (msg.key.remoteJid === 'status@broadcast') return;
                if (msg.message.conversation === 'ping') {
                    await sock.sendMessage(msg.key.remoteJid, { text: 'pong 🥊' });
                }
            }
        }
    });

    console.log('Bot is ready!');
};

startBot();
