const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Ta question aura sa réponse!',
    type: 1,
    options: [
        {
            name: 'question',
            description: 'La question.',
            type: 3,
            required: true
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Fun',
    run: async (client, interaction, config) => {
        const questionInput = interaction.options.get('question').value;

        const fortunes = [
            "Oui.",
            "C'est certain.",
            "C'est décidément ça.",
            "Sans aucun doute.",
            "C'est sûr.",
            "D'après ce que je vois, c'est un oui.",
            "Vous pouvez compter la dessus.",
            "Très probablement.",
            "Perspectives favorables.",
            "Les signes pointent vers le oui.",
            "Réponse floue, réessayez.",
            "Reposez la question plus tard.",
            "Mieux vaut ne pas vous le dire maintenant...",
            "Impossible à prédire maintenant.",
            "Concentrez-vous et posez la question à nouveau.",
            "N'y compte pas.",
            "Ma réponse est non.",
            "Mes sources disent non.",
            "Perspectives peu optimistes...",
            "Très incertain.",
        ];

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('8Ball')
                    .addFields(
                        {
                            name: 'Question',
                            value: `${questionInput.endsWith('?') ? questionInput : `${questionInput}?`}`
                        },
                        {
                            name: 'Réponse',
                            value: `${fortunes[Math.floor(Math.random() * fortunes.length)]}`
                        }
                    )
                    .setColor('Blurple')
            ]
        })

    }
};