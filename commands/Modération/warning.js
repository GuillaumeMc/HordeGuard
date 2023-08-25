const { EmbedBuilder } = require('discord.js');
const { uuid } = require('uuidv4');
const { WarningsSchema } = require('../../schemas/main');

module.exports = {
    name: 'warn',
    description: 'Ajouté ou suprimé l\'avertissement d\'un membre.',
    type: 1,
    options: [
        {
            name: 'ajouté',
            description: 'ajouter un avertissement.',
            type: 1,
            options: [
                {
                    name: 'utilisateur',
                    description: 'L\'utilisateur à avertir.',
                    type: 6,
                    required: true
                },
                {
                    name: 'raison',
                    description: 'La cause de l\'avertissement.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'supprimer',
            description: 'supprimer un avertisement.',
            type: 1,
            options: [
                {
                    name: 'utilisateur',
                    description: 'L\'utilisateur auquel supprimer un avertissement.',
                    type: 6,
                    required: true
                },
                {
                    name: 'identifiant',
                    description: 'L\'identifiant de l\'avertissement.',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'clear',
            description: 'Nettoyé tout les avertissements d\'un utilisateur.',
            type: 1,
            options: [
                {
                    name: 'utilisateur',
                    description: 'l\'utilisateur auquel supprimer tout les avertissements.',
                    type: 6,
                    required: true
                }
            ]
        }
    ],
    role_perms: ['1142484580000084069'],
    developers_only: false,
    category: 'Modération',
    run: async (client, interaction) => {

        const subCommandInput = interaction.options._subcommand;

        if (subCommandInput === 'ajouté') {
            const userInput = interaction.options.get('utilisateur').value;
            const reasonInput = interaction.options.get('raison')?.value || "Aucune raison n'as été définis";

            const user = interaction.guild.members.cache.get(userInput);

            if (!user) return interaction.reply({
                content: `\`❌\` L'utilisateur n'est pas valide.`,
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    const uuidGenerated = uuid();

                    if (!data) {
                        data = new WarningsSchema(
                            {
                                user: userInput,
                                guild: interaction.guild.id,
                                warnings: [
                                    {
                                        moderator: interaction.user.id,
                                        since: new Date(),
                                        warnId: uuidGenerated,
                                        reason: reasonInput
                                    }
                                ]
                            }
                        );

                        interaction.reply({
                            content: `\`✅\` ${user} as été avertis avec succès. (Total: \`1\`)`,
                            ephemeral: true
                        });
                    } else {
                        data.warnings.push(
                            {
                                moderator: interaction.user.id,
                                since: new Date(),
                                warnId: uuidGenerated,
                                reason: reasonInput
                            }
                        );

                        interaction.reply({
                            content: `\`✅\` ${user} as été avertis avec succès. (Total: \`${data.warnings.length}\`)`,
                            ephemeral: true
                        });
                    };

                    data.save();

                    user.send({
                        content: `Tu as été avertis dans **${interaction.guild.name}**. ${reasonInput}`
                    }).catch(() => { });

                    interaction.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${user} as été avertis ${reasonInput === 'aucune raison n\'as été déclarée ' ? '.' : ` pour: ${reasonInput}`}`)
                                .setFooter({
                                    text: `UUID: ${uuidGenerated}`
                                })
                                .setColor('Yellow')
                        ]
                    });
                }
            );
        };

        if (subCommandInput === 'supprimer') {
            const userInput = interaction.options.get('utilisateur').value;
            const idInput = interaction.options.get('identifiant').value;

            const user = interaction.guild.members.cache.get(userInput);
            if (!user) return interaction.reply({
                content: '\`❌\` l\'utilisateur n\'est pas valide.',
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    if (data && data.warnings?.length > 0) {
                        let boolean = false;

                        for (let warns of data.warnings) {
                            if (warns.warnId === idInput) boolean = true;
                        };

                        if (boolean === false) return interaction.reply({
                            content: `\`❌\` Format UUID ou Identifiant invalide.`,
                            ephemeral: true
                        });

                        const arr = data.warnings.filter(object => {
                            return object.warnId !== idInput
                        });

                        data.warnings = arr;

                        data.save();

                        return interaction.reply({
                            content: `\`✅\` L'avertissement \`${idInput}\` avec l'identifiant as été suprimé des donnés de ${user}.`,
                            ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            content: `\`❌\` ${user} n'as pas d'avertissements.`,
                            ephemeral: true
                        });
                    };
                }
            );
        };

        if (subCommandInput === 'clear') {
            const userInput = interaction.options.get('utilisateur').value;

            const user = interaction.guild.members.cache.get(userInput);
            if (!user) return interaction.reply({
                content: '\`❌\` L\'utilisateur n\'est pas valide.',
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    if (data && data.warnings?.length > 0) {
                        await WarningsSchema.deleteOne({
                            user: userInput,
                            guild: interaction.guild.id
                        });

                        return interaction.reply({
                            content: `\`✅\` Toutes les données de ${user} ont été suprimé.`,
                            ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            content: `\`❌\` ${user} n'as aucun avertissements.`,
                            ephemeral: true
                        });
                    };
                }
            );
        };

    },
};