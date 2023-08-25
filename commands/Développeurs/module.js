const { } = require('discord.js');
const { ModulesSchema } = require('../../schemas/main');
const modules = require('../../index').modules;

module.exports = {
    name: 'module',
    description: 'Activé/Désactivé un module.',
    type: 1,
    options: [
        {
            name: 'activé',
            description: 'Activé un module.',
            type: 1,
            options: [
                {
                    name: 'module',
                    description: 'Le module à activé.',
                    type: 3,
                    choices: modules.map((module) => {
                        return {
                            name: module,
                            value: module
                        }
                    }),
                    required: true
                }
            ]
        },
        {
            name: 'désactivé',
            description: 'Désactivé un module.',
            type: 1,
            options: [
                {
                    name: 'module',
                    description: 'Le module à désactivé.',
                    type: 3,
                    choices: modules.map((module) => {
                        return {
                            name: module,
                            value: module
                        }
                    }),
                    required: true
                }
            ]
        }
    ],
    role_perms: null,
    developers_only: true,
    category: 'Développeurs',
    run: async (client, interaction, config) => {
        const subCommandInput = interaction.options._subcommand;
        const moduleInput = interaction.options.get('module').value;

        await interaction.reply({
            content: `\`•••\` Veuillez patienté...`,
            ephemeral: true
        });

        if (['Développeurs', 'Administration'].some((m) => m === moduleInput)) return interaction.editReply({
            content: 'Woah arrète si tu désactive se module tu ne pourra plus le réactiver!',
            ephemeral: true
        })

        if (subCommandInput === 'activé') {
            ModulesSchema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (!data.modules.includes(moduleInput)) return interaction.editReply({
                        content: `\`❌\` Le module (${moduleInput}) est déja activé.`,
                        ephemeral: true
                    });

                    await ModulesSchema.updateOne({
                        guild: interaction.guild.id
                    }, {
                        $pull: {
                            modules: moduleInput
                        }
                    });

                    if (!data?.modules?.length) {
                        await ModulesSchema.deleteOne({
                            guild: interaction.guild.id
                        });
                    };

                    return interaction.editReply({
                        content: `\`✅\` Le module suivant as été activé: **${moduleInput}**`,
                        ephemeral: true
                    });
                } else {
                    return interaction.editReply({
                        content: `\`⚠️\` [**BASE DE DONNEES INACTIF**]: Désactivez un module d'abord pour activé la BDD des modules à l'arret.`,
                        ephemeral: true
                    });
                };
            });
        };

        if (subCommandInput === 'désactivé') {
            ModulesSchema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.modules.includes(moduleInput)) return interaction.editReply({
                        content: `\`❌\` Le module (${moduleInput}) est déja désactiver.`,
                        ephemeral: true
                    });

                    await ModulesSchema.updateOne({
                        guild: interaction.guild.id
                    }, {
                        $push: {
                            modules: moduleInput
                        }
                    });

                    return interaction.editReply({
                        content: `\`✅\` Le module suivant as bien été désactiver: **${moduleInput}**`,
                        ephemeral: true
                    });
                } else {
                    data = new ModulesSchema({
                        guild: interaction.guild.id,
                        modules: [moduleInput]
                    });

                    data.save();

                    return interaction.editReply({
                        content: `\`✅\` Le module suivant as été désactiver: **${moduleInput}**`,
                        ephemeral: true
                    });
                };
            });
        };

    }
};