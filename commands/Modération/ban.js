const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bannir un utilisateur.',
    type: 1,
    options: [
        {
            name: 'utilisateurs',
            description: 'L\'utilisateur a bannir',
            type: 6,
            required: true
        },
        {
            name: 'raison',
            description: 'La raison du ban.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['142484580000084069'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('utilisateur').value;
        const reasonInput = interaction.options.get('raison')?.value || 'Aucune raison n\'as été donné';

        const user = interaction.guild.members.cache.get(userInput);

        if (!user) return interaction.reply({
            content: `\`❌\` L'utilisateur n'est pas dans ce serveur.`,
            ephemeral: true
        });

        if (!user.bannable) return interaction.reply({
            content: `\`❌\` L'utilisateur n'est pas bannisable.`,
            ephemeral: true
        });

        try {
            await interaction.guild.members.ban(userInput, { reason: reasonInput });

            user.send({
                content: `Tu as été banni de **${interaction.guild.name}**. Pour: ${reasonInput}`
            }).catch(() => { });

            interaction.reply({
                content: `\`✅\` ${user} as été banni avec succès!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} as été banni.`)
                        .setColor('Red')
                ]
            });
        } catch {
            return interaction.reply({
                content: `\`❌\` Quelque chose s'est mal passé!`,
                ephemeral: true
            });
        };
    }
};