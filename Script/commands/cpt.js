const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "/", // এখন কমান্ড হবে "/"
  version: "1.0.0",
  hasPermssion: 0,
  credits: "SHAHADAT SCRIPT",
  description: "Slash কমান্ড দিলে ওয়েলকাম মেসেজ পাঠাবে",
  commandCategory: "fun",
  usages: "/",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID } = event;

  // মেসেজ
  const msg = `🌸 Assalamu Alaikum, dear member!  
✨ আমার বট ব্যবহার করে অনেক মজা পাবেন।  
📌 Here's how you can use the bot: 👇  

💝 help ➤ View all commands  
💡 info ➤ About the bot  
🤖 baby ➤ Automatic Chat  
📷 random pic ➤ Random picture  

Pro Tip: Explore hidden features! 🌺`;

  // কিছু র‍্যান্ডম ইমেজ (imgur থেকে)
  const images = [
    "https://i.imgur.com/vr59gnp.jpg",
    "https://i.imgur.com/3uW3OrW.jpg",
    "https://i.imgur.com/ENebaVC.jpg",
    "https://i.imgur.com/tl6Lt8Y.jpg",
    "https://i.imgur.com/nI6W6sM.jpg",
    "https://i.imgur.com/ObLm7Df.jpg"
  ];

  // র‍্যান্ডম ছবি সিলেক্ট করা
  const img = images[Math.floor(Math.random() * images.length)];

  // ছবি ডাউনলোড করে পাঠানো
  request(encodeURI(img))
    .pipe(fs.createWriteStream(__dirname + "/slash.jpg"))
    .on("close", () => {
      api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(__dirname + "/slash.jpg")
        },
        threadID,
        () => fs.unlinkSync(__dirname + "/slash.jpg")
      );
    });
};
