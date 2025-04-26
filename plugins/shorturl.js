import axios from 'axios'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'short')) return;
  const url = body.replace(prefix + 'short', '').trim();
  if (!url.startsWith('http')) return await sock.sendMessage(from, { text: 'Weka link sahihi' });

  try {
    const res = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
    await sock.sendMessage(from, { text: `Shortened: ${res.data}` }, { quoted: msg });
  } catch (e) {
    await sock.sendMessage(from, { text: 'Imeshindikana kufupisha link' });
  }
}
