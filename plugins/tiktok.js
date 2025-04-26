import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'tiktok')) return;
  const url = body.replace(prefix + 'tiktok', '').trim();

  if (!url.includes('tiktok.com')) return await sock.sendMessage(from, { text: 'Weka link sahihi ya TikTok' });

  const api = `https://api.dapuhy.xyz/downloader/tiktok?url=${url}&apikey=benwhittaker`;
  try {
    const res = await axios.get(api);
    await sock.sendMessage(from, { video: { url: res.data.data.nowm } }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'TikTok download imeshindikana.' });
  }
}
