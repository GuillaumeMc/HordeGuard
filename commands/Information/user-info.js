const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Informations sur l\'utilisateur.',
    type: 1,
    options: [
        {
            name: 'utilisateur',
            description: 'Recupérer les informations de l\'utilisateur.',
            type: 6,
            required: false
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {

        const user = interaction.guild.members.cache.get(interaction.options.get('utilisateur')?.value || interaction.user.id);

        if (!user) return interaction.reply({
            content: `\`❌\` L'utilisateur n'est pas sur ce serveur.`,
            ephemeral: true
        });

        let rr;

        const roles = user.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        rr = roles.join(", ");

        if (user.roles.cache.size < 1) rr = "Aucun roles";

        function fetchAcknowledgements(userInput) {
            let result;

            try {
                if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Membre";
                if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Modérateur";
                if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Manageur";
                if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Administrateur";
                if (userInput.id === interaction.guild.ownerId) result = "Propriétaire";

            } catch (e) {
                result = "Membre du serveurr";
            };

            return result;
        }

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Informations utilisateur: ' + user.user.username)
                    .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        {
                            name: 'Tag',
                            value: `${user.user.tag}`,
                            inline: true
                        },
                        {
                            name: 'Pseudonyme',
                            value: `${user.displayName}`,
                            inline: true
                        },
                        {
                            name: 'Boost du serveur',
                            value: `${user.premiumSince === null ? 'Non' : 'Oui'}`,
                            inline: true
                        },
                        {
                            name: 'Rejoins le',
                            value: `<t:${(user.joinedTimestamp / 1000).toString().split('.')[0]}> (<t:${(user.joinedTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Crée le',
                            value: `<t:${(user.user.createdTimestamp / 1000).toString().split('.')[0]}> (<t:${(user.user.createdTimestamp / 1000).toString().split('.')[0]}:R>)`,
                            inline: true
                        },
                        {
                            name: 'Bot',
                            value: `${user.user.bot ? 'Oui' : 'Non'}`,
                            inline: true
                        },
                        {
                            name: `Roles [${(user?.roles?.cache?.size - 1) || 0}]`,
                            value: `${rr || "Aucun roles"}`,
                            inline: false
                        },
                        {
                            name: 'Acknowledgements',
                            value: `${fetchAcknowledgements(user) || "Membre du serveur"}`,
                            inline: true
                        },
                    )
                    .setColor('Blurple')
            ]
        })

    }
};
