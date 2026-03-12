const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: "general",
    
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Informasi server'),

    async execute(interaction) {

        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: "Server ID", value: guild.id, inline: true },
                { name: "Members", value: `${guild.memberCount}`, inline: true },
                { name: "Created", value: `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`, inline: true }
            )
            .setColor(0x00ff00);

        await interaction.reply({ embeds: [embed] });
    },
};