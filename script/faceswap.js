'use strict';

const fs = require('fs');

module.exports.config = {
		name: "faceswap",
		hasPrefix: false,
		role: 0,
		hasPermission: false,
		commandCategory: "no prefix",
		usePrefix: false,
		cooldown: 5,
		cooldowns: 5,
		aliases: [],
		description: "Generate image",
		usages: "{pn} reply to image",
		usage: "{pn} reply to image",
		credits: "Deku"
};

module.exports.run = async function({ api, event, args }) {
		try {
				const { Prodia } = require("prodia.js");
				const prodia = new Prodia("7e33be3f-5af6-42b2-854b-6439b3732050");
				const axios = require("axios");
				let url, url1;

				if (event.type == "message_reply") {
						if (event.messageReply.attachments.length < 0) return api.sendMessage("No image found.", event.threadID);
						if (event.messageReply.attachments[0].type !== "photo") return api.sendMessage("Only image can be converted.", event.threadID);
						url = event.messageReply.attachments[0].url;

						if (event.messageReply.attachments.lengt > 2) return api.sendMessage("Only 2 images can be converted.", event.threadID);

						url = event.messageReply.attachments[0].url;
						url1 = event.messageReply.attachments[1].url;

						api.sendTypingIndicator(event.threadID);
						const generate = await prodia.faceSwap({
								sourceUrl: encodeURI(url),
								targetUrl: encodeURI(url1),
						});

						while (generate.status !== "succeeded" && generate.status !== "failed") {
								await new Promise((resolve) => setTimeout(resolve, 250));
								const job = await prodia.getJob(generate.job);

								if (job.status === "succeeded") {
										let img = (await axios.get(job.imageUrl, { responseType: "arraybuffer" })).data;
										let filePath = __dirname + '/cache/gen.png';
										fs.writeFileSync(filePath, Buffer.from(img, "utf-8"));
										api.sendMessage({ attachment: fs.createReadStream(filePath) }, event.threadID);

										// Delete the generated image after sending
										fs.unlinkSync(filePath);
										return;
								}
						}
				} else {
						return api.sendMessage("Please reply to an image.", event.threadID);
				}
		} catch (e) {
				return api.sendMessage(e.message, event.threadID);
		}
};
