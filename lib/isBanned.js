/**
 * Account and bot-user bans are disabled by policy.
 *
 * This compatibility function intentionally always returns false so legacy
 * banned.json/database records cannot block or ban WhatsApp accounts.
 */
async function isBanned(_userId) {
    return false;
}

export { isBanned };
