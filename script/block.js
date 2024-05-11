async function getUserName(api, senderID, mentionID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.config = {
  name: "Block",
  version: "•.•",
  role: 2,
  hasPermision: 2,
  credits: "cliff",
  description: "Block a user",
  hasPrefix: false,
  usePrefix: false,
  commandCategory: "Admin",
  usages: "{p}{n} @mention, reply, senderID",
  aliases: ["block","ban"],
  usage: "{p}{n} @mention, reply, senderID",
  cooldown: 0,
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { mentions, messageReply, threadID, senderID, messageID } = event;
  const mentionID = args[0];
  if (!mentionID && !messageReply) {
    return api.sendMessage(`Please mention the user you want to block.`, threadID, messageID);
  }

  if (mentionID) {
    api.sendMessage("🛡️ | You have been blocked.", mentionID);
    api.sendMessage(`🚫 | ${await getUserName(api, mentionID)} has been blocked Successful.`, threadID, messageID);
    api.changeBlockedStatus(mentionID, true);
  } else if (messageReply) {
    const replySenderID = messageReply.senderID;
    api.sendMessage("🛡️ | You have been blocked.", replySenderID);
    api.sendMessage(`🚫 | ${await getUserName(api, replySenderID)} has been blocked Successful.`, threadID, messageID);
    api.changeBlockedStatus(replySenderID, true);
  }
};
