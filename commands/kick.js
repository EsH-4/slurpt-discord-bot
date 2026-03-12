const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { successEmbed, errorEmbed, warningEmbed } = require('@commands/utils/embeds.js');

module.exports = {
    category: 'moderation',

    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Mengeluarkan member dari server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin di-kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Alasan kick')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

        if (!member) {
            return interaction.reply({
                embeds: [errorEmbed('Member tidak ditemukan di server ini.')],
                ephemeral: true,
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                embeds: [warningEmbed('Kamu tidak bisa kick diri sendiri.')],
                ephemeral: true,
            });
        }

        if (member.id === interaction.guild.ownerId) {
            return interaction.reply({
                embeds: [warningEmbed('Kamu tidak bisa kick owner server.')],
                ephemeral: true,
            });
        }

        if (!member.kickable) {
            return interaction.reply({
                embeds: [errorEmbed('Aku tidak bisa kick member itu. Cek role bot dan urutan role.')],
                ephemeral: true,
            });
        }

        try {
            await member.kick(reason);

            await interaction.reply({
                embeds: [
                    successEmbed(
                        `**User:** ${member.user.tag}\n**Reason:** ${reason}`,
                        'Member Kicked'
                    ),
                ],
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [errorEmbed('Gagal kick member tersebut.')],
                ephemeral: true,
            });
        }
    },
};