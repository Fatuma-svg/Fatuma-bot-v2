export default async function (sock, msg, body, from, prefix, ownerNumber) {
  const text = body.toLowerCase();

  // !setprefix Command (Set a new prefix for the bot)
  if (text.startsWith(`${prefix}setprefix`)) {
    // Check if the user is the owner of the bot
    if (from !== ownerNumber) {
      return await sock.sendMessage(from, { text: "⚠️ Only the bot owner can change the prefix." }, { quoted: msg });
    }

    // Get the new prefix from the command
    const newPrefix = body.split(" ")[1];
    if (!newPrefix) {
      return await sock.sendMessage(from, { text: "⚠️ Please provide a new prefix. Example: !setprefix *" }, { quoted: msg });
    }

    // Change prefix logic - save the new prefix (assuming you save it in a .env or database)
    // Example: savePrefix(newPrefix);

    return await sock.sendMessage(from, { text: `✅ Prefix has been changed to ${newPrefix}` }, { quoted: msg });
  }

  // !setmode Command (Set bot mode to either 'public' or 'private')
  if (text.startsWith(`${prefix}setmode`)) {
    // Check if the user is the owner of the bot
    if (from !== ownerNumber) {
      return await sock.sendMessage(from, { text: "⚠️ Only the bot owner can change the mode." }, { quoted: msg });
    }

    // Get the mode from the command
    const mode = body.split(" ")[1];
    if (!mode || (mode !== "public" && mode !== "private")) {
      return await sock.sendMessage(from, { text: "⚠️ Please provide a valid mode: 'public' or 'private'. Example: !setmode public" }, { quoted: msg });
    }

    // Change mode logic - save the new mode (assuming you save it in a .env or database)
    // Example: saveMode(mode);

    return await sock.sendMessage(from, { text: `✅ Bot mode has been changed to ${mode}` }, { quoted: msg });
  }

  // !block Command (Block a user from using the bot)
  if (text.startsWith(`${prefix}block`)) {
    // Check if the user is the owner of the bot
    if (from !== ownerNumber) {
      return await sock.sendMessage(from, { text: "⚠️ Only the bot owner can block users." }, { quoted: msg });
    }

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return await sock.sendMessage(from, { text: "⚠️ Please mention a user to block!" }, { quoted: msg });

    // Block the user logic - add to a blocked list (e.g., saveBlockedUser(mentioned))
    // Example: blockUser(mentioned);

    return await sock.sendMessage(from, { text: `🚫 User ${mentioned} has been blocked from using the bot.` }, { quoted: msg });
  }

  // !unblock Command (Unblock a user to use the bot again)
  if (text.startsWith(`${prefix}unblock`)) {
    // Check if the user is the owner of the bot
    if (from !== ownerNumber) {
      return await sock.sendMessage(from, { text: "⚠️ Only the bot owner can unblock users." }, { quoted: msg });
    }

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
    if (!mentioned) return await sock.sendMessage(from, { text: "⚠️ Please mention a user to unblock!" }, { quoted: msg });

    // Unblock the user logic - remove from blocked list (e.g., removeBlockedUser(mentioned))
    // Example: unblockUser(mentioned);

    return await sock.sendMessage(from, { text: `✅ User ${mentioned} has been unblocked and can use the bot again.` }, { quoted: msg });
  }

  // !security Command (Get the security status of the bot)
  if (text === `${prefix}security`) {
    // Check if the user is the owner of the bot
    if (from !== ownerNumber) {
      return await sock.sendMessage(from, { text: "⚠️ Only the bot owner can access the security status." }, { quoted: msg });
    }

    // Get current security settings - e.g., check blocked users or current prefix
    // Example: const currentPrefix = getPrefix();
    // Example: const blockedUsers = getBlockedUsers();

    return await sock.sendMessage(from, { text: `🔐 Current bot security status:
    - Prefix: ${prefix}
    - Blocked users: [List of blocked users if implemented]` }, { quoted: msg });
  }
}
