import moment from 'moment-timezone';
import fs from 'fs';
import path from 'path';

const REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER || 'justmom678';
const REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME || 'SKYNETIX-MD-BOT';
const REPOSITORY_URL = `https://github.com/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;

export default {
    command: 'script',
    aliases: ['repo', 'sc'],
    category: 'info',
    description: 'Get information about the SKYNETIX-MD GitHub repository',
    usage: '.repo',
    async handler(sock, message, args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        try {
            const headers = {
                Accept: 'application/vnd.github+json',
                'User-Agent': 'SKYNETIX-MD'
            };
            // A token is optional. It allows deployments to read this private repo,
            // while public deployments still work without exposing credentials.
            if (process.env.GITHUB_TOKEN) {
                headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
            }
            const response = await fetch(`https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`, {
                headers
            });
            if (!response.ok) {
                throw new Error(`GitHub API returned ${response.status}`);
            }
            const repository = await response.json();
            const sizeMb = Number(repository.size || 0) / 1024;
            let text = `*乂  SKYNETIX MD  乂*\n\n`;
            text += `✩  *Name* : ${repository.name || REPOSITORY_NAME}\n`;
            text += `✩  *Watchers* : ${repository.subscribers_count ?? repository.watchers_count ?? 0}\n`;
            text += `✩  *Size* : ${sizeMb.toFixed(2)} MB\n`;
            text += `✩  *Last Updated* : ${repository.updated_at ? moment(repository.updated_at).format('DD/MM/YY - HH:mm:ss') : 'Unknown'}\n`;
            text += `✩  *URL* : ${repository.html_url || REPOSITORY_URL}\n`;
            text += `✩  *Forks* : ${repository.forks_count ?? 0}\n`;
            text += `✩  *Stars* : ${repository.stargazers_count ?? 0}\n\n`;
            text += `💥 *Skynetix MD*`;
            const imagePath = path.join(process.cwd(), 'assets', 'thumb.png');
            if (fs.existsSync(imagePath)) {
                await sock.sendMessage(chatId, { image: fs.readFileSync(imagePath), caption: text }, { quoted: message });
            }
            else {
                await sock.sendMessage(chatId, { text }, { quoted: message });
            }
        }
        catch (error) {
            console.error('Error in github command:', error.message);
            // Keep .repo useful even when GitHub is private, rate-limited, or unavailable.
            await sock.sendMessage(chatId, {
                text: `*乂  SKYNETIX MD  乂*\n\n✩  *Repository* : ${REPOSITORY_NAME}\n✩  *URL* : ${REPOSITORY_URL}\n\n_GitHub details are temporarily unavailable._`
            }, { quoted: message });
        }
    }
};
