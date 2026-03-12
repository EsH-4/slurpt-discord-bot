const { SlashCommandBuilder } = require('discord.js');
const { infoEmbed } = require('@commands/utils/embeds.js');

module.exports = {
    category: 'utility',

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Cek respon bot'),

    async execute(interaction) {
        await interaction.reply({
            embeds: [infoEmbed('🏓 Pong! Bot is active!', 'Ping Result')],
        });
    },
};