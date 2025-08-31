module.exports.config = {
  name: "prefix",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Shahadat SAHU",
  description: "Display the bot's prefix and owner info",
  commandCategory: "Information",
  usages: "",
  cooldowns: 5
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body } = event;
  if (!body) return;

  var dataThread = await Threads.getData(threadID);
  var data = dataThread.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  const groupName = dataThread.threadInfo?.threadName || "Unnamed Group";

  const triggerWords = [
    "prefix", "mprefix", "mpre", "bot prefix", "what is the prefix", "bot name",
    "how to use bot", "bot not working", "bot is offline", "prefx", "prfix",
    "perfix", "bot not talking", "where is bot", "bot dead", "bots dead",
    "dấu lệnh", "daulenh", "what prefix", "freefix", "what is bot", "what prefix bot",
    "how use bot", "where are the bots", "where prefix"
  ];

  let lowerBody = body.toLowerCase();
  if (triggerWords.includes(lowerBody)) {
    return api.sendMessage(
`♡ ∩_∩
（„• ֊ •„)♡
╭─∪∪────────────⟡
│  𝙿𝚁𝙴𝙵𝙸𝚇 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽
├───────────────⟡

 【𝙱𝙾𝚃 𝙸𝙽𝙵𝙾】
🌐 𝙱𝚘𝚝 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${prefix} ]
👾 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎 : 𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝
 👑 𝙱𝚘𝚝 𝙰𝚍𝚖𝚒𝚗 : ⦿ 𝚂𝚘𝚖𝚛𝚝 𝙰𝚑𝚊𝚖𝚎𝚍

【𝙱𝙾𝚇 𝙸𝙽𝙵𝙾】
🌐 𝙱𝚘𝚡 𝙿𝚛𝚎𝚏𝚒𝚡 : ${prefix}
💌 𝙱𝚘𝚡 𝙽𝚊𝚖𝚎 : ${groupName}
🪩 𝙱𝚘𝚡 𝚃𝚒𝚍 : ${threadID}`,
      threadID,
      null
    );
  }
};

module.exports.run = async ({ event, api }) => {
  return api.sendMessage("Type 'prefix' or similar to get the bot info.", event.threadID);
};
