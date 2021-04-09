let { DOMAIN } = process.env;
if (DOMAIN && !DOMAIN.includes('https://')) {
    DOMAIN = `https://${DOMAIN}`;
}

module.exports = {
    URL: DOMAIN || 'https://testnet.aave.com',
};
