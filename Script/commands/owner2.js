const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
 name: "owner2",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "Shahadat SA HU",
 description: "Display bot owner's information",
 commandCategory: "Info",
 usages: "",
 cooldowns: 5,
 dependencies: {
 request: "",
 "fs-extra": "",
 axios: ""
 }
};

module.exports.run = async function ({ api, event }) {
 const imageUrl = "https://graph.facebook.com/61575698041722/picture?height=720&width=720&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662";
 const path = __dirname + "/cache/owner.png";

 request(imageUrl)
 .pipe(fs.createWriteStream(path))
 .on("close", () => {
 api.sendMessage({
 body:
`🌟 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 🌟

👑 𝙽𝚊𝚖𝚎: 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍😘
😻 𝙰𝚍𝚍𝚛𝚎𝚜𝚜: মেয়েদের মনে🙈
💼 𝙿𝚛𝚘𝚏𝚎𝚜𝚜𝚒𝚘𝚗: মেয়েদের মন জয় করা😍

🌐 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔: আইডি বেইচ্চা খাইয়া লাইছি😁
💬 𝙼𝚎𝚜𝚜𝚎𝚗𝚐𝚎𝚛: দিলে Future বউ ধইরা মারব😌
📺 𝚈𝚘𝚞𝚝𝚞𝚋𝚎: কবে YouTubal ছিলাম 😺
📸 𝙸𝚗𝚜𝚝𝚊𝚐𝚊𝚛𝚊𝚖: গরিব বলে ফেসবুক চালাই শুধু 🥺
📱 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙: দিলে আমার আম্মু বকা দিবা 🤣
🎵 𝚃𝚒𝚔𝚝𝚘𝚔: সরি আমি প্রতিবন্ধী না🥱
👻 𝚂𝚗𝚊𝚙𝚌𝚑𝚊𝚝: তোদের মতো কালা নাকি ফিল্টার লাগামু🤭

🤖 𝗕𝗢𝗧 𝗕𝗬: ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝💀
`,
 attachment: fs.createReadStream(path)
 }, event.threadID, () => fs.unlinkSync(path));
 });
};
