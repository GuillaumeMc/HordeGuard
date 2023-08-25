const { } = require('discord.js');

module.exports = {
    name: 'reload-events',
    description: 'Recharge les events.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: true,
    category: 'Développeurs',
    run: async (client, interaction, config) => {

        await interaction.reply({
            content: '`•••` Chargement...',
            ephemeral: true
        });

        try {
            require('../../handlers/events')(client, config);

            return interaction.editReply({
                content: '\`✅\` Tout les events ont été rechargé sans erreurs.',
                ephemeral: true
            });
        } catch (err) {
            return interaction.editReply({
                content: `\`❌\` Une erreur as été trouvée:\n${err}`,
                ephemeral: true
            });
        };

    }
};