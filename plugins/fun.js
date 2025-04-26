export default async function (sock, msg, body, from, prefix) {
  const text = body.toLowerCase();

  // Joke Command
  if (text === `${prefix}joke`) {
    const jokes = [
      "😂 Mwalimu: Juma nipe mfano wa sentensi yenye 'Lakini'...\nJuma: Nilikuwa naenda shule LAKINI nikakumbuka ni Jumapili!",
      "🤣 Daktari: Unahitaji likizo...\nMgonjwa: Ndio maana niko kazini nikitafuta hela ya kuugua vizuri!",
      "😅 Mlevi: Polisi nisamehe, nilikunywa maji ya baridi sana hadi nikalegea..."
    ];
    return await sock.sendMessage(from, { text: jokes[Math.floor(Math.random() * jokes.length)] }, { quoted: msg });
  }

  // Truth Command
  if (text === `${prefix}truth`) {
    const truthQs = [
      "🤔 Umewahi mwambia mtu unapenda halafu ukajutia?",
      "😳 Umewahi fichua siri ya rafiki yako?",
      "👀 Umewahi feki location yako?"
    ];
    return await sock.sendMessage(from, { text: truthQs[Math.floor(Math.random() * truthQs.length)] }, { quoted: msg });
  }

  // Dare Command
  if (text === `${prefix}dare`) {
    const dares = [
      "🔥 Tuma voice note ukisema jina la ex wako!",
      "🤣 Badilisha jina la profile kuwa 'Mimi ni Mjinga' kwa dakika 10",
      "💥 Muulize admin wa group kama anakupenda"
    ];
    return await sock.sendMessage(from, { text: dares[Math.floor(Math.random() * dares.length)] }, { quoted: msg });
  }

  // Pickup Line Command
  if (text === `${prefix}pickup`) {
    const lines = [
      "💌 Kama ningekuwa msanii, wewe ndio ungekuwa masterpiece yangu.",
      "😚 Siwezi kupumua vizuri bila kukusikia... umekuwa oxygen yangu.",
      "❤️ Kuna joto, au ni wewe umepita?"
    ];
    return await sock.sendMessage(from, { text: lines[Math.floor(Math.random() * lines.length)] }, { quoted: msg });
  }

  // Quote of the Day Command
  if (text === `${prefix}quoteoftheday`) {
    const quotes = [
      "🌟 'Hakikisha unapambana na changamoto, na hakikisha unashinda.'",
      "💡 'Tunaweza kushindwa mara nyingi, lakini hilo sio jibu la mwisho.'",
      "🔥 'Ni wakati wa kuanzisha, sio wakati wa kuchelewa.'"
    ];
    return await sock.sendMessage(from, { text: quotes[Math.floor(Math.random() * quotes.length)] }, { quoted: msg });
  }

  // Riddle Command
  if (text === `${prefix}riddle`) {
    const riddles = [
      "🤔 Ninajitokeza mara moja kwa mwaka, lakini mimi ni kidogo na mtindo wa kula. Nani mimi?",
      "🔍 Nilikuwa naweza kupita na kupata, lakini kwa sasa sina. Nani mimi?",
      "🧩 Ninatembea bila miguu, lakini mimi ni sehemu ya maisha. Nani mimi?"
    ];
    return await sock.sendMessage(from, { text: riddles[Math.floor(Math.random() * riddles.length)] }, { quoted: msg });
  }

  // Trivia Command
  if (text === `${prefix}trivia`) {
    const triviaQuestions = [
      "🎮 Nani alijulikana kama mfalme wa michezo ya video?",
      "🌍 Je, ni nchi gani iliyo na jiji kubwa zaidi duniani?",
      "🔬 Ni aina gani ya mnyama ndiye aliye na moyo mkubwa duniani?"
    ];
    return await sock.sendMessage(from, { text: triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)] }, { quoted: msg });
  }

  // Inspirational Message Command
  if (text === `${prefix}inspire`) {
    const inspirationalMessages = [
      "💪 'Usikate tamaa, nguvu yako ipo ndani yako.'",
      "🚀 'Unapojitahidi, unaongeza nafasi zako za kufanikiwa.'",
      "🌟 'Mambo mazuri huja kwa watu wanaovumilia.'"
    ];
    return await sock.sendMessage(from, { text: inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)] }, { quoted: msg });
  }

  // Compliment Command
  if (text === `${prefix}compliment`) {
    const compliments = [
      "💖 Wewe ni mrembo/mzuri sana!",
      "🌟 Una kipaji cha kipekee!",
      "👏 Wewe ni mchangiaji mzuri katika jamii!"
    ];
    return await sock.sendMessage(from, { text: compliments[Math.floor(Math.random() * compliments.length)] }, { quoted: msg });
  }

  // Truth or Dare Command
  if (text === `${prefix}truthdare`) {
    const truths = [
      "👀 Umewahi fanya kitu kibaya bila mtu kujua?",
      "😳 Umewahi kusema uongo kwa mtu mkubwa katika maisha yako?",
      "🤐 Unaficha siri gani kubwa kwa marafiki zako?"
    ];
    const dares = [
      "🔥 Tuma picha ya selfie ukiwa na tabasamu kubwa!",
      "🤣 Tuma voice note ukiimba wimbo unaoupenda!",
      "💥 Badilisha jina lako la WhatsApp kuwa 'Niko kwenye mission!' kwa dakika 10."
    ];
    const isTruth = Math.random() < 0.5;
    return await sock.sendMessage(from, { text: isTruth ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)] }, { quoted: msg });
  }


export default async function (sock, msg, body, from, prefix) {
  const text = body.toLowerCase();

  // !motivation
  if (text === `${prefix}motivation`) {
    const motivationMessages = [
      "💪 'Hakikisha unapambana na changamoto zako, bila kuangalia ugumu wa njia.'",
      "🔥 'Usikate tamaa, kila kitu kinahitaji muda na juhudi.'",
      "🌟 'Kama hujajiweza leo, usiache kujaribu kesho.'"
    ];
    return await sock.sendMessage(from, { text: motivationMessages[Math.floor(Math.random() * motivationMessages.length)] }, { quoted: msg });
  }

  // !love
  if (text === `${prefix}love`) {
    const loveMessages = [
      "💖 'Mapenzi ni wakati, ni hisia, ni kushikilia kwa furaha.'",
      "❤️ 'Wewe ni roho yangu na moyo wangu, na lazima nikuonyeshe mapenzi yangu.'",
      "😍 'Mapenzi yako ni kama jua, yanavuta kila kitu nilicho nacho.'"
    ];
    return await sock.sendMessage(from, { text: loveMessages[Math.floor(Math.random() * loveMessages.length)] }, { quoted: msg });
  }

  // !fortune
  if (text === `${prefix}fortune`) {
    const fortunes = [
      "🔮 'Leo utapata fursa nzuri ya kufanya mambo makubwa.'",
      "🌟 'Hali yako ya kifedha itakuwa nzuri katika siku chache zijazo.'",
      "💫 'Upendo unakufuata na utapata furaha ya kweli hivi karibuni.'"
    ];
    return await sock.sendMessage(from, { text: fortunes[Math.floor(Math.random() * fortunes.length)] }, { quoted: msg });
  }

  // !weather (example, with a weather API)
  if (text === `${prefix}weather`) {
    // Normally, you'd call an API to get the weather.
    const weatherInfo = "🌤 Hali ya hewa leo ni nzuri. Jua linang'aa na upepo ni mwepesi.";
    return await sock.sendMessage(from, { text: weatherInfo }, { quoted: msg });
  }

  // !insult
  if (text === `${prefix}insult`) {
    const insults = [
      "💥 'Wewe ni kama kioo, kila mtu anakuona lakini wewe huonyeshi kitu.'",
      "🤣 'Vichwa vingi vimejaa mawazo, lakini wewe ni ngazi.'",
      "😅 'Mara nyingi unasema uongo kuliko kuongea ukweli.'"
    ];
    return await sock.sendMessage(from, { text: insults[Math.floor(Math.random() * insults.length)] }, { quoted: msg });
  }

  // !quote
  if (text === `${prefix}quote`) {
    const quotes = [
      "🌟 'Hakikisha unapambana na changamoto, na hakikisha unashinda.'",
      "💡 'Tunaweza kushindwa mara nyingi, lakini hilo sio jibu la mwisho.'",
      "🔥 'Ni wakati wa kuanzisha, sio wakati wa kuchelewa.'"
    ];
    return await sock.sendMessage(from, { text: quotes[Math.floor(Math.random() * quotes.length)] }, { quoted: msg });
  }

  // !story
  if (text === `${prefix}story`) {
    const stories = [
      "📖 Hadithi ya mvulana mmoja aliyeenda safari ya kutafuta ndoto...",
      "📚 Hadithi ya msichana aliyejaa matumaini na upendo katika kila hatua...",
      "🌍 Hadithi ya mabadiliko ya ulimwengu kwa msaada wa mshikamano wa jamii..."
    ];
    return await sock.sendMessage(from, { text: stories[Math.floor(Math.random() * stories.length)] }, { quoted: msg });
  }

  // !challenge
  if (text === `${prefix}challenge`) {
    const challenges = [
      "🔥 Changamoto ya leo: Tuma picha ya kitu kinachokufurahisha.",
      "💥 Changamoto: Tenda kitendo cha upendo kwa mtu usiyemjua.",
      "🌟 Changamoto ya leo: Jibu swali hili bila kusema neno 'hapana'."
    ];
    return await sock.sendMessage(from, { text: challenges[Math.floor(Math.random() * challenges.length)] }, { quoted: msg });
  }

  // !emoji
  if (text === `${prefix}emoji`) {
    const emojis = [
      "😂😎🤩",
      "🦋🌟💖",
      "🍕🥑🍉"
    ];
    return await sock.sendMessage(from, { text: emojis[Math.floor(Math.random() * emojis.length)] }, { quoted: msg });
  }

  // !news (example, would require an API)
  if (text === `${prefix}news`) {
    const news = "📰 Habari mpya: Watu zaidi ya milioni 2 wamehamia maeneo mapya kwa ajili ya huduma bora.";
    return await sock.sendMessage(from, { text: news }, { quoted: msg });
  }

  // !inspireme
  if (text === `${prefix}inspireme`) {
    const inspireMessages = [
      "🚀 'Kila hatua unayochukua ni muhimu kwa kufikia malengo yako.'",
      "🔥 'Vita yoyote ya ndani unayoshinda, inajenga nguvu yako.'",
      "💪 'Usiache kujitahidi, lazima utafanikiwa.'"
    ];
    return await sock.sendMessage(from, { text: inspireMessages[Math.floor(Math.random() * inspireMessages.length)] }, { quoted: msg });
  }

  // !guess
  if (text === `${prefix}guess`) {
    const guessGame = "🎲 Guess this: What has keys but can't open locks?";
    return await sock.sendMessage(from, { text: guessGame }, { quoted: msg });
  }
}
