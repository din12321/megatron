const axios = require('axios');

module.exports.config = {
  name: 'ai3',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snow', 'ai3'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snowflakes [prompt]",
  credits: 'churchill',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`𝑯𝑬𝑳𝑳𝑶! 𝑰'𝑴 𝑨 𝑺𝑵𝑶𝑾𝑭𝑳𝑨𝑲𝑬𝑺 𝑨𝑰 𝑩𝑶𝑻 ✨ 

━━━━━━━━━━━━━━━

 𝑷𝑳𝑬𝑨𝑺𝑬 𝑷𝑹𝑶𝑽𝑰𝑫𝑬 𝑨 𝑸𝑼𝑬𝑺𝑻𝑰𝑶𝑵/𝑸𝑼𝑬𝑹𝒀`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔍Searching for Snowflakes AI response....`, event.threadID, event.messageID);
  
  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(data.response + "\n\n𝒄𝒓𝒆𝒅𝒊𝒕𝒔: https://www.facebook.com/Churchill.Dev4100", event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
