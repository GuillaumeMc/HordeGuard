const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Expluser un utilisateur.',
    type: 1,
    options: [
        {
            name: 'utilisateur',
            description: 'L\'utilisateur cible de l\'expulsion.',
            type: 6,
            required: true
        },
        {
            name: 'raison',
            description: 'La raison de l\expulsin.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['1142484580000084069'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('utilisateur').value;
        const reasonInput = interaction.options.get('raison')?.value || 'Aucune raison n\'as été définis';

        const user = interaction.guild.members.cache.get(userInput);

        if (!user) return interaction.reply({
            content: `\`❌\` L'utilisateur n'est pas sur se serveur.`,
            ephemeral: true
        });

        if (!user.kickable) return interaction.reply({
            content: `\`❌\` L'utilisateur ne peut pas etre éxpulser.`,
            ephemeral: true
        });

        try {
            await interaction.guild.members.kick(userInput, { reason: reasonInput });

            user.send({
                content: `Tu as été expulsé de **${interaction.guild.name}**. Raison: ${reasonInput}`
            }).catch(() => { });

            interaction.reply({
                content: `\`✅\` ${user} L'utilisateur as bien été éxpulser!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} as été éxpulser.`)
                        .setColor('Yellow')
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