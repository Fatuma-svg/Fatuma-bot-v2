export default async function (sock, msg, body, from, prefix) {
  if (!body.startsWith(prefix + 'menu')) return;

  // Reaction emoji
  await sock.sendMessage(from, {
    react: { text: '📜', key: msg.key }
  });

  const imageMessage = {
    image: { url: 'https://i.imgur.com/hNGYd2V.jpg' },
    caption: `
╭━━━〔 *🤖 F A T U M A - B O T  V2 🤖* 〕━━━╮
│ *All Available Commands*
│ _By: Ben Whittaker ☎️ 255760317060_
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭─❏ *GENERAL COMMANDS* ❏
│ ${prefix}menu
│ ${prefix}help
│ ${prefix}ping
│ ${prefix}hello
│ ${prefix}about
│ ${prefix}info
│ ${prefix}botname
│ ${prefix}status
│ ${prefix}source
│ ${prefix}owner
│ ${prefix}time
│ ${prefix}date
╰────────────────────────────╯

╭─❏ *AI & GPT* ❏
│ ${prefix}ai
│ ${prefix}gpt
│ ${prefix}ask
│ ${prefix}imagegen
│ ${prefix}aivoice
│ ${prefix}brainly
│ ${prefix}mathsolver
│ ${prefix}summarize
╰────────────────────────────╯

╭─❏ *GROUP TOOLS* ❏
│ ${prefix}add
│ ${prefix}kick
│ ${prefix}promote
│ ${prefix}demote
│ ${prefix}linkgroup
│ ${prefix}revoke
│ ${prefix}hidetag
│ ${prefix}tagall
│ ${prefix}groupinfo
│ ${prefix}welcome on
│ ${prefix}welcome off
╰────────────────────────────╯

╭─❏ *MEDIA TOOLS* ❏
│ ${prefix}sticker
│ ${prefix}toimg
│ ${prefix}tomp3
│ ${prefix}resize
│ ${prefix}removebg
│ ${prefix}filter
│ ${prefix}invert
│ ${prefix}mirror
│ ${prefix}burn
│ ${prefix}blur
╰────────────────────────────╯

╭─❏ *FUN & GAMES* ❏
│ ${prefix}truth
│ ${prefix}dare
│ ${prefix}joke
│ ${prefix}pickup
│ ${prefix}quote
│ ${prefix}fact
│ ${prefix}meme
│ ${prefix}roast
│ ${prefix}love
│ ${prefix}motivation
╰────────────────────────────╯

╭─❏ *OWNER COMMANDS* ❏
│ ${prefix}broadcast
│ ${prefix}ban
│ ${prefix}unban
│ ${prefix}setprefix
│ ${prefix}block
│ ${prefix}unblock
│ ${prefix}setbio
│ ${prefix}setname
│ ${prefix}shutdown
│ ${prefix}restart
╰────────────────────────────╯

╭─❏ *DOWNLOADERS* ❏
│ ${prefix}ytmp3
│ ${prefix}ytmp4
│ ${prefix}tiktok
│ ${prefix}ig
│ ${prefix}fb
│ ${prefix}twitter
│ ${prefix}pinterest
│ ${prefix}mediafire
│ ${prefix}scloud
╰────────────────────────────╯

╭─❏ *IMAGE & STICKER* ❏
│ ${prefix}stickermeme
│ ${prefix}stickergif
│ ${prefix}stickercrop
│ ${prefix}emojimix
│ ${prefix}logomaker
│ ${prefix}textpro
│ ${prefix}photoxy
│ ${prefix}canvas
╰────────────────────────────╯

╭─❏ *UTILITIES & TOOLS* ❏
│ ${prefix}short
│ ${prefix}qr
│ ${prefix}trans
│ ${prefix}weather
│ ${prefix}calc
│ ${prefix}tts
│ ${prefix}wiki
│ ${prefix}dictionary
│ ${prefix}iplookup
│ ${prefix}translate
╰────────────────────────────╯

╭─❏ *SECURITY & FILTERS* ❏
│ ${prefix}set antidelete on
│ ${prefix}set antidelete off
│ ${prefix}set antilink on
│ ${prefix}set antilink off
│ ${prefix}set antifake on
│ ${prefix}set antifake off
│ ${prefix}set welcome on
│ ${prefix}set welcome off
│ ${prefix}set autoreact on
│ ${prefix}set autoreact off
│ ${prefix}set fake typing on
│ ${prefix}set fake typing off
│ ${prefix}set autosticker on
│ ${prefix}set autosticker off
│ ${prefix}antilink
│ ${prefix}antifake
│ ${prefix}antidelete
╰────────────────────────────╯

*Powered by:* @fatuma-svg
    `,
    buttons: [
      { buttonId: `${prefix}owner`, buttonText: { displayText: '👑 Owner' }, type: 1 },
      { buttonId: `${prefix}ai`, buttonText: { displayText: '💬 AI Chat' }, type: 1 },
      { buttonId: `${prefix}ytmp3`, buttonText: { displayText: '🎵 YouTube MP3' }, type: 1 },
      { buttonId: `${prefix}add`, buttonText: { displayText: '⚙️ Group Tools' }, type: 1 },
      { buttonId: `${prefix}sticker`, buttonText: { displayText: '🎨 Media Tools' }, type: 1 },
      { buttonId: `${prefix}truth`, buttonText: { displayText: '🧠 Fun & Games' }, type: 1 },
      { buttonId: `${prefix}short`, buttonText: { displayText: '✨ Utilities' }, type: 1 },
      { buttonId: `${prefix}set`, buttonText: { displayText: '🔒 Security' }, type: 1 },
      { buttonId: `${prefix}ytmp4`, buttonText: { displayText: '🌐 Downloader' }, type: 1 }
    ],
    footer: 'Fatuma-Bot V2 • Ben Whittaker Tech',
    headerType: 4
  };

  await sock.sendMessage(from, imageMessage, { quoted: msg });
}
