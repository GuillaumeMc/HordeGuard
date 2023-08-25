const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Rendre un utilisateur muet.',
    type: 1,
    options: [
        {
            name: 'utilisateur',
            description: 'L\'utilisateur aà rendre muet.',
            type: 6,
            required: true
        },
        {
            name: 'durée',
            description: 'Durée du mode muet.',
            type: 3,
            required: true
        },
        {
            name: 'raison',
            description: 'Raison du mode muet.',
            type: 3,
            required: false
        }
    ],
    role_perms: ['1142484580000084069'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction, config) => {
        const userInput = interaction.options.get('utilisateur').value;
        const durationInput = interaction.options.get('durée').value;
        const reasonInput = interaction.options.get('raison')?.value || 'Aucune raison n\'as été définis';

        const user = interaction.guild.members.cache.get(userInput);
        const duration = ms(durationInput);

        if (!user) return interaction.reply({
            content: `\`❌\` L'utilisateur n'est pas sur ce serveur.`,
            ephemeral: true
        });

        if (user.isCommunicationDisabled()) return interaction.reply({
            content: `\`❌\` L'utilisateur est déja muet.`,
            ephemeral: true
        });

        if (duration <= 0 || duration > 2419200000) return interaction.reply({
            content: `\`❌\` La durée ne doit pas etre superieur/égale à **0s/m/j/s** ou superieur/ égale à**28 jours**. `,
            ephemeral: true
        });

        try {
            await user.timeout(duration, reasonInput);

            user.send({
                content: `Tu as été rendu muet dans **${interaction.guild.name}** pour la raison ${durationInput}. ${reasonInput}`
            }).catch(() => { });

            interaction.reply({
                content: `\`✅\` ${user} as été rendu muet avec succès pendant ${durationInput}!`,
                ephemeral: true
            });

            return interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${user} as été rendu muet pendant ${durationInput}.`)
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