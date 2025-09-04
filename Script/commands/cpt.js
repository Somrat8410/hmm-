const fs = require("fs-extra");
const request = require("request");
const axios = require("axios");

module.exports.config = {
  name: "welcome",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SCRIPT",
  description: "Bot ব্যবহার করার নিয়ম শেখানোর জন্য",
  commandCategory: "system",
  usages: "/",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const prefix = global.config.PREFIX || "/";
  const requestLib = global.nodemodule["request"];
  const fsLib = global.nodemodule["fs-extra"];

  // ওয়েলকাম মেসেজ টেমপ্লেট
  var welcomeMessages = [
    `🌸 Assalamu Alaikum, dear member!  
✨ আমার বট ব্যবহার করে অনেক মজা পাবেন।  
📌 Here's how you can use the bot: 👇  
\n💝 help ➤ View all commands  
💡 info ➤ About the bot  
🤖 baby ➤ Automatic Chat  
📷 random pic ➤ Random picture  
\nPro Tip: Explore hidden features! 🌺`
  ];

  // র‍্যান্ডম মেসেজ সিলেক্ট
  var msg = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  // কিছু র‍্যান্ডম ইমেজ লিংক (imgur থেকে নেওয়া)
  var images = [
    "https://i.imgur.com/vr59gnp.jpg",
    "https://i.imgur.com/3uW3OrW.jpg",
    "https://i.imgur.com/ENebaVC.jpg",
    "https://i.imgur.com/tl6Lt8Y.jpg",
    "https://i.imgur.com/nI6W6sM.jpg",
    "https://i.imgur.com/ObLm7Df.jpg",
    "https://i.imgur.com/ETDkFyf.jpg",
    "https://i.imgur.com/niBV0ZV.jpg",
    "https://i.imgur.com/fQZhwWg.jpg",
    "https://i.imgur.com/gUQTUkN.jpg",
    "https://i.imgur.com/xXQIZ7U.jpg",
    "https://i.imgur.com/QIYO8lo.jpg",
    "https://i.imgur.com/d9TRavK.jpg",
    "https://i.imgur.com/X1OPkox.jpg",
    "https://i.imgur.com/7wZ1Ael.jpg",
    "https://i.imgur.com/2ProK0c.jpg",
    "https://i.imgur.com/KxkUNYJ.jpg",
    "https://i.imgur.com/yT294WF.jpg"
  ];

  // র‍্যান্ডম ছবি বাছাই
  var img = images[Math.floor(Math.random() * images.length)];

  // ছবি ডাউনলোড করে সেন্ড করা
  requestLib(encodeURI(img))
    .pipe(fsLib.createWriteStream(__dirname + "/welcome.jpg"))
    .on("close", () => {
      api.sendMessage(
        {
          body: msg,
          attachment: fsLib.createReadStream(__dirname + "/welcome.jpg")
        },
        event.threadID,
        () => fsLib.unlinkSync(__dirname + "/welcome.jpg")
      );
    });
};
