const { ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'salon',
    description: 'Bloqué ou debloqué un salon.',
    type: 1,
    options: [
        {
            name: 'bloqué',
            description: 'Bloqué un salon.',
            type: 1,
            options: [
                {
                    name: 'salon',
                    description: 'Le salon à bloqué.',
                    type: 7,
                    channel_types: [
                        ChannelType.GuildText,
                        ChannelType.GuildVoice
                    ],
                    required: false
                },
                {
                    name: 'raison',
                    description: 'Raison du bloquage.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'debloqué',
            description: 'Débloqué un salon.',
            type: 1,
            options: [
                {
                    name: 'salon',
                    description: 'la salon à débloqué.',
                    type: 7,
                    channel_types: [
                        ChannelType.GuildText,
                        ChannelType.GuildVoice
                    ],
                    required: false
                }
            ]
        }
    ],
    role_perms: ['1144219132343107628'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction, config) => {
        const channelInput = interaction.options.get('salon')?.value || interaction.channel.id;
        const reasonInput = interaction.options.get('raison')?.value || 'Aucune raison';
        const subCommandInput = interaction.options._subcommand;

        const data = require('../../config/data.json').handler.commands['lock-unlock'].roles_to_update;

        const channel = interaction.guild.channels.cache.get(channelInput);

        if (!channel) return interaction.reply({
            content: `\`❌\` Salon invalide.`,
            ephemeral: true
        });

        if (subCommandInput === 'bloqué') {
            await data.forEach(async (role) => {
                try {
                    const roleFetch = await interaction.guild.roles.cache.get(role);

                    if (!roleFetch) return;

                    return await channel.permissionOverwrites.edit(roleFetch.id, {
                        SendMessages: false,
                        AddReactions: false
                    });
                } catch { return };
            });

            interaction.reply({
                content: `\`✅\` Le salon ${channel} as été bloqué avec succès.`,
                ephemeral: true
            });

            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Salon verouillé')
                        .setDescription(`Se salon est vérouillé personne ne peut parlé ici jusqu'au dévérouillage.`)
                        .addFields({
                            name: 'Raison',
                            value: reasonInput
                        })
                        .setFooter({
                            text: `Bloqué le: ${new Date().toLocaleDateString()}`
                        })
                        .setColor('Red')
                ]
            });
        } else {
            await data.forEach(async (role) => {
                try {
                    const roleFetch = await interaction.guild.roles.cache.get(role);

                    if (!roleFetch) return;

                    return await channel.permissionOverwrites.edit(roleFetch.id, {
                        SendMessages: null,
                        AddReactions: null
                    });
                } catch { return };
            });

            interaction.reply({
                content: `\`✅\` Le salon ${channel} as été dévérouillé.`,
                ephemeral: true
            });

            return channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Salon dévérouillé')
                        .setDescription(`Salon dévérouiller la parole as été rendu ici à présent.`)
                        .setFooter({
                            text: `Débloqué le: ${new Date().toLocaleDateString()}`
                        })
                        .setColor('Green')
                ]
            });
        };
    }
};