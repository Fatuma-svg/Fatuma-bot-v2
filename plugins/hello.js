
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'hello')) {
    await sock.sendMessage(from, { text: 'Hello there!' }, { quoted: msg });
  }
};
