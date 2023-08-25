const client = require('../index');
const config = require('../config/main');
const { ChannelType } = require('discord.js');
const { AFKSchema } = require('../schemas/main');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;

    if (!message.mentions.members.first()) {
        AFKSchema.findOne({
            user: message.author.id,
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await message.member.setNickname(message.member.user.username).catch(() => { });

                if (data.loggerType === true) {
                    return message.reply(
                        {
                            content: '**Bon retour parmis nous!** Je t\'ai enlevé l\'AFK l\'amis.'
                        }
                    ).then(async (sent) => {
                        setTimeout(async () => {
                            await AFKSchema.deleteOne({
                                user: message.author.id,
                                guild: message.guild.id
                            });

                            return sent.delete().catch(() => { });
                        }, 8000);
                    });
                } else {
                    return message.reply(
                        {
                            content: '**Bon retour parmis nous!** Je t\'ai enlevé l\'AFK l\'amis.'
                        }
                    ).then(async (sent) => {
                        setTimeout(async () => {
                            await AFKSchema.deleteOne({
                                user: message.author.id,
                                guild: message.guild.id
                            });

                            return sent.delete().catch(() => { });
                        }, 8000);
                    });
                };
            } else return;
        });
    } else {
        AFKSchema.findOne({
            user: message.mentions.members.first().id,
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                return message.reply(`Cette personne est actuellement **AFK**. ${data.reason !== null ? `Pour la raison: ${data.reason}` : ''}`);
            } else return;
        });
    }
});