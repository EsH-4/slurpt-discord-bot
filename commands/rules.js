const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');
const { successEmbed } = require('@commands/utils/embeds.js');

module.exports = {

    category: "admin",

    data: new SlashCommandBuilder()
        .setName('sendrules')
        .setDescription('Kirim rules + verification button')
        .addStringOption(option =>
            option
                .setName('tambahan')
                .setDescription('Teks tambahan (muncul sebagai embed kedua)')
                .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const tambahan = interaction.options.getString('tambahan');

        const rulesEmbed = new EmbedBuilder()
            .setDescription(`
# 📜 Server Rules
### 1. Saling Menghargai dan Berperilaku Positif
• Hormati setiap anggota, terlepas dari latar belakang, suku, agama, atau gender mereka.
• Tidak menggunakan kata-kata kasar yang berlebihan, menghina, atau merendahkan.
• Tidak boleh ada pelecehan, intimidasi, atau ancaman dalam bentuk apa pun.

### 2. Jagalah Keamanan dan Privasi
• Jangan menyebarkan informasi pribadi orang lain tanpa izin (seperti nomor telepon, alamat, atau foto pribadi).
• Jangan klik tautan mencurigakan yang dibagikan oleh orang lain.

### 3. Konten yang Dilarang
• Tidak boleh membagikan konten yang bersifat pornografi, kekerasan ekstrem, atau gore.
• Hindari topik sensitif yang bisa menimbulkan perdebatan, seperti politik, isu SARA (Suku, Agama, Ras, dan Antargolongan).
• Dilarang mempromosikan hal-hal ilegal.

### 4. Dilarang Spam dan Promosi
• Jangan mengirim pesan yang sama berulang-ulang (spam).
• Dilarang mempromosikan server, produk, atau layanan lain tanpa izin dari admin atau moderator.

### 5. Ikuti Aturan Setiap Channel
• Gunakan saluran yang tepat untuk setiap topik. Misalnya, bagikan foto hanya di saluran <#1410218196660649984>
• Baca deskripsi saluran untuk tahu topik apa yang dibahas di sana.

### 6. Dengarkan Admin dan Moderator
• Admin dan moderator ada untuk menjaga ketertiban. Ikuti instruksi mereka.
• Jika kamu punya keluhan, kirim pesan pribadi ke <@&1410643415959343215>, <@&1410643369108963389> atau gunakan channel <#1410489191049072702> untuk laporan.


`)
            .setColor(0x57F287); // hijau

        const warningEmbed = new EmbedBuilder()
            .setTitle("⚠️ Pelanggaran Aturan")
            .setDescription(`Pelanggaran aturan akan mendapatkan sanksi, mulai dari peringatan, pembatasan akses (mute/kick), hingga pengeluaran permanen (ban) dari server.`)
            .setColor(0xED4245); // merah

        const embeds = [rulesEmbed, warningEmbed];

        if (tambahan?.trim()) {
            embeds.push(
                new EmbedBuilder()
                    .setTitle("📌 Info Tambahan")
                    .setDescription(tambahan.trim())
                    .setColor(0x273DE4)
            );
        }

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verify_rules')
                    .setLabel('Accept Rules')
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.channel.send({
            embeds,
            components: [button]
        });

        await interaction.reply({
            embeds: [successEmbed('Rules berhasil dikirim.')],
            ephemeral: true
        });

    }
};