import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'insta')) return;
  const link = body.replace(prefix + 'insta', '').trim();
  if (!link.includes('instagram.com')) return await sock.sendMessage(from, { text: 'Tuma link sahihi ya Instagram' });

  const api = `https://api.dapuhy.xyz/downloader/igdl?url=${link}&apikey=benwhittaker`;
  try {
    const res = await axios.get(api);
    const media = res.data.data[0]?.url;
    await sock.sendMessage(from, { video: { url: media } }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'Imeshindikana kupakua kutoka Instagram' });
  }
}
