
import ytdl from 'ytdl-core';
import yts from 'yt-search';
import axios from 'axios';
import { exec } from 'child_process';
import fs from 'fs';

export default async function(sock, msg, body, from, prefix) {
  const text = body.toLowerCase();
  const args = body.trim().split(/ +/).slice(1);
  const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();

  const reply = async (txt) => await sock.sendMessage(from, { text: txt }, { quoted: msg });

  if (command === 'play') {
    if (!args[0]) return reply('🔎 Ingiza jina la wimbo, mfano:\n!play love nwantiti');
    let query = args.join(' ');
    let results = await yts(query);
    let vid = results.videos[0];
    if (!vid) return reply('😔 Hakuna kilichopatikana!');
    let msgTxt = `🎵 *PLAY AUDIO*\n\n📌 Title: ${vid.title}\n⏱️ Duration: ${vid.timestamp}\n👀 Views: ${vid.views}\n🔗 URL: ${vid.url}`;
    await sock.sendMessage(from, { image: { url: vid.thumbnail }, caption: msgTxt }, { quoted: msg });
    let stream = ytdl(vid.url, { filter: 'audioonly' });
    let path = './tmp_audio.mp3';
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    writeStream.on('finish', async () => {
      await sock.sendMessage(from, { audio: { url: path }, mimetype: 'audio/mp4' }, { quoted: msg });
      fs.unlinkSync(path);
    });
  }

  if (command === 'ytmp3') {
    if (!args[0]) return reply('🔗 Tuma link ya YouTube, mfano:\n!ytmp3 https://youtu.be/xyz');
    let url = args[0];
    if (!ytdl.validateURL(url)) return reply('❌ Link sio sahihi!');
    let info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    await reply(`⏳ Inapakua audio: *${title}*`);
    let stream = ytdl(url, { filter: 'audioonly' });
    let path = './yt_audio.mp3';
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    writeStream.on('finish', async () => {
      await sock.sendMessage(from, { audio: { url: path }, mimetype: 'audio/mp4' }, { quoted: msg });
      fs.unlinkSync(path);
    });
  }

  if (command === 'ytmp4') {
    if (!args[0]) return reply('🔗 Tuma link ya YouTube, mfano:\n!ytmp4 https://youtu.be/xyz');
    let url = args[0];
    if (!ytdl.validateURL(url)) return reply('❌ Link sio sahihi!');
    let info = await ytdl.getInfo(url);
    let title = info.videoDetails.title;
    await reply(`📹 Inapakua video: *${title}*`);
    let path = './yt_video.mp4';
    const stream = ytdl(url, { filter: 'videoandaudio' });
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    writeStream.on('finish', async () => {
      await sock.sendMessage(from, { video: { url: path }, mimetype: 'video/mp4' }, { quoted: msg });
      fs.unlinkSync(path);
    });
  }

  if (command === 'lyrics') {
    if (!args[0]) return reply('📝 Andika jina la wimbo, mfano:\n!lyrics calm down');
    let search = args.join(' ');
    try {
      let res = await axios.get(`https://api.lyrics.ovh/v1/${search}`);
      let lyrics = res.data.lyrics;
      if (!lyrics) return reply('❌ Hakuna lyrics zilizopatikana.');
      await reply(`🎶 *LYRICS: ${search}*\n\n${lyrics}`);
    } catch (e) {
      reply('❌ Lyrics hazipatikani!');
    }
  }

  if (command === 'tiktok') {
    if (!args[0]) return reply('🎥 Tuma TikTok link, mfano:\n!tiktok https://vt.tiktok.com/...');
    let url = args[0];
    try {
      let res = await axios.get(`https://api.tiklydown.me/api/download?url=${url}`);
      let videoUrl = res.data.video;
      if (!videoUrl) return reply('⚠️ Video haikupatikana!');
      await sock.sendMessage(from, { video: { url: videoUrl }, caption: '🎬 Hii hapa TikTok yako!' }, { quoted: msg });
    } catch (e) {
      reply('❌ Imeshindikana kupakua TikTok video.');
    }
  }

  if (command === 'audiomack') {
    if (!args[0]) return reply('🎧 Tuma link ya Audiomack au jina la wimbo');
    let query = args.join(' ');
    try {
      const res = await axios.get(`https://audiomack-api.vercel.app/search?q=${encodeURIComponent(query)}`);
      let song = res.data.result[0];
      await sock.sendMessage(from, { audio: { url: song.url }, mimetype: 'audio/mp4' }, { quoted: msg });
    } catch (e) {
      reply('❌ Wimbo haukupatikana kutoka Audiomack.');
    }
  }

  if (command === 'video') {
    if (!args[0]) return reply('🎥 Tafadhali tuma jina la video, mfano:\n!video how to code');
    let query = args.join(' ');
    let results = await yts(query);
    let vid = results.videos[0];
    if (!vid) return reply('❌ Hakuna video iliyopatikana.');
    await sock.sendMessage(from, { video: { url: vid.url }, caption: `🎬 ${vid.title}` }, { quoted: msg });
  }

  if (command === 'song') {
    if (!args[0]) return reply('🎵 Tuma jina la wimbo, mfano:\n!song calm down');
    let search = args.join(' ');
    try {
      const res = await axios.get(`https://api.genius.com/search?q=${search}`, {
        headers: { Authorization: `Bearer YOUR_GENIUS_API_KEY` }
      });
      let hit = res.data.response.hits[0].result;
      let url = hit.url;
      let title = hit.title;
      await reply(`🔎 *${title}*\n\n${url}`);
    } catch (e) {
      reply('❌ Hakuna wimbo uliopatikana.');
    }
  }
}
