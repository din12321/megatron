const axios = require("axios");

module.exports.config = {
  name: "chord",
  version: "1.0.0",
  role: 0,
  credits: "developer",
  description: "Get artist name, title, and chords of a song",
  commandCategory: "API",
  usages: "[song]",
  cooldowns: 5,
  hasPrefix: true,
  dependencies: {}
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const song = args.join(" ");

  if (!song) {
    return api.sendMessage("Please provide a song name.", threadID, messageID);
  }

  const apiUrl = `https://jerai.onrender.com/api/chords?song=${encodeURIComponent(song)}`;

  try {
    const response = await axios.get(apiUrl);
    const { artist, title, chords } = response.data;

    if (!artist || !title || !chords) {
      return api.sendMessage("Song information not found.", threadID, messageID);
    }

    const chordMessage = `Artist: ${artist}\nTitle: ${title}\nChords:\n${chords}`;
    api.sendMessage(chordMessage, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching song information. Please try again later.", threadID, messageID);
  }
};