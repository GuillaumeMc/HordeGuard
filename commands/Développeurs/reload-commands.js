const { } = require('discord.js');

module.exports = {
    name: 'reload-commands',
    description: 'Recharge les commands.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: true,
    category: 'Développeurs',
    run: async (client, interaction, config) => {

        await interaction.reply({
            content: '`•••` chargement...',
            ephemeral: true
        });

        try {
            require('../../handlers/application_commands')(client, config);

            return interaction.editReply({
                content: '\`✅\` Toutes les commandes ont été rechargé sans erreurs.',
                ephemeral: true
            });
        } catch (err) {
            return interaction.editReply({
                content: `\`❌\` An error was found:\n${err}`,
                ephemeral: true
            });
        };

    }
};