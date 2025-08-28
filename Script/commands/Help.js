module.exports.config = {
 name: "help",
 version: "1.0.4",
 hasPermssion: 0,
 credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
 description: "Shows all commands with details",
 commandCategory: "system",
 usages: "[command name/page number]",
 cooldowns: 5,
 envConfig: {
 autoUnsend: true,
 delayUnsend: 20
 }
};

module.exports.languages = {
 "en": {
 "moduleInfo": `


╭━━━━━━━━━━━━━━━━╮\n┃ ✨ 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙳𝙴𝚃𝙰𝙸𝙻𝚂 ✨\n┣━━━━━━━━━━━┫\n┃ 🔖 𝙽𝚊𝚖𝚎: %1\n┃ 📄 𝙿𝚊𝚐𝚎: %2/%3\n┃ 🧮 𝚃𝚘𝚝𝚊𝚕: %4\n┣━━━━━━━━━━━━━━━━┫\n%5\n┣━━━━━━━━━━━━━━━━┫\n┃ ⚙ 𝙿𝚛𝚎𝚏𝚒𝚡: %6\n┃ 🤖 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎: ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝\n┃ 👑 𝙾𝚠𝚗𝚎𝚛: 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍\n╰━━━━━━━━━━━━━━━━╯



`,
 "helpList": "[ There are %1 commands. Use: \"%2help commandName\" to view more. ]",
 "user": "User",
 "adminGroup": "Admin Group",
 "adminBot": "Admin Bot"
 }
};

module.exports.handleEvent = function ({ api, event, getText }) {
 const { commands } = global.client;
 const { threadID, messageID, body } = event;

 if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
 const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
 if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const command = commands.get(splitBody[1].toLowerCase());
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
 const totalCommands = commands.size;
 const page = 1;

 let commandList = "";
 commands.forEach((cmd) => {
 if (cmd.config && cmd.config.name && cmd.config.description) {
 commandList += `┃ ✪ ${cmd.config.name} - ${cmd.config.description}\n`;
 }
 });

 return api.sendMessage(getText("moduleInfo", command.config.name, page, Math.ceil(totalCommands / 10), totalCommands, commandList, prefix), threadID, messageID);
};

module.exports.run = function ({ api, event, args, getText }) {
 const request = require("request");
 const fs = require("fs-extra");
 const { commands } = global.client;
 const { threadID, messageID } = event;
 const command = commands.get((args[0] || "").toLowerCase());
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

 if (!command) {
 const arrayInfo = [];
 const page = parseInt(args[0]) || 1;
 const numberOfOnePage = 20;
 let msg = "";

 for (var [name] of commands) {
 if (name && name.trim() !== "") arrayInfo.push(name.trim());
 }
 arrayInfo.sort();

 const totalPages = Math.ceil(arrayInfo.length / numberOfOnePage);
 const start = numberOfOnePage * (page - 1);
 const helpView = arrayInfo.slice(start, start + numberOfOnePage);

 for (let cmdName of helpView) {
 if (cmdName && cmdName.trim() !== "") {
 msg += `┃ ✪ ${cmdName}\n`;
 }
 }

 const text = `


╭━━━━━━━━━━━━━━━━╮\n┃ 📜 𝙲𝙾𝙼𝙼𝙴𝙽𝙳 𝙻𝙸𝚂𝚃 📜\n┣━━━━━━━━━━━━━━━┫\n┃ 📄 𝙿𝚊𝚐𝚎: ${page}/${totalPages}\n┃ 🧮 𝚃𝚘𝚝𝚊𝚕: ${arrayInfo.length}\n┣━━━━━━━━━━━━━━━━┫\n${msg}┣━━━━━━━━━━━━━━━━┫\n┃ ⚙ 𝙿𝚛𝚎𝚏𝚒𝚡: ${prefix}\n┃ 🤖 𝙱𝚘𝚝 𝙽𝚊𝚖𝚎: ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝙲𝚑𝚊𝚝 𝙱𝚘𝚝\n┃ 👑 𝙾𝚠𝚗𝚎𝚛 𝙽𝚊𝚖𝚎: 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍\n╰━━━━━━━━━━━━━━━━╯

`;

 const imgPath = __dirname + "/cache/helppic.jpg";
 const callback = () => api.sendMessage({ body: text, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);
 return request("https://i.imgur.com/sxSn1K3.jpeg").pipe(fs.createWriteStream(imgPath)).on("close", () => callback());
 }

 const detail = getText("moduleInfo", command.config.name, "1", "1", "1", `┃ ✪ ${command.config.name} - ${command.config.description}`, prefix);
 const imgPath = __dirname + "/cache/helppic.jpg";
 const callback = () => api.sendMessage({ body: detail, attachment: fs.createReadStream(imgPath) }, threadID, () => fs.unlinkSync(imgPath), messageID);
 return request("https://i.imgur.com/sxSn1K3.jpeg").pipe(fs.createWriteStream(imgPath)).on("close", () => callback());
};
