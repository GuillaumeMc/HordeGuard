const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'statistics',
    description: 'Répond les statistiques!',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.user.username + 'Statistiques:')
                    .addFields(
                        { name: "Nom", value: client.user.tag, inline: true },
                        { name: "Identifiant", value: `\`${client.user.id}\``, inline: true },
                        { name: "Commandes", value: `${client.commands.size} commandes`, inline: true },
                        { name: "Total de serveur", value: `${client.guilds.cache.size} serveurs`, inline: true },
                        { name: 'Autheur', value: `${require('../../package.json').author || "Unknown#0000"}`, inline: true },
                        { name: "Language de code", value: "JavaScript", inline: true },
                        { name: 'Dernière version', value: `${require('../../package.json').version}`, inline: true },
                        { name: 'Discord.js', value: `${require('../../package.json').dependencies['discord.js'].replace('^', '')}`, inline: true },
                        { name: "Node.JS", value: `${process.version}`, inline: true },
                        { name: "RAM", value: `${(os.totalmem() / 1024 / 1024).toFixed().substr(0, 2)}GB (${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}% utilisé)`, inline: true },
                        { name: "CPU", value: `${os.cpus().map(i => `${i.model}`)[0]}`, inline: true },
                        { name: "Platforme", value: `${os.platform}`, inline: true },
                    )
                    .setColor('Blurple')
            ]
        });
    }
};