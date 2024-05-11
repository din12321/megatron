const axios = require('axios');
const fs = require('fs').promises;

const storageFile = 'user_data.json';
const axiosStatusFile = 'axios_status.json';

const primaryApiUrl = 'https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/gptconvo';
const backupApiUrl = 'https://jonellccapisprojectv2-a62001f39859.herokuapp.com/api/v2/ai';

let isPrimaryApiStable = true;

module.exports.config = {
		name: "ai",
		version: "1.0.0",
		role: 0,
		credits: "Jonell Magallanes",
		description: "EDUCATIONAL",
		hasPrefix: false,
		aliases: ["gpt","ai"],
		usages: "[question]",
		cooldowns: 5,
		hasPermission: 0,
		commandCategory: "boxchat",
		usage: "[question]",
		usePrefix: false,
		cooldowns: 3,

};

module.exports.run = async function ({ api, event, args }) {
		const content = encodeURIComponent(args.join(" "));
		const uid = event.senderID;

		let apiUrl, apiName;

		if (isPrimaryApiStable) {
				apiUrl = `${primaryApiUrl}?ask=${content}&id=${uid}`;
				apiName = 'Primary Axios';
		} else {
				apiUrl = `${backupApiUrl}?ask=${content}`;
				apiName = 'Backup Axios';
		}

		if (!content) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", event.threadID, event.messageID);

		try {
				api.sendMessage(`🔍 | AI is searching for your answer. Please wait...`, event.threadID, event.messageID);

				const response = await axios.get(apiUrl);
				const result = isPrimaryApiStable ? response.data.response : response.data.message;

				if (!result) {
						throw new Error("Axios response is undefined");
				}

				const userData = await getUserData(uid);
				userData.requestCount = (userData.requestCount || 0) + 1;
				userData.responses = userData.responses || [];
				userData.responses.push({ question: content, response: result });
				await saveUserData(uid, userData, apiName);

				const totalRequestCount = await getTotalRequestCount();
				const userNames = await getUserNames(api, uid);

				const responseMessage = `${result}\n\n👤 Question Asked by: ${userNames.join(', ')}`;
				api.sendMessage(responseMessage, event.threadID, event.messageID);

				await saveAxiosStatus(apiName);

				if (!isPrimaryApiStable) {
						isPrimaryApiStable = true;
						api.sendMessage("🔃 | Switching back to the primary Axios. Just please wait.", event.threadID);
				}

		} catch (error) {
				console.error(error);

				try {
						api.sendMessage("🔄 | Trying Switching Axios!", event.threadID);
						const backupResponse = await axios.get(`${backupApiUrl}?ask=${content}`);
						const backupResult = backupResponse.data.message;

						if (!backupResult) {
								throw new Error("Backup Axios response is undefined");
						}

						const userData = await getUserData(uid);
						userData.requestCount = (userData.requestCount || 0) + 1;
						userData.responses = userData.responses || [];
						userData.responses.push({ question: content, response: backupResult });
						await saveUserData(uid, userData, 'Backup Axios');

						const totalRequestCount = await getTotalRequestCount();
						const userNames = await getUserNames(api, uid);

						const responseMessage = `${backupResult}\n\n👤 Question Asked by: ${userNames.join(', ')}`;
						api.sendMessage(responseMessage, event.threadID, event.messageID);

						isPrimaryApiStable = false;

						await saveAxiosStatus('Backup Axios');

				} catch (backupError) {
						console.error(backupError);
						api.sendMessage("An error occurred while processing your request.", event.threadID);

						await saveAxiosStatus('Unknown');
				}
		}
};

async function getUserData(uid) {
		try {
				const data = await fs.readFile(storageFile, 'utf-8');
				const jsonData = JSON.parse(data);
				return jsonData[uid] || {};
		} catch (error) {
				return {};
		}
}

async function saveUserData(uid, data, apiName) {
		try {
				const existingData = await getUserData(uid);
				const newData = { ...existingData, ...data, apiUsed: apiName };
				const allData = await getAllUserData();
				allData[uid] = newData;
				await fs.writeFile(storageFile, JSON.stringify(allData, null, 2), 'utf-8');
		} catch (error) {
				console.error('Error saving user data:', error);
		}
}

async function getTotalRequestCount() {
		try {
				const allData = await getAllUserData();
				return Object.values(allData).reduce((total, userData) => total + (userData.requestCount || 0), 0);
		} catch (error) {
				return 0;
		}
}

async function getUserNames(api, uid) {
		try {
				const userInfo = await api.getUserInfo([uid]);
				return Object.values(userInfo).map(user => user.name || `User${uid}`);
		} catch (error) {
				console.error('Error getting user names:', error);
				return [];
		}
}

async function getAllUserData() {
		try {
				const data = await fs.readFile(storageFile, 'utf-8');
				return JSON.parse(data) || {};
		} catch (error) {
				return {};
		}
}

async function saveAxiosStatus(apiName) {
		try {
				await fs.writeFile(axiosStatusFile, JSON.stringify({ axiosUsed: apiName }), 'utf-8');
		} catch (error) {
				console.error('Error saving Axios status:', error);
		}
}
