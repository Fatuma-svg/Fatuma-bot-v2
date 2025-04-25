export default async function (sock, msg, body, from, prefix) {
  if (!msg.key.remoteJid.endsWith('@g.us')) return;
  if (!body.startsWith(prefix + 'hidetag')) return;

  const groupMetadata = await sock.groupMetadata(from);
  const participants = groupMetadata.participants.map(p => p.id);

  const text = body.slice((prefix + 'hidetag').length).trim() || 'Hidetag message here';

  await sock.sendMessage(from, {
    text: text,
    mentions: participants
  }, { quoted: msg });
}
