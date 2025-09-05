const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "/", // শুধু "/" দিলেই কাজ করবে
  version: "1.0.0",
  credits: "Shahadat Islamick Bot",
  description: "Islamic Poster Command",
  commandCategory: "poster",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  try {
    // Islamic Quotes
    const quotes = [
      "🌸 আলহামদুলিল্লাহ 🌸\n\nযে মানুষ আল্লাহর উপর ভরসা করে, তার জন্য আল্লাহই যথেষ্ট। 🤲",
      "🌺 রাসূল ﷺ বলেছেন: “তোমাদের মধ্যে সেই ব্যক্তি সর্বোত্তম, যে কুরআন শেখে এবং শেখায়।” 📖",
      "✨ দুনিয়া অস্থায়ী, আখিরাত স্থায়ী। দুনিয়াকে আখিরাতের জন্য ব্যবহার করো। ☪️",
      "🌿 নামাজ হলো জান্নাতের চাবি। 🕌",
    ];

    // Islamic Posters
    const images = [
      "https://i.imgur.com/8h1h2Nn.jpg",
      "https://i.imgur.com/er5Qj5n.jpg",
      "https://i.imgur.com/TgkK5TG.jpg",
      "https://i.imgur.com/6FvL4Ov.jpg",
    ];

    // Random select
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Download image
    const path = __dirname + "/cache/poster.jpg";
    const response = await axios.get(randomImage, { responseType: "arraybuffer" });
    fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

    // Send message
    api.sendMessage(
      {
        body: randomQuote,
        attachment: fs.createReadStream(path),
      },
      event.threadID,
      () => fs.unlinkSync(path)
    );

  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।", event.threadID);
  }
};
