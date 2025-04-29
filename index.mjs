import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';
import { Boom } from '@hapi/boom';

// Setup auth
const { state, saveCreds } = await useMultiFileAuthState('./session');
const conn = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    browser: ['Ben Whittaker Tech', 'Safari', '1.0.0'],
});

const prefix = '!';
const ownerNumber = ['255760317060@s.whatsapp.net'];

// Save creds
conn.ev.on('creds.update', saveCreds);

// Plugins directory
const pluginsDir = path.join(__dirname, 'plugins');
let plugins = [];

// Function to load plugins
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

// Command event
conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const m = chatUpdate.messages[0];
        if (!m.message) return;
        if (m.key.fromMe) return;

        const text = (m.message.conversation || m.message.extendedTextMessage?.text || '').trim();
        if (!text.startsWith(prefix)) return;

        const commandBody = text.slice(prefix.length).trim().split(' ')[0].toLowerCase();
        const args = text.trim().split(/ +/).slice(1);
        const sender = m.key.remoteJid;

        console.log(`📩 Received command: ${commandBody} from ${sender}`);

        // Check if the command matches a plugin
        for (const plugin of plugins) {
            if (plugin.command === commandBody) {
                await plugin.run(conn, m, args, { ownerNumber });
                break;
            }
        }

        // If no plugin matched, fallback to default handling (like !set and !envlist)
        if (commandBody === 'set' && args.length === 2) {
            const feature = args[0].toUpperCase();
            const status = args[1].toLowerCase();
            if (status === 'on' || status === 'off') {
                const envPath = path.join(__dirname, '.env');
                const envFile = fs.readFileSync(envPath, 'utf8');
                const updatedEnv = envFile.replace(new RegExp(`${feature}=.*`), `${feature}=${status}`);
                fs.writeFileSync(envPath, updatedEnv);
                await conn.sendMessage(sender, `✅ ${feature} imewekwa ${status === 'on' ? 'ON' : 'OFF'}`, { quoted: m });
            } else {
                await conn.sendMessage(sender, '❌ Tafadhali tumia `on` au `off` kwa feature.', { quoted: m });
            }
        }

        // !envlist command (display all .env features)
        if (commandBody === 'envlist') {
            const envPath = path.join(__dirname, '.env');
            const envFile = fs.readFileSync(envPath, 'utf8');
            await conn.sendMessage(sender, '```\n' + envFile + '\n```', { quoted: m });
        }

    } catch (e) {
        console.error('❌ Error in message event:', e);
    }
});
