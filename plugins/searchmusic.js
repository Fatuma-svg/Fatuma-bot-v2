import ytSearch from 'yt-search'

export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'search')) return;
  const query = body.replace(prefix + 'search', '').trim();
  if (!query) return await sock.sendMessage(from, { text: 'Andika jina la wimbo au video' });

  const results = await ytSearch(query);
  const text = results.videos.slice(0, 5).map(v =>
    `*${v.title}*\nLink: ${v.url}\nDuration: ${v.timestamp}\nViews: ${v.views}\n`
  ).join('\n');

  await sock.sendMessage(from, { text }, { quoted: msg });
}
