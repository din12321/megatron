module.exports.config = {
	name: "reverse",
	version: "1.0.0",
	credits: "Cliff",
	role: 0,
	hasPrefix: false,
	usages: "reverse [text]",
	aliases: ["rev"],
	cooldown: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;

	if (args.length === 0) {
		return api.sendMessage("Please provide the text to reverse.", threadID, messageID);
	}

	const textToReverse = args.join(" ");
	const reversedText = textToReverse.split("").reverse().join("");

	return api.sendMessage(reversedText, threadID, messageID);
};
