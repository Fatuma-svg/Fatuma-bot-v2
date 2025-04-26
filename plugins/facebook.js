import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'fb')) return;
  const url = body.replace(prefix + 'fb', '').trim();

  if (!url.includes('facebook.com')) return await sock.sendMessage(from, { text: 'Weka link sahihi ya Facebook' });

  const api = `https://api.dapuhy.xyz/downloader/fb?url=${url}&apikey=benwhittaker`;
  try {
    const res = await axios.get(api);
    await sock.sendMessage(from, { video: { url: res.data.data.url } }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'Imeshindikana kupakua kutoka Facebook' });
  }
}
