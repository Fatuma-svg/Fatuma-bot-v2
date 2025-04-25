
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'antlink')) {
    const groupMembers = await sock.groupMetadata(from);
    const members = groupMembers.participants;
    let isLinkDetected = false;

    // Check if a link is included in the message
    if (body.includes('http') || body.includes('www')) {
      isLinkDetected = true;
    }

    if (isLinkDetected) {
      await sock.sendMessage(from, { text: '🚫 Link detected! Warning for posting links.' });
      // Optionally remove the person who sent the message
      await sock.groupParticipantsUpdate(from, [msg.key.participant], 'remove');
    } else {
      await sock.sendMessage(from, { text: 'No link detected, all good!' });
    }
  }
};
