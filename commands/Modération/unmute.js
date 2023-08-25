const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'unmute',
    description: 'Retiré le mode muet d\'un utilisateur.',
    type: 1,
    options: [
        {
            name: 'utilisateur',
            description: 'L\'utilisateur cible du unmute.',
            type: 6,
            required: true
        },
        {
            name: 'raison',
            description: 'La raison du unmute.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['1142484580000084069'],
    developers_only: false,
    category: 'modération',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('utilisateur').value;
        const reasonInput = interaction.options.get('raison')?.value || 'Aucune raison n\'aas été déclarée';

        const user = interaction.guild.members.cache.get(userInput);

        if (!user) return interaction.reply({
            content: `\`❌\` L'utilisateur ne fait pas parti du serveur.`,
            ephemeral: true
        });

        if (!user.isCommunicationDisabled()) return interaction.reply({
            content: `\`❌\` L'utilisateur est déja unmute.`,
            ephemeral: true
        });

        try {
            await user.timeout(null, reasonInput);

            interaction.reply({
                content: `\`✅\` ${user} as été unmute avec succès!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} as été unmute.`)
                        .setColor('Green')
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