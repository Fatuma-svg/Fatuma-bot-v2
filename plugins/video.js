import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'video')) return;
  const query = body.replace(prefix + 'video', '').trim();

  if (!query) return await sock.sendMessage(from, { text: 'Weka jina la video au link ya YouTube' });

  const video = (await ytSearch(query)).videos[0];
  if (!video) return await sock.sendMessage(from, { text: 'Hakuna video iliyopatikana.' });

  const stream = ytdl(video.url, { quality: '18' });
  await sock.sendMessage(from, {
    video: { stream },
    mimetype: 'video/mp4'
  }, { quoted: msg });
}
