const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    category: 'moderation',

    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Memberikan timeout ke member')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User yang ingin di-timeout')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Durasi timeout dalam menit')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Alasan timeout')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const member = interaction.options.getMember('user');
        const duration = interaction.options.getInteger('duration');
        const reason = interaction.options.getString('reason') || 'Tidak ada alasan';

        if (!member) {
            return interaction.reply({
                content: 'Member tidak ditemukan di server ini.',
                ephemeral: true,
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: 'Kamu tidak bisa timeout diri sendiri.',
                ephemeral: true,
            });
        }

        if (member.id === interaction.guild.ownerId) {
            return interaction.reply({
                content: 'Kamu tidak bisa timeout owner server.',
                ephemeral: true,
            });
        }

        if (!member.moderatable) {
            return interaction.reply({
                content: 'Aku tidak bisa timeout member itu. Cek role bot dan urutan role.',
                ephemeral: true,
            });
        }

        const milliseconds = duration * 60 * 1000;

        try {
            await member.timeout(milliseconds, reason);

            await interaction.reply({
                content: `✅ ${member.user.tag} di-timeout selama ${duration} menit.\nAlasan: ${reason}`,
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Gagal melakukan timeout pada member tersebut.',
                ephemeral: true,
            });
        }
    },
};