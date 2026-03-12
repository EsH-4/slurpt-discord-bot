const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    category: 'general',

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar command'),

    async execute(interaction) {
        const commands = interaction.client.commands;
        const categories = {};

        commands.forEach(command => {
            const category = command.category || 'other';

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(
                `\`/${command.data.name}\` - ${command.data.description}`
            );
        });

        const embed = new EmbedBuilder()
            .setTitle('📖 Command List')
            .setColor(0x5865F2)
            .setTimestamp();

        for (const category in categories) {
            embed.addFields({
                name: category.charAt(0).toUpperCase() + category.slice(1),
                value: categories[category].sort().join('\n'),
                inline: false,
            });
        }

        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
};