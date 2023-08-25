module.exports = {
    name: 'ping',
    description: 'Répond le ping!',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Utilitaire',
    run: async (client, interaction, config) => {
        return interaction.reply({
            content: '`🏓` Pong! Latence: ' + client.ws.ping + 'ms'
        });
    }
};