import axios from 'axios'
import fs from 'fs'
import path from 'path'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'pdf')) return;
  const url = body.replace(prefix + 'pdf', '').trim();

  if (!url.endsWith('.pdf')) return await sock.sendMessage(from, { text: 'Tuma link sahihi ya PDF' });

  const filename = 'downloaded.pdf';
  const filepath = path.join('./', filename);

  try {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filepath, res.data);
    await sock.sendMessage(from, {
      document: fs.readFileSync(filepath),
      fileName: filename,
      mimetype: 'application/pdf'
    }, { quoted: msg });
    fs.unlinkSync(filepath);
  } catch (e) {
    await sock.sendMessage(from, { text: 'Imeshindikana kupakua PDF hiyo.' });
  }
}
