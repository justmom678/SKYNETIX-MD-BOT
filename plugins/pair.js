export default {
    command: 'pair',
    aliases: ['paircode', 'session', 'getsession', 'sessionid'],
    category: 'general',
    description: 'Get a WhatsApp pairing code',
    usage: '.pair 2637766XXXX',
    async handler(sock, message, args, context) {
        const { chatId } = context;
        const forwardInfo = {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363350619358109@newsletter',
                newsletterName: 'SKYNETIX MD',
                serverMessageId: -1
            }
        };
        const query = args.join('').trim();
        if (!query) {
            return await sock.sendMessage(chatId, {
                text: "❌ *Missing Number*\nExample: .pair 2637766XXXX",
                contextInfo: forwardInfo
            }, { quoted: message });
        }
        const number = query.replace(/[^0-9]/g, '');
        if (number.length < 10 || number.length > 15) {
            return await sock.sendMessage(chatId, {
                text: "❌ *Invalid Format*\nPlease provide the number with country code but without + or spaces.",
                contextInfo: forwardInfo
            }, { quoted: message });
        }
        if (sock.user || sock.authState?.creds?.registered) {
            return await sock.sendMessage(chatId, {
                text: "ℹ️ *This bot is already connected*\nTo pair a new WhatsApp number, stop the bot, clear the existing session, and restart it in pairing-code mode. This protects the active session from being replaced.",
                contextInfo: forwardInfo
            }, { quoted: message });
        }
        if (typeof sock.requestPairingCode !== 'function') {
            return await sock.sendMessage(chatId, {
                text: "❌ *Pairing Unavailable*\nThis WhatsApp connection does not support native pairing codes. Please restart the bot with pairing-code mode enabled.",
                contextInfo: forwardInfo
            }, { quoted: message });
        }
        await sock.sendMessage(chatId, {
            text: "⚡ *Generating WhatsApp pairing code...*",
            contextInfo: forwardInfo
        }, { quoted: message });
        try {
            // Baileys requires the socket to complete its initial handshake before
            // requesting a code. Waiting here avoids intermittent 428/400 responses.
            await new Promise((resolve, reject) => {
                let settled = false;
                const timer = setTimeout(() => finish(new Error('WhatsApp connection handshake timed out')), 30000);
                const finish = (error) => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    sock.ev?.off?.('connection.update', onUpdate);
                    error ? reject(error) : resolve();
                };
                const onUpdate = ({ connection, qr }) => {
                    if (qr || connection === 'open') finish();
                };
                if (sock.ev?.on) sock.ev.on('connection.update', onUpdate);
                else finish(new Error('WhatsApp event emitter is unavailable'));
            });
            const pairingCode = await sock.requestPairingCode(number);
            if (!pairingCode || typeof pairingCode !== 'string') {
                throw new Error('WhatsApp returned an empty pairing code');
            }
            const formattedCode = pairingCode.replace(/[^A-Za-z0-9]/g, '').match(/.{1,4}/g)?.join('-') || pairingCode;
            const successText = `✅ *SKYNETIX-MD PAIRING CODE*\n\n` +
                `Code: *${formattedCode}*\n\n` +
                `*How to use:*\n` +
                `1. Open WhatsApp Settings\n` +
                `2. Tap 'Linked Devices'\n` +
                `3. Tap 'Link a Device'\n` +
                `4. Select 'Link with phone number instead'\n` +
                `5. Enter the code above.`;
            await sock.sendMessage(chatId, {
                text: successText,
                contextInfo: forwardInfo
            }, { quoted: message });
        }
        catch (error) {
            console.error('Pairing Plugin Error:', error.message);
            let reason = 'WhatsApp could not generate a pairing code. Please try again after the connection is ready.';
            if (/timeout|handshake/i.test(error.message)) {
                reason = 'WhatsApp connection is not ready yet. Please wait a few seconds and try again.';
            }
            else if (/401|logged.?out|registered/i.test(error.message)) {
                reason = 'This session is already registered. Start the bot without an existing session to pair a new number.';
            }
            else if (/invalid|bad.?request|phone/i.test(error.message)) {
                reason = 'The phone number was rejected. Use digits only with the country code.';
            }
            await sock.sendMessage(chatId, {
                text: `❌ *Pairing Failed*\nReason: ${reason}`,
                contextInfo: forwardInfo
            }, { quoted: message });
        }
    }
};
