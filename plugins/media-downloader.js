import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'media')) return;
  const url = body.replace(prefix + 'media', '').trim();

  if (!url) return await sock.sendMessage(from, { text: 'Tuma link ya TikTok, IG au FB' });

  const api = `https://api.dapuhy.xyz/downloader/all?url=${url}&apikey=benwhittaker`;

  try {
    const res = await axios.get(api);
    const media = res.data.data?.url || res.data.data?.video;

    await sock.sendMessage(from, {
      video: { url: media }
    }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'Imeshindikana kudownload. Hakikisha link ni sahihi.' });
  }
}
