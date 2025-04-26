import ytdl from 'ytdl-core'
import ytSearch from 'yt-search'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'music')) return;
  const query = body.replace(prefix + 'music', '').trim();

  if (!query) return await sock.sendMessage(from, { text: 'Tafadhali weka jina la wimbo au link ya YouTube' });

  const video = (await ytSearch(query)).videos[0];
  if (!video) return await sock.sendMessage(from, { text: 'Hakuna matokeo.' });

  const audioStream = ytdl(video.url, { filter: 'audioonly' });
  await sock.sendMessage(from, {
    audio: { stream: audioStream },
    mimetype: 'audio/mp4',
    ptt: false
  }, { quoted: msg });
}
