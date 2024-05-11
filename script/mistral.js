const axios = require("axios");

module.exports.config = {
  name: 'mistral',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "Get response from Mistral AI",
  usage: "mistral [query]",
  credits: 'churchill',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const mistralApiUrl = "https://hashier-api-groq.vercel.app/api/groq/mistral";

  try {
    const query = args.join(" ");
    if (!query) {
      api.sendMessage("Please provide a query.", event.threadID, event.messageID);
      return;
    }

    const response = await axios.get(`${mistralApiUrl}?ask=${encodeURIComponent(query)}`);
    const data = response.data.response;

    const formattedResponse = `
🔮 **Mistral AI Response** 🔮\n
Query: ${query}
Response: ${data}
    `;

    api.sendMessage(formattedResponse, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing the command. Please try again.", event.threadID);
  }
};
