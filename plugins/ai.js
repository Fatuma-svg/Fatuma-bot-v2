export default async function (sock, msg, body, from, prefix) {
  const send = (text) => sock.sendMessage(from, { text }, { quoted: msg });

  if (!body.startsWith(prefix)) return;
  const cmd = body.slice(prefix.length).trim().toLowerCase();

  if (cmd === 'ai') send('🤖 This is AI responding!');
  else if (cmd === 'ask') send('💬 Ask me anything!');
  else if (cmd === 'imagegen') send('🖼️ Generating an image...');
  else if (cmd === 'chat') send('🗨️ Let\'s chat!');
  else if (cmd === 'translate') send('🌍 Translating...');
  else if (cmd === 'summarize') send('✍️ Summarizing text...');
  else if (cmd === 'wiki') send('📚 Searching Wikipedia...');
  else if (cmd === 'news') send('📰 Fetching the latest news...');
  else if (cmd === 'quoteai') send('💡 AI-generated quote!');
  else if (cmd === 'aijoke') send('😂 Here\'s an AI joke!');
}
