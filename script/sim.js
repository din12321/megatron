module.exports.config = {
		name: "sim",
		version: "1.0.0",
		role: 0,
		aliases: ["Sim"],
		credits: "jerome",
		description: "Talk to sim",
		cooldown: 0,
		hasPrefix: false
};

module.exports.run = async function({ api, event, args }) {
		const axios = require("axios");
		let { messageID, threadID, senderID, body } = event;
		let tid = threadID,
				mid = messageID;
		const content = encodeURIComponent(args.join(" "));
		if (!args[0]) return api.sendMessage("Please type a message...", tid, mid);
		try {
				const res = await axios.get(`https://sim-api-ctqz.onrender.com/sim?query=${content}`);
				const respond = res.data.respond;
				if (res.data.error) {
						api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
								if (error) {
										console.error(error);
								}
						}, mid);
				} else {
						api.sendMessage(respond, tid, (error, info) => {
								if (error) {
										console.error(error);
								}
						}, mid);
				}
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while fetching the data.", tid, mid);
		}
};
