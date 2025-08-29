const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
 name: "time",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "Joshua Sy", //don't change the credits please
 description: "Displays current time and bot runtime.",
 commandCategory: "Info",
 cooldowns: 1,
 dependencies: {
 "request": "",
 "fs-extra": "",
 "axios": ""
 }
};

module.exports.run = async function({ api, event }) {
 const uptime = process.uptime(),
 hours = Math.floor(uptime / 3600),
 minutes = Math.floor((uptime % 3600) / 60),
 seconds = Math.floor(uptime % 60);

 const currentTime = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【hh:mm:ss】");

 const imgLinks = [
 "https://i.imgur.com/EuiRi4v.jpeg",
 "https://i.imgur.com/ZjxQx17.jpeg",
 "https://i.imgur.com/dOO6Af5.jpeg",
 "https://i.imgur.com/WMIngcC.jpeg",
 "https://i.imgur.com/2dJSfXq.jpeg"
 ];

 const imgPath = __dirname + "/cache/time.jpg";
 const imgURL = imgLinks[Math.floor(Math.random() * imgLinks.length)];

 const message = `🌸 𝙰𝚜𝚜𝚊𝚕𝚊𝚖𝚘 𝚊𝚕𝚢𝚔𝚘𝚖 🌸

✨ 𝙱𝚘𝚝 𝚙𝚛𝚎𝚏𝚒𝚡: ${global.config.PREFIX}

📆 𝙲𝚞𝚛𝚎𝚗𝚝 𝚝𝚒𝚖𝚎: ${currentTime}

⏱️ 𝙱𝚘𝚝 𝚞𝚙𝚝𝚒𝚖𝚎: ${hours} hour(s), ${minutes} minute(s), ${seconds} second(s)

👑 𝙰𝚍𝚖𝚒𝚗: 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍


¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶────██████────¶
¶─◥██████████◤─¶
¶──◥████████◤──¶
¶────◥████◤────¶
¶─────◥██◤─────¶

  ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝💀`;

 const callback = () => {
 api.sendMessage({
 body: message,
 attachment: fs.createReadStream(imgPath)
 }, event.threadID, () => fs.unlinkSync(imgPath));
 };

 request(encodeURI(imgURL)).pipe(fs.createWriteStream(imgPath)).on("close", callback);
};
