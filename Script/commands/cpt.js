const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "/",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CYBER ☢️_𖣘 TEAM",
  description: "Islamic posts random share",
  commandCategory: "general",
  usages: "/",
  cooldowns: 10,
  dependencies: {
    request: "",
    "fs-extra": "",
    axios: ""
  }
};

module.exports.run = async function ({ api, event }) {
  const { threadID } = event;
  const prefix = global.config.PREFIX || "/";
  const req = global.nodemodule["request"];
  const fsx = global.nodemodule["fs-extra"];

  // Islamic Text posts
  const islamicTexts = [
    "💖∙──༅༎﷽༎༅─∙💖\n\n🕌🕌🕌🕌\nআমরা মানুষ আল্লাহ সুবহানাহু ওয়া তাআলার সৃষ্টি\n— আল্লাহর ঘর মসজিদ\n— নামাজ হলো ফরজ\n— কুরআনই সর্বোত্তম দিকনির্দেশ\n\n🌸”𝐀𝐥𝐡𝐚𝐦𝐝𝐮𝐥𝐢𝐥𝐥𝐚𝐡♡༎",
    "╔━━━━━━✦✦🖤\nপ্রকৃত ঈমান হলো ফরজ নামাজ, রোজা, যাকাত আদায় করা।\nআল্লাহ্‌র দরজা বন্ধ হয়ে যাবে না, যদি বান্দা দোয়া করে।\n╚━━━━━━✦✦🖤",
    "💟💟─༅༎•🍀🌷\nমুমিনের কোনো কষ্ট নেই। কারণ আল্লাহ তার জন্য উত্তম কিছু ঠিক রেখেছেন।\n💟💠─༅༎•🌿🦋🍁",
    "❀•✠••══╩╝\nরাসূল ﷺ বলেন: “তুমি যেখানেই থাক, আল্লাহকে ভয় করো। একটি খারাপ কাজ করলে সঙ্গে সঙ্গে একটি ভালো কাজ করে দাও।”\n❀•✠••══╩╝",
    "🌸 আল্লাহু তায়ালা বলেন:\nإِنَّا كَذَٰلِكَ نَجْزِى ٱلْمُحْسِنِينَ\n— আমরা সৎকর্মশীলদের এমনভাবেই প্রতিদান দেই।"
  ];

  // Random text select
  const text = islamicTexts[Math.floor(Math.random() * islamicTexts.length)];

  // Islamic poster images
  const images = [
    "https://i.imgur.com/Z4674C4.jpg",
    "https://i.imgur.com/JmwQicn.jpg",
    "https://i.imgur.com/XrhxE.jpg",
    "https://i.imgur.com/xfaDpuj.jpg",
    "https://i.imgur.com/X41jmrh.jpg",
    "https://i.imgur.com/ZuTnp.jpg",
    "https://i.imgur.com/VoGSL.jpg",
    "https://i.imgur.com/QBSbJ.jpg",
    "https://i.imgur.com/ctbbc.jpg",
    "https://i.imgur.com/IKUhF.jpg"
  ];

  const imgURL = images[Math.floor(Math.random() * images.length)];
  const filePath = __dirname + "/cyber.jpg";

  // Download image + send message
  req(encodeURI(imgURL))
    .pipe(fsx.createWriteStream(filePath))
    .on("close", () => {
      api.sendMessage(
        {
          body: text,
          attachment: fsx.createReadStream(filePath)
        },
        threadID,
        () => fsx.unlinkSync(filePath)
      );
    });
};
