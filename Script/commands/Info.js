module.exports.config = {
 name: "info",
 version: "1.2.6",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
 description: "Bot information command",
 commandCategory: "For users",
 hide: true,
 usages: "",
 cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users, Threads }) {
 const { threadID } = event;
 const request = global.nodemodule["request"];
 const fs = global.nodemodule["fs-extra"];
 const moment = require("moment-timezone");

 const { configPath } = global.client;
 delete require.cache[require.resolve(configPath)];
 const config = require(configPath);

 const { commands } = global.client;
 const threadSetting = (await Threads.getData(String(threadID))).data || {};
 const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : config.PREFIX;

 const uptime = process.uptime();
 const hours = Math.floor(uptime / 3600);
 const minutes = Math.floor((uptime % 3600) / 60);
 const seconds = Math.floor(uptime % 60);

 const totalUsers = global.data.allUserID.length;
 const totalThreads = global.data.allThreadID.length;

 const msg = `╭⭓ ⪩ 𝙱𝙾𝚃 𝙸𝙽𝙵𝙾𝚁𝙼𝙰𝚃𝙸𝙾𝙽 ⪨
│
├─ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝
├─ ☢️ 𝙿𝚛𝚎𝚏𝚒𝚡 : ${config.PREFIX}
├─ ♻️ 𝙿𝚛𝚎𝚏𝚒𝚡 𝙱𝚘𝚡 : ${prefix}
├─ 🔶 𝙼𝚘𝚍𝚞𝚕𝚜 : ${commands.size}
├─ 🔰 𝙿𝚒𝚗𝚐 : ${Date.now() - event.timestamp}ms
│
╰───────⭓

╭⭓ ⪩ 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 ⪨
│
├─ 👑 𝙽𝚊𝚖𝚎 : 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍
├─ 📲 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 :
│ facebook.com/100087277612935
├─ 💌 𝙼𝚎𝚜𝚜𝚎𝚗𝚐𝚎𝚛 :
│ m.me/100087277612935
├─ 📞 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 :
│ wa.me/+880191080.....
│
╰───────⭓

╭⭓ ⪩ 𝙰𝙲𝚃𝙸𝚅𝙸𝙴𝚂 ⪨
│
├─ ⏳ 𝙰𝚌𝚝𝚒𝚟𝚎 𝚃𝚒𝚖𝚎 : ${hours}h ${minutes}m ${seconds}s
├─ 📣 𝙶𝚛𝚘𝚞𝚙𝚜 : ${totalThreads}
├─ 🧿 𝚃𝚘𝚝𝚊𝚕 𝚄𝚜𝚎𝚛𝚜 : ${totalUsers}
╰───────⭓

𝚃𝚑𝚊𝚗𝚔𝚜 𝚏𝚘𝚛 𝚞𝚜𝚒𝚗𝚐
 ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝💀`;

 const imgLinks = [
 "https://i.imgur.com/bW02oCE.jpeg",];

 const imgLink = imgLinks[Math.floor(Math.random() * imgLinks.length)];

 const callback = () => {
 api.sendMessage({
 body: msg,
 attachment: fs.createReadStream(__dirname + "/cache/info.jpg")
 }, threadID, () => fs.unlinkSync(__dirname + "/cache/info.jpg"));
 };

 return request(encodeURI(imgLink)).pipe(fs.createWriteStream(__dirname + "/cache/info.jpg")).on("close", callback);
};
