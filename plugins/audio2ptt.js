export default async function (sock, msg, body, from, prefix) {
  if (!msg.message.audioMessage || !body.startsWith(prefix + 'ptt')) return;

  const audio = msg.message.audioMessage;
  await sock.sendMessage(from, {
    audio: audio,
    mimetype: 'audio/ogg; codecs=opus',
    ptt: true
  }, { quoted: msg });
}
