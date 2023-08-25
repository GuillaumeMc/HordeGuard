const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'love',
  description: 'Calculateur d\'amour',
  type: 1,
  options: [
    {
      name: 'person1',
      description: 'Première personne',
      type: 6,
      required: true
    },
    {
      name: 'person2',
      description: 'Deuxième personne',
      type: 6,
      required: true
    }
  ],
  role_perms: null,
  developers_only: false,
  category: 'Fun',
  run: async (client, interaction, config) => {
    const person1 = interaction.options.getUser('person1');
    const person2 = interaction.options.getUser('person2');

    const lovePercentage = Math.floor(Math.random() * 101);

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Calculateur d\'amour')
          .addFields(
            {
              name: 'Personne 1',
              value: person1.toString()
            },
            {
              name: 'Personne 2',
              value: person2.toString()
            },
            {
              name: 'Pourcentage d\'amour',
              value: `${lovePercentage}%`
            }
          )
          .setColor('Blurple')
      ]
    });
  }
};