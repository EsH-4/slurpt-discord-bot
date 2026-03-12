const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: "utility",
    
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Bot mengatakan sesuatu')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Pesan yang ingin dikirim')
                .setRequired(true)
        ),

    async execute(interaction) {

        const text = interaction.options.getString('text');

        await interaction.reply(text);
    },
};