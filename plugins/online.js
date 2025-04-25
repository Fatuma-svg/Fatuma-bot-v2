export default async function (sock, msg, body, from, prefix) {
  if (process.env.ONLINE_MODE !== 'on') return;
  setInterval(() => {
    sock.sendPresenceUpdate('available');
  }, 10000); // Kila sekunde 10 bot inajitangaza ipo online
}
