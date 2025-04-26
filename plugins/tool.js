import axios from 'axios';
import { exec } from 'child_process';
import moment from 'moment';
import { getWeather } from 'weather-js';
import dns from 'dns';

export default async function(sock, msg, body, from, prefix) {
  const text = body.toLowerCase();
  const args = body.trim().split(/ +/).slice(1);
  const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase();

  const reply = async (txt) => await sock.sendMessage(from, { text: txt }, { quoted: msg });

  // Currency Converter
  if (command === 'currency') {
    if (!args[0] || !args[1] || !args[2]) return reply('⛔ Tuma mfano: !currency USD EUR 100');
    const fromCurrency = args[0].toUpperCase();
    const toCurrency = args[1].toUpperCase();
    const amount = args[2];
    try {
      const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const conversionRate = res.data.rates[toCurrency];
      const convertedAmount = conversionRate * amount;
      await reply(`💵 ${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } catch (err) {
      await reply('❌ Imeshindikana kubadilisha sarafu. Tafadhali hakikisha sarafu ni sahihi.');
    }
  }

  // IP Geolocation
  if (command === 'geoip') {
    if (!args[0]) return reply('🌍 Tuma IP, mfano: !geoip 8.8.8.8');
    const ip = args[0];
    axios.get(`http://ip-api.com/json/${ip}`).then((response) => {
      if (response.data.status === 'fail') return reply('❌ Hakuna taarifa za IP hii.');
      const data = response.data;
      let message = `🌍 Taarifa za IP ${ip}:\n*City*: ${data.city}\n*Region*: ${data.regionName}\n*Country*: ${data.country}\n*ISP*: ${data.isp}`;
      reply(message);
    }).catch((error) => {
      reply('❌ Imeshindikana kupata taarifa za IP hii.');
    });
  }

  // Number Facts
  if (command === 'numberfact') {
    if (!args[0]) return reply('🔢 Tuma namba, mfano: !numberfact 7');
    const number = args[0];
    try {
      const res = await axios.get(`http://numbersapi.com/${number}`);
      await reply(`📚 Fact ya namba ${number}: ${res.data}`);
    } catch (err) {
      await reply('❌ Imeshindikana kupata ukweli kuhusu namba hii.');
    }
  }

  // Motivational Quote
  if (command === 'quote') {
    const quotes = [
      "💡 'Usikate tamaa, siku njema inakuja.'",
      "🚀 'Hakikisha unafanya kazi kwa bidii, matunda yataonekana.'",
      "🌟 'Tunahitaji kufaulu kwa kuwa tunajitahidi na hatukubali kushindwa.'"
    ];
    await reply(quotes[Math.floor(Math.random() * quotes.length)]);
  }
  
  // Weather
  if (command === 'weather') {
    if (!args[0]) return reply('🌤️ Tafadhali tuma jina la jiji, mfano:\n!weather Dar es Salaam');
    let city = args.join(' ');
    getWeather({ search: city, degreeType: 'C' }, function(err, result) {
      if (err) return reply('❌ Hakuna taarifa za hali ya hewa kwa jiji hili.');
      let weatherInfo = result[0].current;
      await reply(`🌤️ Hali ya hewa kwa ${city}:\n*${weatherInfo.temperature}°C*\n*${weatherInfo.skytext}*\n*Wind: ${weatherInfo.windspeed}*`);
    });
  }

  // Time
  if (command === 'time') {
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    await reply(`🕒 Saa ya sasa ni: ${time}`);
  }
}
