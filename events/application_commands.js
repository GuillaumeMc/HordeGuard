const client = require('../index');
const config = require('../config/main');
const { ModulesSchema } = require('../schemas/main');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        const command = await client.commands.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: `\`❌\` Invalid command, please try again later.`,
            ephemeral: true
        });

        try {
            const data = await ModulesSchema.findOne({
                guild: interaction.guild.id
            });

            if (data) {
                if (command.category) {
                    if (data.modules.includes(command.category)) {
                        return interaction.reply({
                            content: `\`❌\` Cette commande est actuellement désactivé danns le module **${command.category}**.`,
                            ephemeral: true
                        });
                    };
                };
            };

            if (command.owner_only && command.owner_only === true) {
                if (interaction.user.id !== config.users.owner) {
                    return interaction.reply({
                        content: `\`❌\` Désoler cette commande est restreinte au créateur du bot!`,
                        ephemeral: true
                    });
                };
            };

            if (command.developers_only && command.developers_only === true) {
                if (config.users?.developers && config.users?.developers?.length > 0) {
                    if (!config.users.developers.some((dev) => interaction.user.id === dev)) return interaction.reply({
                        content: `\`❌\` Désoler cette commande est restreinte aux developpeurs du bot!`,
                        ephemeral: true
                    });
                };
            };

            if (command.role_perms && command.role_perms !== null) {
                if (Array.isArray(command.role_perms)) {
                    if (command.role_perms?.length > 0) {
                        let boolean = false;

                        await command.role_perms.forEach((r) => {
                            const role = interaction.guild.roles.cache.get(r);

                            if (!role) return;

                            if (!interaction.member.roles) boolean = false;
                            if (interaction.member.roles.cache.some((r1) => r1.id === role.id)) boolean = true;
                        });

                        if (boolean === false) return interaction.reply({
                            content: `\`❌\` Désoler tu n\'est pas autorisé à utiliser cette commande!`,
                            ephemeral: true
                        });
                    };
                } else if (typeof command.role_perms === 'string') {
                    const role = interaction.guild.roles.cache.get(command.role_perms);

                    if (role) {
                        if (!interaction.member.roles.cache.has(role)) return interaction.reply({
                            content: `\`❌\` Désoler tu n\'est pas autorisé à utiliser cette commande!`,
                            ephemeral: true
                        });
                    };
                };
            };

            command.run(client, interaction, config);
        } catch (err) {
            console.error(`[!] Echec d'éxécution \'${interaction.commandName}\'.`);
            console.log(err);
        };
    } else return;
});
