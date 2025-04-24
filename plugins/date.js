
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'date')) {
    const date = new Date().toLocaleDateString();
    await sock.sendMessage(from, { text: `Leo ni ${date}` }, { quoted: msg });
  }
};
