const axios = require('axios');

module.exports.config = {
		name: "instastalk",
		version: "1.0.0",
		credits: "Samir Œ , Faith Xe",
		hasPrefix: false,
		role: 0,
		description: "Fetch and display information about Instagram profiles.",
		aliases: [],
		usage: "{prefix}instastalk <username>",
		cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
		const username = args[0];

		if (!username) {
				return api.sendMessage("Please provide an Instagram username.", event.threadID);
		}

		try {
				const apiUrl = `https://api-samir.onrender.com/stalk/insta?username=${username}`;
				const { data } = await axios.get(apiUrl);
				const { user_info } = data;

				if (!user_info) {
						return api.sendMessage("Profile not found.", event.threadID);
				}

				// Fetch profile picture directly from the URL
				const profilePicStream = await axios.get(user_info.profile_pic_url, { responseType: 'stream' });

				const messageBody = `
👤 Full Name: ${user_info.full_name}
🆔 Username: @${user_info.username}
📝 Biography: ${user_info.biography}
🔗 External URL: ${user_info.external_url ? user_info.external_url : "does not have"}
🔒 Private Account: ${user_info.is_private ? "Yes" : "No"}
✔ Verified: ${user_info.is_verified ? "Yes" : "No"}
📸 Posts: ${user_info.posts}
👥 Followers: ${user_info.followers}
👣 Following: ${user_info.following}
				`.trim();

				await api.sendMessage({ body: messageBody, attachment: profilePicStream.data }, event.threadID);
		} catch (error) {
				console.error(error);
				return api.sendMessage("An error occurred while fetching the Instagram profile.", event.threadID);
		}
};
