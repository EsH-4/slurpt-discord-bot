const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: 'moderation',

    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban member dari server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin di-ban')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Alasan ban')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

        if (!member) {
            return interaction.reply({
                content: 'Member tidak ditemukan di server ini.',
                ephemeral: true,
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: 'Kamu tidak bisa ban diri sendiri.',
                ephemeral: true,
            });
        }

        if (member.id === interaction.guild.ownerId) {
            return interaction.reply({
                content: 'Kamu tidak bisa ban owner server.',
                ephemeral: true,
            });
        }

        if (!member.bannable) {
            return interaction.reply({
                content: 'Aku tidak bisa ban member itu. Cek role bot dan urutan role.',
                ephemeral: true,
            });
        }

        try {
            await member.ban({ reason });

            await interaction.reply({
                content: `✅ ${member.user.tag} berhasil di-ban.\nAlasan: ${reason}`,
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Gagal ban member tersebut.',
                ephemeral: true,
            });
        }
    },
};