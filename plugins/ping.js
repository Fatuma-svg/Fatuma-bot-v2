
export default {
    name: 'ping',
    description: 'Check bot status',
    execute: async (sock, m) => {
        await sock.sendMessage(m.chat, { text: 'Pong! 🥊' }, { quoted: m });
    }
}
