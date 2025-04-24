
export default async (sock, msg, body, from, prefix) => {
  if (body.startsWith(prefix + 'menu')) {
    const text = `
*Fatuma Bot Menu*

1. ${prefix}ping
2. ${prefix}hello
3. ${prefix}menu
4. ${prefix}time
5. ${prefix}date
6. ${prefix}owner
7. ${prefix}group
8. ${prefix}botname
9. ${prefix}info
10. ${prefix}quote
11. ${prefix}random
12. ${prefix}help
13. ${prefix}about
14. ${prefix}status
15. ${prefix}source
16. ${prefix}emoji
17. ${prefix}weather
18. ${prefix}meme
19. ${prefix}fact
20. ${prefix}joke
21. ${prefix}shorten
22. ${prefix}calc
23. ${prefix}qr
24. ${prefix}translate
25. ${prefix}sticker
26. ${prefix}gpt
27. ${prefix}wiki
28. ${prefix}tts
29. ${prefix}ytmp3
30. ${prefix}ytmp4
`;
    await sock.sendMessage(from, { text }, { quoted: msg });
  }
};
