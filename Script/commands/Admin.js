const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
 description: "Show Owner Info",
 commandCategory: "info",
 usages: "admin",
 cooldowns: 2
};

module.exports.run = async function({ api, event }) {
 const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

 const callback = () => api.sendMessage({
 body: `
┌───────────────⭓
│ 𝙾𝚆𝙽𝙴𝚁 𝙳𝙴𝚃𝙰𝙸𝙻𝚂
├───────────────
│ 👤 𝙽𝚊𝚖𝚎 : 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍
│ 🚹 𝙶𝚊𝚗𝚍𝚎𝚛 : 𝙼𝚊𝚕𝚎
│ ❤️ 𝚁𝚎𝚕𝚊𝚝𝚒𝚘𝚗 : 𝚂𝚒𝚗𝚐𝚊𝚕𝚎
│ 🎂 𝙰𝚐𝚎 : 18+
│ 🕌 𝚁𝚎𝚕𝚒𝚐𝚒𝚘𝚗 : 𝙸𝚜𝚕𝚊𝚖
│ 🎓 𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗 : 𝙷𝚂𝙲 (2026)
│ 🏡 𝙰𝚍𝚍𝚛𝚎𝚜𝚜 : 𝙲𝚑𝚞𝚊𝚍𝚊𝚗𝚐𝚊, 𝙰𝚕𝚘𝚖𝚍𝚊𝚗𝚐𝚊
└───────────────⭓

┌───────────────⭓
│ 𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙻𝙸𝙽𝙺𝚂
├───────────────
│ 📘 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔:
│ https://fb.com/100087277612935
│ 💬 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙:
│ https://wa.me/0191080......
└───────────────⭓

┌───────────────⭓
│ 🕒 𝚄𝚙𝚍𝚊𝚝𝚎 𝚃𝚒𝚖𝚎
├───────────────
│ ${time}
└───────────────⭓
 `,
 attachment: fs.createReadStream(__dirname + "/cache/owner.jpg")
 }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/owner.jpg"));

 return request("https://i.imgur.com/D7oETNr.jpeg")
 .pipe(fs.createWriteStream(__dirname + '/cache/owner.jpg'))
 .on('close', () => callback());
};
