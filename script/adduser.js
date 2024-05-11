const axios = require('axios');
const cheerio = require('cheerio');

module.exports.config = {
	name: "add",
	version: "1.0.1",
	role: 0,
	hasPermission: 0,
	credits: "dagul",
	description: "Add user to group by id",
	hasPrefix: false,
	usePrefix: false,
	commandCategory: "group",
	usages: "adduser [id] [link]",
	usage: "[args]",
	aliases: ["add","Add"],
	cooldowns: 5,
	cooldown: 5
};

module.exports.run = async function ({ api, event, args }) {
	const { threadID, messageID } = event;
	const botID = api.getCurrentUserID();
	const out = msg => api.sendMessage(msg, threadID, messageID);
	var { participantIDs, approvalMode, adminIDs } = await api.getThreadInfo(threadID);
	var participantIDs = participantIDs.map(e => parseInt(e));
	if (!args[0]) return out("Please enter a UID");
	if (!isNaN(args[0])) return adduser(args[0], args[1]);
	else {
		try {
			var [id, name, fail] = await getUID(args[0], api, args[1]); 
			if (fail == true && id != null) return out(id);
			else if (fail == true && id == null) return out("User ID not found.")
			else {
				await adduser(id, name || "Facebook users", args[1]);
			}
		} catch (e) {
			return out(`${e.name}: ${e.message}.`);
		}
	}

	async function adduser(id, name, link) {
		id = parseInt(id);
		if (participantIDs.includes(id)) return out(`${name ? name : "Member"} is already in the group.`);
		else {
			var admins = adminIDs.map(e => parseInt(e.id));
			try {
				await api.addUserToGroup(id, threadID);
			}
			catch {
				return out(`Can't add ${name ? name : "user"} in group.`);
			}
			if (approvalMode === true && !admins.includes(botID)) return out(`Added ${name ? name : "member"} to the approved list !`);
			else return out(`Added ${name ? name : "member"} to the group !`)
		}
	}
}

async function getUID(input, api, link) { 
	try {
		const id = await findUid(input, link);
		const name = await getUserNames(api, id);
		return [id, name];
	} catch (error) {
		throw error;
	}
}

async function getUserNames(api, uid) {
		try {
				const userInfo = await api.getUserInfo([uid]);
				return Object.values(userInfo).map(user => user.name || `https://www.facebook.com/${uid}`);
		} catch (error) {
				console.error('Error getting user names:', error);
				return [];
		}
}

async function findUid(link) {
	try {
		const response = await axios.post(
			'https://seomagnifier.com/fbid',
			new URLSearchParams({
				'facebook': '1',
				'sitelink': link
			}),
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'Cookie': 'PHPSESSID=01420e06c5c3ecec07d950ed09a341b0'
				}
			}
		);
		const id = response.data;
		if (isNaN(id)) {
			const html = await axios.get(link);
			const $ = cheerio.load(html.data);
			const el = $('meta[property="al:android:url"]').attr('content');
			if (!el) {
				throw new Error('UID not found');
			}
			const number = el.split('/').pop();
			return number;
		}
		return id;
	} catch (error) {
		throw new Error('An unexpected error occurred. Please try again.');
	}
}
