const { Client, Collection } = require('discord.js');
const { Colors, BetterConsoleLogger } = require('discord.js-v14-helper');
const fs = require('fs');
const config = require('./config/main');

const client = new Client(config.client.constructor);

client.commands = new Collection();
client.modules = fs.readdirSync('./commands');

module.exports = client;

new BetterConsoleLogger(`HordeGuardian`)
    .setTextColor(Colors.Blue)
    .log(true);

fs.readdirSync('./handlers').forEach((handler) => {
    require('./handlers/' + handler)(client, config);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[antiCrash] :: [unhandledRejection]');
    console.log(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
    console.error('[antiCrash] :: [uncaughtException]');
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.error('[antiCrash] :: [uncaughtExceptionMonitor]');
    console.log(err, origin);
});

client.on('guildMemberAdd', (member) => {
  const roleID = '1143884030375379155'; 

  const role = member.guild.roles.cache.get(roleID);
  if (role) {
    member.roles.add(role)
      .then(() => console.log(`Rôle attribué avec succès à ${member.user.tag}.`))
      .catch(console.error);
  } else {
    console.error(`Le rôle avec l'ID ${roleID} n'a pas été trouvé.`);
  }
});

client.login(config.client.token);