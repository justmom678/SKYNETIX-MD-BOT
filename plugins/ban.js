import fs from 'fs';
import store from '../lib/lightweight_store.js';

const MONGO_URL = process.env.MONGO_URL;
const POSTGRES_URL = process.env.POSTGRES_URL;
const MYSQL_URL = process.env.MYSQL_URL;
const SQLITE_URL = process.env.DB_URL;
const HAS_DB = !!(MONGO_URL || POSTGRES_URL || MYSQL_URL || SQLITE_URL);
const bannedFilePath = './data/banned.json';

async function getBannedUsers() {
    if (HAS_DB) {
        return (await store.getSetting('global', 'banned')) || [];
    }
    if (!fs.existsSync(bannedFilePath)) return [];
    return JSON.parse(fs.readFileSync(bannedFilePath, 'utf8'));
}

async function saveBannedUsers(bannedUsers) {
    if (HAS_DB) {
        await store.saveSetting('global', 'banned', bannedUsers);
        return;
    }
    if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
    fs.writeFileSync(bannedFilePath, JSON.stringify(bannedUsers, null, 2));
}

// Account and bot-user bans are intentionally disabled. This command remains registered
// so existing deployments fail safely with an explanation instead of banning anyone.
export default {
    command: 'ban',
    aliases: ['block', 'banuser'],
    category: 'admin',
    description: 'Disabled: account bans are not permitted',
    usage: '.ban @user or reply to a message',
    async handler(sock, message, _args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        const channelInfo = context.channelInfo || {};
        await sock.sendMessage(chatId, {
            text: '✅ Account banning is disabled. No WhatsApp account or bot user was banned.',
            ...channelInfo
        }, { quoted: message });
    }
};

export { getBannedUsers, saveBannedUsers };
export const isUserBanned = async () => false;
