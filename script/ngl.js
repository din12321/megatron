const axios = require('axios');

module.exports.config = {
  name: "ngl",
  version: "1.0.",
  hasPermission: 0,
  credits: "RICKCIEL CREDITS TO WHOEVER OWN THE SCRIPT FROM GITHUB",
  usePrefix: true,
  description: "Spam NGL messages",
  commandCategory: "Spam",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length < 3) {
      api.sendMessage('[ NGL ] Insufficient arguments. Usage: nglspam [username] [message] [amount]', event.threadID);
      return;
    }

    const username = args.shift();
    const message = args.slice(0, -1).join(" "); 
    const spamCount = parseInt(args[args.length - 1]); 

    if (isNaN(spamCount) || spamCount <= 0) {
      api.sendMessage('[ NGL ] Invalid amount. Please provide a valid positive number.', event.threadID);
      return;
    }

    console.log(`[ NGL ] Spamming To : ${username}`);
    for (let i = 0; i < spamCount; i++) {
      const response = await axios.post('https://ngl.link/api/submit', {
        username: username,
        question: message,
        deviceId: '23d7346e-7d22-4256-80f3-dd4ce3fd8878',
        gameSlug: '',
        referrer: '',
      });

      console.log(`[ NGL ] Message ${i + 1}: Status - ${response.status}`);
    }

    api.sendMessage(`[ NGL ] Send Successfully😊\nUsername: ${username}\nMessage: ${message}\nSpam Count: ${spamCount}`, event.threadID);
  } catch (error) {
    console.error('[ NGL ] Error:', error);
    api.sendMessage('[ NGL ] Error: ' + error.message, event.threadID);
  }
};

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});