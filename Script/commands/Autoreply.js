const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐒𝐡𝐚𝐡𝐚𝐝𝐚𝐭 𝐈𝐬𝐥𝐚𝐦",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "অরেক বেডারে Miss না করে xan মেয়ে হলে বস সম্রাট রে হাঙ্গা করো😶👻😘",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "help": "𝙿𝚛𝚎𝚏𝚒𝚡 𝚍𝚊 𝚜𝚊𝚕𝚊👾",
    "hi": "এত হাই-হ্যালো কর ক্যান প্রিও..!😜🫵",
    "bc": "𝚂𝚊𝚖𝚎 𝚝𝚘 𝚢𝚘𝚞😊",
    "pro": "Khud k0o KYa LeGend SmJhTi Hai 😂",
    "good morning": "𝙶𝚘𝚘𝚍 𝚖𝚘𝚛𝚗𝚒𝚗𝚐 দাত ব্রাশ করে খেয়ে নেও😚",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "Somrat": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎𝙾𝚠𝚗𝚎𝚛: 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍\nFacebook: https://www.facebook.com/somrat.3.2025",
    "admin": "𝙷𝚎 𝚒𝚜 𝚂𝚘𝚖𝚛𝚊𝚝 𝙰𝚑𝚖𝚎𝚍 তাকে সবাই  এই নামেই হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "assalamualaikum": "𝚆𝚊𝚕𝚊𝚢𝚔𝚘𝚖 𝚊𝚜 𝚜𝚊𝚕𝚊𝚖🌸🩷",
    "fork": "তোর gf এর সোনা💀🐸😾",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস সম্রাট রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস সম্রাট এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "by": "কিরে তুই কই যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami somrat": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোমার গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "𝙼𝚢 𝚗𝚊𝚖𝚎 𝚒𝚜 ─꯭─⃝‌‌𝚂𝚘𝚖𝚛𝚊𝚝 𝚌𝚑𝚊𝚝 𝙱𝚘𝚝💀",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "ভাই তুই এত হাসিস না..!🌚🤣",
    "love you": "ভালোবাসা নামক আবলামী করতে চাইলে Boss সম্রাট এর ইনবক্সে গুতা দিন 😘",
    "ki koro jan": "তোমার কথা ভাবতে ছি জানু",
    "bot koi": "হ্যাঁ সব কেমন আছেন আপনার ওই খানে উম্মাহ 😘😽🙈"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
