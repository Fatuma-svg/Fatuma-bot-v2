export default {
    name: 'ping',
    description: 'Check bot status',
    execute: async (sock, m) => {
        try {
            await sock.sendMessage(m.chat, { text: 'Pong! 🥊' }, { quoted: m });
        } catch (err) {
            console.error('Error executing ping command:', err);
        }
    }
};
