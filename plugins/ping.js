
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'ping')) {
    await sock.sendMessage(from, { text: 'Pong! 🥊' }, { quoted: msg });
  }
};
