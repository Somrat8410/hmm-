module.exports.config = {
name: "fork",
version: "1.0.0",
hasPermssion: 0,
credits: "SHAHADAT SAHU",
description: "Send GitHub repo link",
commandCategory: "other",
usages: "fork",
cooldowns: 3,
};

module.exports.run = async function({ api, event }) {
return api.sendMessage(
"-Fork-তোমার পিছন দিয়ে দিবো সোনা🐸😒🍼যাও আচার খাও-!!🥱🫃",
event.threadID,
event.messageID
);
};

