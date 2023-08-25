const client = require('../index');

client.once('ready', async () => {
    console.log('>' + client.user.username + 'Est a présent conneté.');
});