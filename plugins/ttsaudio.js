import googleTTS from 'google-tts-api'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'say')) return;
  const text = body.replace(prefix + 'say', '').trim();

  if (!text) return await sock.sendMessage(from, { text: 'Andika meseji unayotaka kusomwa.' });

  const url = googleTTS.getAudioUrl(text, {
    lang: 'sw', slow: false, host: 'https://translate.google.com'
  });

  await sock.sendMessage(from, {
    audio: { url }, mimetype: 'audio/mp4', ptt: false
  }, { quoted: msg });
}
