const axios = require("axios");
const apiUrl = "https://nix-baby.vercel.app";

module.exports.config = {
  name: "baby",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ArYAN",
  description: "",
  commandCategory: "BABY",
  usages: "[message/query]",
  cooldowns: 0,
  prefix: false
};

async function handleReplyMsg(api, event, text) {
  try {
    const res = await axios.get(`${apiUrl}/baby?text=${encodeURIComponent(text)}&senderID=${event.senderID}&font=1`);
    const rep = res?.data?.reply;
    if (rep) {
      api.sendMessage(rep, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    } else {
      api.sendMessage("❌ | No response found. Please teach me!", event.threadID, event.messageID);
    }
  } catch (e) {
    api.sendMessage("❌ | Failed to fetch reply.", event.threadID, event.messageID);
  }
}

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const uid = event.senderID;
    const senderName = await Users.getNameUser(uid);
    const query = args.join(" ").trim();

    if (!query) {
      const ran = ["বল বেবি 💬", "হুম জানু 😚", "শুনছি বেবি 😘"];
      const r = ran[Math.floor(Math.random() * ran.length)];
      return api.sendMessage(`${senderName}, ${r}`, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    }

    if (args[0] === "remove") {
      const key = query.slice(7).trim();
      const res = await axios.get(`${apiUrl}/baby-remove?key=${encodeURIComponent(key)}`);
      return api.sendMessage(res.data.message || "Removed", event.threadID, event.messageID);
    }

    if (args[0] === "rm" && query.includes("-")) {
      const [key, repOrIdx] = query.slice(3).split(/\s*-\s*/);
      if (!key || repOrIdx === undefined) {
        return api.sendMessage("❌ | Use: rm [msg] - [reply/index]", event.threadID, event.messageID);
      }
      const param = !isNaN(parseInt(repOrIdx)) ? `index=${encodeURIComponent(repOrIdx)}` : `reply=${encodeURIComponent(repOrIdx)}`;
      const res = await axios.get(`${apiUrl}/baby-remove?key=${encodeURIComponent(key)}&${param}`);
      return api.sendMessage(res.data.message || "Removed", event.threadID, event.messageID);
    }

    if (args[0] === "list") {
      if (args[1] === "all") {
        const tRes = await axios.get(`${apiUrl}/teachers`);
        const teachers = tRes.data.teachers || {};
        const sorted = Object.keys(teachers).sort((a, b) => teachers[b] - teachers[a]);
        const list = await Promise.all(sorted.map(async id => {
          const name = await Users.getNameUser(id).catch(() => id);
          return `• ${name}: ${teachers[id]}`;
        }));
        return api.sendMessage(`👑 | Teachers:\n${list.join("\n")}`, event.threadID, event.messageID);
      } else {
        const infoRes = await axios.get(`${apiUrl}/baby-info`);
        return api.sendMessage(
          `❇️ | Total Teach = ${infoRes.data.totalKeys || "api off"}\n♻️ | Total Response = ${infoRes.data.totalReplies || "api off"}`,
          event.threadID,
          event.messageID
        );
      }
    }

    if (args[0] === "edit") {
      const parts = query.split(/\s*-\s*/);
      if (parts.length < 2) {
        return api.sendMessage("❌ | Use: edit [msg] - [newReply]", event.threadID, event.messageID);
      }
      const oldMsg = parts[0].replace("edit ", "");
      const newMsg = parts[1];
      const res = await axios.get(`${apiUrl}/baby-edit?key=${encodeURIComponent(oldMsg)}&replace=${encodeURIComponent(newMsg)}&senderID=${uid}`);
      return api.sendMessage(res.data.message || "Edited", event.threadID, event.messageID);
    }

    if (args[0] === "teach" && args[1] === "react") {
      const [comd, cmd] = query.split(/\s*-\s*/);
      const final = comd.replace("teach react ", "");
      if (!cmd) {
        return api.sendMessage("❌ | Invalid format!", event.threadID, event.messageID);
      }
      const res = await axios.get(`${apiUrl}/baby?teach=${encodeURIComponent(final)}&react=${encodeURIComponent(cmd)}`);
      return api.sendMessage(`✅ Replies added ${res.data.message}`, event.threadID, event.messageID);
    }

    if (args[0] === "teach") {
      const [comd, cmd] = query.split(/\s*-\s*/);
      const final = comd.replace("teach ", "");
      if (!cmd) {
        return api.sendMessage("❌ | Invalid format!", event.threadID, event.messageID);
      }
      const res = await axios.get(`${apiUrl}/baby?teach=${encodeURIComponent(final)}&reply=${encodeURIComponent(cmd)}&senderID=${uid}`);
      const teacher = await Users.getNameUser(uid).catch(() => uid);
      if (res.data.message === "This reply has already been taught for this question." || res.data.addedReplies?.length === 0) {
        return api.sendMessage(`❌ | This reply has already been taught.\nTeacher: ${teacher}\nReply: ${cmd}`, event.threadID, event.messageID);
      }
      const teachsRes = await axios.get(`${apiUrl}/teachers`);
      const teachCount = teachsRes.data.teachers[uid] || 0;
      const addedReplies = res.data.addedReplies?.join(", ") || cmd;
      return api.sendMessage(`✅ | Replies added "${addedReplies}" to "${final}".\nTeacher: ${teacher}\nTeachs: ${teachCount}`, event.threadID, event.messageID);
    }

    handleReplyMsg(api, event, query);
  } catch (err) {
    return api.sendMessage(`❌ | Error in baby command: ${err.message}`, event.threadID, event.messageID);
  }
};

module.exports.handleReply = async function ({ api, event }) {
  if (!event.body) return;
  handleReplyMsg(api, event, event.body.toLowerCase());
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  try {
    if (!event.body) return;
    const raw = event.body.toLowerCase().trim();
    const senderName = await Users.getNameUser(event.senderID);
    const senderID = event.senderID;
    const match = raw.match(/^(baby|bby|bot|জান|বেবি|বট|বেবী|বাবু|jan)\s*(.*)/);
    if (!match) return;
    const rest = match[2]?.trim();
    if (!rest) {
      const replies = ["বল বেবি 💬", "হুম জানু 😚", "শুনছি বেবি 😘"];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      return api.sendMessage({
        body: `${randomReply} @${senderName}`,
        mentions: [{ tag: `@${senderName}`, id: senderID }]
      }, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "baby"
          });
        }
      }, event.messageID);
    }
    handleReplyMsg(api, event, rest);
  } catch (err) {
    return api.sendMessage(`❌ | Error in handleEvent: ${err.message}`, event.threadID, event.messageID);
  }
};
