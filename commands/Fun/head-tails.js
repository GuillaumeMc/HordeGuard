const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pileface',
    description: 'Ta chance sera prouvé ici!',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    owner_only: false,
    category: 'Fun',
    run: async (client, interaction, config) => {

        await interaction.reply({
            content: `\`•••\` Lancé...`
        });

        const arr = ["Face", "Pile"];

        const result = arr[Math.floor(Math.random() * arr.length)];

        setTimeout(() => {
            return interaction.editReply({
                content: null,
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Pile ou Face?')
                        .setDescription(`🪙 Le résultat est... **${result}**!`)
                        .setColor('Blurple')
                ]
            });
        }, 3500); 

    }
};
