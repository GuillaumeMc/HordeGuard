const { EmbedBuilder } = require('discord.js');
const { WarningsSchema } = require('../../schemas/main');

module.exports = {
    name: 'warnings',
    description: 'Vérifie tes avertissements.',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Utilitaire',
    run: async (client, interaction) => {

        WarningsSchema.findOne(
            {
                user: interaction.user.id,
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data && data.warnings?.length > 0) {
                    const list = data.warnings.map((w, i) => {
                        return {
                            name: `\`#${i + 1}\` UUID: **${w.warnId || "00000000-0000-0000-0000-000000000000"}**`,
                            value: `> Modérateur: ${interaction.guild.members.cache.get(w.moderator)?.user?.tag || '[Utilisateur invalide]'} • depuis le: <t:${(new Date(w.since).getTime() / 1000).toString().split('.')[0]}> (<t:${(new Date(w.since).getTime() / 1000).toString().split('.')[0]}:R>)\n> Raison: ${w.reason}\n`
                        }
                    });

                    return interaction.reply(
                        {
                            embeds: [
                                new EmbedBuilder()
                                    .setAuthor(
                                        {
                                            name: `${interaction.user.tag} (${interaction.user.id})`,
                                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                        }
                                    )
                                    .addFields(
                                        list
                                    )
                            ],
                            ephemeral: true
                        }
                    )
                } else {
                    interaction.reply({
                        content: `\`✅\` Bravo tu n'as aucun avertissements.`,
                        ephemeral: true
                    });
                };
            }
        );

    },
};