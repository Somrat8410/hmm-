module.exports.config = {
 name: "owner",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
 description: "Owner information command with styled box",
 commandCategory: "Information",
 usages: "",
 cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
 const ownerInfo = 
`╔═════════════════════╗
║ 𝙾𝚆𝙽𝙴𝚁 𝙸𝙽𝙵𝙾 
╠═════════════════════╣
║ 👤 𝙽𝚊𝚖𝚎 : 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍
║ 🧸 𝙽𝚒𝚌𝚔 𝙽𝚊𝚖𝚎 : 𝚃𝚘𝚡𝚌𝚒
║ 🎂 𝙰𝚐𝚎 : 18+
║ 💘 𝚁𝚎𝚕𝚊𝚝𝚒𝚘𝚗 : 𝚂𝚒𝚗𝚐𝚊𝚕𝚎
║ 🎓 𝙿𝚛𝚘𝚏𝚏𝚎𝚜𝚒𝚘𝚗 : 𝚂𝚝𝚞𝚍𝚎𝚗𝚝
║ 📚 𝙴𝚍𝚞𝚌𝚊𝚝𝚒𝚘𝚗 : 𝙷𝚂𝙲
║ 🏡 𝙰𝚍𝚎𝚛𝚎𝚜𝚜 : 𝙲𝚑𝚞𝚊𝚍𝚊𝚗𝚐𝚊, 𝙰𝚕𝚘𝚖𝚍𝚊𝚗𝚐𝚊
╠═════════════════════╣
║ 𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙻𝙸𝙽𝙺𝚂 
╠═════════════════════╣
║ 📘 𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔 : 
║ https://fb.com/100087277612935
║ 💬 𝙼𝚎𝚜𝚜𝚎𝚗𝚐𝚎𝚛 : 
║ m.me/100087277612935
║ 📞 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 : 
║ https://wa.me/0191080....
║ ✈️ 𝚃𝚎𝚕𝚎𝚐𝚛𝚊𝚖 : 
║ https://t.me/𝚂𝚘𝚖𝚛𝚊𝚝
╚═════════════════════╝`;

 return api.sendMessage(ownerInfo, event.threadID, event.messageID);
};
