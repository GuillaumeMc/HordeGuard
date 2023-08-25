const { codeBlock, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'emoji-id',
    description: 'Récupere l\'identifiant d\'un émoji!',
    type: 1,
    options: [
        {
            name: 'emoji',
            description: 'l\'émoji. (Ex: :hello_lol:)',
            type: 3,
            required: true
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Utilitaire',
    run: async (client, interaction, config) => {
        const emojiInput = interaction.options.get('emoji').value;

        const emoji = await client.emojis.cache.get((e) => e.name === emojiInput);

        if (!emoji) return interaction.reply({
            content: `\`❌\` Emoji invalide.`,
            ephemeral: true
        });

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Identifiant de l\'émoji: ' + codeBlock('txt', emoji))
                    .setColor('Green')
            ]
        })
        
    }
};