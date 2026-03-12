const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: "utility",
    
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Menampilkan informasi bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Bot Information')
            .setDescription('Bot berjalan menggunakan slash commands.')
            .addFields(
                { name: 'Status', value: '🟢 Online', inline: true },
                { name: 'Type', value: 'Slash Commands (/)', inline: true },
                { name: 'User', value: interaction.client.user.tag, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};