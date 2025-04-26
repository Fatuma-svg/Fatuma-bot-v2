import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'trans')) return;
  const parts = body.replace(prefix + 'trans', '').trim().split('|');
  if (parts.length < 2) return await sock.sendMessage(from, { text: 'Format: !trans en|Habari' });

  const [to, text] = parts;
  try {
    const res = await axios.get(`https://api.dapuhy.xyz/tools/translate?to=${to}&text=${text}&apikey=benwhittaker`);
    await sock.sendMessage(from, { text: `Tafsiri (${to}): ${res.data.result}` }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'Tafsiri imeshindikana.' });
  }
}
