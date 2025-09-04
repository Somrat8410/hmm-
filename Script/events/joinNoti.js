module.exports.config = {
  name: "joinnoti",
  eventType: ["log:subscribe"],
  version: "1.0.2",
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Welcome message with optional image/video",
  dependencies: {
    "fs-extra": "",
    "path": ""
  }
};

module.exports.onLoad = function () {
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { join } = global.nodemodule["path"];
  const paths = [
    join(__dirname, "cache", "joinGif"),
    join(__dirname, "cache", "randomgif")
  ];
  for (const path of paths) {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
  }
};

module.exports.run = async function({ api, event }) {
  const fs = require("fs");
  const path = require("path");
  const { threadID } = event;
  
  const botPrefix = global.config.PREFIX || "/";
  const botName = global.config.BOTNAME || "𝗦𝗵𝗮𝗵𝗮𝗱𝗮𝘁 𝗖𝗵𝗮𝘁 𝗕𝗼𝘁";

 
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    await api.changeNickname(`[ ${botPrefix} ] • ${botName}`, threadID, api.getCurrentUserID());

    api.sendMessage("𝙰𝚜𝚜𝚊𝚕𝚊𝚖𝚘 𝚊𝚕𝚢𝚔𝚘𝚖 𝚎𝚟𝚎𝚛𝚢𝚘𝚗𝚎🌸🩷", threadID, () => {
      const randomGifPath = path.join(__dirname, "cache", "randomgif");
      const allFiles = fs.readdirSync(randomGifPath).filter(file =>
        [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
      );

      const selected = allFiles.length > 0 
        ? fs.createReadStream(path.join(randomGifPath, allFiles[Math.floor(Math.random() * allFiles.length)])) 
        : null;

      const messageBody = `╭•┄┅═══❁🌺❁═══┅┄•╮
     আ্ঁস্ঁসা্ঁলা্ঁমু্ঁ💚আ্ঁলা্ঁই্ঁকু্ঁম্ঁ
╰•┄┅═══❁🌺❁═══┅┄•╯

»𝚃𝚑𝚊𝚗𝚔𝚢𝚘𝚞 𝚜𝚘 𝚖𝚞𝚌𝚑 𝚏𝚘𝚛 𝚊𝚍𝚍𝚒𝚗𝚐 𝚖𝚎 𝚝𝚘 𝚢𝚘𝚞𝚛 𝚐𝚛𝚞𝚙 𝙸 𝚠𝚒𝚕𝚕 𝚊𝚕𝚠𝚢𝚜 𝚜𝚎𝚛𝚟𝚎 𝚢𝚘𝚞 𝚒𝚗𝚜𝚊𝚊𝚕𝚕𝚊𝚑-!!🌺🩷

»𝚃𝚘 𝚟𝚒𝚎𝚠 𝚊𝚗𝚢 𝚌𝚘𝚖𝚖𝚊𝚗𝚍:
${botPrefix}𝙷𝚎𝚕𝚙
${botPrefix}𝙸𝚗𝚏𝚘
${botPrefix}𝙰𝚍𝚖𝚒𝚗

» যেকোনো অভিযোগ অথবা হেল্প এর জন্য এডমিন 𝚂𝚘𝚖𝚛𝚊𝚝 কে নক করতে পারেন-!!💀🌸
»𝙼𝚎𝚜𝚜𝚎𝚗𝚐𝚎𝚛: https://m.me/100087277612935
»𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙: https://wa.me/0191080....

❖⋆═════════════════════⋆❖`;

      if (selected) {
        api.sendMessage({ body: messageBody, attachment: selected }, threadID);
      } else {
        api.sendMessage(messageBody, threadID);
      }
    });

    return;
  }

 
  try {
    const { createReadStream, readdirSync } = global.nodemodule["fs-extra"];
    let { threadName, participantIDs } = await api.getThreadInfo(threadID);
    const threadData = global.data.threadData.get(parseInt(threadID)) || {};
    let mentions = [], nameArray = [], memLength = [], i = 0;

    for (let id in event.logMessageData.addedParticipants) {
      const userName = event.logMessageData.addedParticipants[id].fullName;
      nameArray.push(userName);
      mentions.push({ tag: userName, id });
      memLength.push(participantIDs.length - i++);
    }
    memLength.sort((a, b) => a - b);

    let msg = (typeof threadData.customJoin === "undefined") ? `♡ ∩_∩
（„• ֊ •„)♡
╭─∪∪────────────⟡
│ 🛡️𝙰𝚜𝚜𝚊𝚕𝚊𝚖𝚘 𝚊𝚕𝚢𝚔𝚘𝚖🛡️
├───────────────⟡
»𝙳𝚎𝚊𝚛 {name}, 𝚠𝚎𝚕𝚌𝚊𝚖𝚎  𝚝𝚘 𝚝𝚑𝚎 𝚌𝚑𝚊𝚝 𝚐𝚛𝚞𝚙 𝚢𝚘𝚞 𝚊𝚛𝚎 𝚝𝚑𝚎 {soThanhVien}𝚝𝚑 𝚖𝚎𝚖𝚋𝚎𝚛 𝚘𝚏 𝚝𝚑𝚒𝚜 𝚐𝚛𝚞𝚙 𝚙𝚕𝚎𝚜𝚎 𝚒𝚗𝚓𝚘𝚢-:)👻🤡🤸‍♂️

🌀🌬️𝙶𝚛𝚞𝚙 : {threadName}

👑 𝙱𝚘𝚝 𝙰𝚍𝚖𝚒𝚗 : 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍-🧸💀

╚═════❖••°°••❖═════╝` : threadData.customJoin;

    msg = msg
      .replace(/\{name}/g, nameArray.join(', '))
      .replace(/\{soThanhVien}/g, memLength.join(', '))
      .replace(/\{threadName}/g, threadName);

    const joinGifPath = path.join(__dirname, "cache", "joinGif");
    const files = readdirSync(joinGifPath).filter(file =>
      [".mp4", ".jpg", ".png", ".jpeg", ".gif", ".mp3"].some(ext => file.endsWith(ext))
    );
    const randomFile = files.length > 0 
      ? createReadStream(path.join(joinGifPath, files[Math.floor(Math.random() * files.length)])) 
      : null;

    return api.sendMessage(
      randomFile ? { body: msg, attachment: randomFile, mentions } : { body: msg, mentions },
      threadID
    );
  } catch (e) {
    console.error(e);
  }
};
