const { SlashCommandBuilder } = require('discord.js');
const { successEmbed } = require('@commands/utils/embeds.js');

module.exports = {
    category: 'general',

    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Menyapa pengguna'),

    async execute(interaction) {
        await interaction.reply({
            embeds: [successEmbed(`Hello ${interaction.user.username}! 👋`, 'Sapaan')],
        });
    },
};