const RULES_MESSAGE = `╭━━━〔 📜 𝐆𝐑𝐎𝐔𝐏 𝐑𝐔𝐋𝐄𝐒 🤳🏾 〕━━━╮

🚫 𝐃𝐎 𝐍𝐎𝐓 𝐀𝐋𝐋𝐎𝐖 𝐓𝐇𝐈𝐒 ❌

🔴 №¹ ➠ 🚫 𝙿𝚘𝚛𝚗
🔴 №² ➠ 🚫 𝚂𝚌𝚊𝚖𝚖𝚒𝚗𝚐
🔴 №³ ➠ 🚫 𝚂𝚎𝚕𝚕𝚒𝚗𝚐
🔴 №⁴ ➠ 🚫 𝙰𝚋𝚞𝚜𝚎
🔴 №⁵ ➠ 🚫 𝙻𝚒𝚗𝚔𝚜
🔴 №⁶ ➠ 🚫 𝚅𝚘𝚒𝚌𝚎 𝙽𝚘𝚝𝚎𝚜

╭━━━〔 ✅ 𝐀𝐋𝐋𝐎𝐖𝐄𝐃 〕━━━╮

🤖 ➠ 𝙱𝚘𝚝 𝙷𝚘𝚜𝚝𝚒𝚗𝚐 𝚃𝚒𝚙𝚜
💻 ➠ 𝙱𝚘𝚝 𝚂𝚌𝚛𝚒𝚙𝚝𝚜
🛠️ ➠ 𝚄𝚗𝚋𝚊𝚗 𝙼𝚎𝚝𝚑𝚘𝚍𝚜
🐍 ➠ 𝙿𝚢𝚝𝚑𝚘𝚗 𝚃𝚒𝚙𝚜
📱 ➠ 𝙿𝚛𝚎𝚖𝚒𝚞𝚖 𝙰𝙿𝙺
⚙️ ➠ 𝙱𝚘𝚝 𝙲𝚛𝚎𝚊𝚝𝚒𝚗𝚐 𝙼𝚎𝚝𝚑𝚘𝚍𝚜

╭━━━〔 ⚠️ 𝐀𝐋𝐄𝐑𝐓 〕━━━╮

⚠️ 𝐁𝐞 𝐜𝐚𝐫𝐞𝐟𝐮𝐥!
📌 𝐈𝐟 𝐲𝐨𝐮 𝐝𝐨 𝐧𝐨𝐭 𝐟𝐨𝐥𝐥𝐨𝐰 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐫𝐮𝐥𝐞𝐬,
🚷 𝐲𝐨𝐮 𝐦𝐚𝐲 𝐛𝐞 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐠𝐫𝐨𝐮𝐩 𝐢𝐦𝐦𝐞𝐝𝐢𝐚𝐭𝐞𝐥𝐲.

⚠️ 𝐃𝐙𝐈𝐊𝐀𝐌𝐀 𝐇𝐎𝐌𝐄𝐁𝐎𝐘 ⚠️
👇
𓆏 ⟹ 🚫
╰━━━━━━━━━━━━━━━━━━╯

❤️ Thank you once again for your support!`;

export default {
    command: 'rules',
    aliases: [],
    category: 'owner',
    description: 'Show the group rules',
    usage: '.rules',
    ownerOnly: true,
    async handler(sock, message, _args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        await sock.sendMessage(chatId, {
            text: RULES_MESSAGE,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363350619358109@newsletter',
                    newsletterName: 'SKYNETIX MD',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });
    }
};

/*****************************************************************************
 *                                                                           *
 *                     Developed By Skynetix                                *
 *                                                                           *
 *  🌐  GitHub   : https://github.com/justmom678                              *
 *  ▶️  YouTube  : https://www.youtube.com/@KudzieSana-o4c9z                  *
 *                                                                           *
 *    © 2026 SKYNETIX. All rights reserved.                                  *
 *                                                                           *
 *****************************************************************************/
