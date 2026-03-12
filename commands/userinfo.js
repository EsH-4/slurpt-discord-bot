const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: "general",
    
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Informasi user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin dicek')
                .setRequired(false)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('user') || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: "User ID", value: user.id },
                { name: "Account Created", value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>` }
            )
            .setColor(0x5865F2);

        await interaction.reply({ embeds: [embed] });
    },
};