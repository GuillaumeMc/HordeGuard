const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'infohorde',
    description: 'Informations du serveur.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {

        const guild = interaction.guild;

        const verificationLevelObj = {
            0: 'Vide',
            1: 'Bas',
            2: 'Moyen',
            3: 'Haut',
            4: 'Trés haut'
        };

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Information du serveur: ' + guild.name)
                    .setThumbnail(guild.iconURL())
                    .addFields(
                        {
                            name: 'Identifiant du serveur',
                            value: `\`${guild.id}\``,
                            inline: true
                        },
                        {
                            name: 'Proprietaire',
                            value: `${await guild.fetchOwner().then((u) => u.user.tag)}`,
                            inline: true
                        },
                        {
                            name: 'Crée le',
                            value: `<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(guild.createdTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Niveau de vérification',
                            value: `${verificationLevelObj[guild.verificationLevel]}`,
                            inline: true
                        },
                        {
                            name: 'Nombre de membres',
                            value: `${guild.memberCount}`,
                            inline: true
                        },
                        {
                            name: 'Total du salon',
                            value: `${guild.channels.cache.size}`,
                            inline: true
                        },
                        {
                            name: 'Total de boost',
                            value: `${guild.premiumSubscriptionCount}`,
                            inline: true
                        },
                        {
                            name: 'Total d\'émojis',
                            value: `${guild.emojis.cache.size}`,
                            inline: true
                        },
                        {
                            name: 'Nombre de membre maximum',
                            value: `${guild.maximumMembers}`,
                            inline: true
                        }
                    )
                    .setColor('Blurple')
            ]
        })

    }
};
