const { AFKSchema } = require('../../schemas/main');

module.exports = {
    name: 'afk',
    description: 'Te définis en AFK mode.',
    type: 1,
    options: [
        {
            name: 'raison',
            description: 'La raison de l\'AFK.',
            type: 3,
            required: false
        }
    ],
    role_perms: null,
    developers_only: false,
    category: 'Utilitaire',
    run: async (client, interaction) => {
        const reasonInput = interaction.options.get('raison')?.value || null;

        AFKSchema.findOne({
            guild: interaction.guild.id,
            user: interaction.user.id
        }, async (err, data) => {
            if (err) throw err;

            if (!data) {
                data = new AFKSchema({
                    guild: interaction.guild.id,
                    user: interaction.user.id,
                    reason: reasonInput
                });

                data.save();

                const newUserNickname = '[AFK] ' + interaction.user.username;

                await interaction.member.setNickname(newUserNickname.toString().substr(0, 26)).catch(() => { });

                interaction.channel.send({
                    content: `\`🛏️\` ${interaction.user} est maintenat **AFK** la horde. ${reasonInput === null ? '' : `Pour la raison: ${reasonInput} ne le dérangez pas`}`
                });

                return interaction.reply({
                    content: `\`✅\` Je me suis occupé de ton AFK${reasonInput === null ? '' : ` avec la raison: **${reasonInput}**`}`,
                    ephemeral: true
                });
            } else {
                return interaction.reply({
                    content: `\`❌\` Tu est déja AFK mon amis, pour changé ca écrit un message dans un salon!`,
                    ephemeral: true
                });
            };
        });
        
    },
};