import qrcode from 'qrcode'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'qr')) return;
  const text = body.replace(prefix + 'qr', '').trim();
  if (!text) return await sock.sendMessage(from, { text: 'Andika maneno ya kutengeneza QR' });

  qrcode.toDataURL(text, async (err, url) => {
    if (err) return await sock.sendMessage(from, { text: 'Imeshindikana kutengeneza QR' });
    const base64 = url.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    await sock.sendMessage(from, { image: buffer, caption: 'Hii hapa QR yako' }, { quoted: msg });
  });
}
