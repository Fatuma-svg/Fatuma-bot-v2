export default {
    name: 'ai',
    description: 'Various AI-based commands',
    execute: async (sock, m, { body, from, prefix }) => {
        try {
            const send = (text) => sock.sendMessage(from, { text }, { quoted: m });

            if (!body.startsWith(prefix)) return;
            const cmd = body.slice(prefix.length).trim().toLowerCase();

            switch (cmd) {
                case 'ai':
                    send('🤖 This is AI responding!');
                    break;
                case 'ask':
                    send('💬 Ask me anything!');
                    break;
                case 'imagegen':
                    send('🖼️ Generating an image...');
                    break;
                case 'chat':
                    send('🗨️ Let\'s chat!');
                    break;
                case 'translate':
                    send('🌍 Translating...');
                    break;
                case 'summarize':
                    send('✍️ Summarizing text...');
                    break;
                case 'wiki':
                    send('📚 Searching Wikipedia...');
                    break;
                case 'news':
                    send('📰 Fetching the latest news...');
                    break;
                case 'quoteai':
                    send('💡 AI-generated quote!');
                    break;
                case 'aijoke':
                    send('😂 Here\'s an AI joke!');
                    break;
                default:
                    // hakuna action
                    break;
            }
        } catch (err) {
            console.error('Error executing AI command:', err);
        }
    }
};
