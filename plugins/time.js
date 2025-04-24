
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'time')) {
    const time = new Date().toLocaleTimeString();
    await sock.sendMessage(from, { text: `Sasa hivi ni ${time}` }, { quoted: msg });
  }
};
