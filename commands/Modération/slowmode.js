const { EmbedBuilder, ChannelType } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description: 'Activer un mode lent.',
    type: 1,
    options: [
        {
            name: 'durée',
            description: 'la durée du mode lent.',
            type: 3,
            required: true
        },
        {
            name: 'salon',
            description: 'Le salon concerné par le mode lent.',
            type: 7,
            channel_types: [ChannelType.GuildText],
            required: false
        }
    ],
    role_perms: ['1142484580000084069'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction, config) => {
        const durationInput = interaction.options.get('durée').value;
        const channelInput = interaction.options.get('salon')?.value || interaction.channel.id;

        const duration = ms(durationInput);
        const channel = interaction.guild.channels.cache.get(channelInput);

        if (!channel) return interaction.reply({
            content: `\`❌\` Se salon n'existe pas.`,
            ephemeral: true
        });

        if (duration > 21600000 || duration < 0) return interaction.reply({
            content: `\`❌\` Le mode lent ne peut pas etre **negatif** ou depassé **6h**.`,
            ephemeral: true
        });

        try {
            if (duration > 0) {
                await channel.setRateLimitPerUser(duration / 1000);

                interaction.reply({
                    content: `\`✅\` Mode lent définis avec succès dans ${channel}!`,
                    ephemeral: true
                });

                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Le mode lent a été modifié pour **${durationInput}**.`)
                            .setColor('Blue')
                    ]
                });
            } else {
                await channel.setRateLimitPerUser(null);

                interaction.reply({
                    content: `\`✅\` Mode lent désactivé avec succès ${channel}!`,
                    ephemeral: true
                });

                return channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Le mode lent as été **désactivé**.`)
                            .setColor('Blue')
                    ]
                });
            };
        } catch {
            return interaction.reply({
                content: `\`❌\` Quelque chose s'est mal passé!`,
                ephemeral: true
            });
        };
    }
};