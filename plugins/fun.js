export default async (sock, msg, body, from, prefix) => {
  const commands = {
    joke: "Why don't scientists trust atoms? Because they make up everything!",
    fact: "A crocodile can't stick its tongue out.",
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    truth: "Have you ever lied to your best friend?",
    dare: "Send a voice note singing your favorite song!",
    emoji: "😊😂👍🔥🥺😍💯",
  };

  for (let cmd in commands) {
    if (body === `${prefix}${cmd}`) {
      await sock.sendMessage(from, { text: commands[cmd] });
    }
  }
};
