const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: "fun",

    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Menampilkan avatar user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin dilihat avatarnya')
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ size: 1024 }))
            .setColor(0x5865F2);

        await interaction.reply({ embeds: [embed] });
    },
};