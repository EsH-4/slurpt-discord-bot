const { EmbedBuilder } = require('discord.js');

function successEmbed(description, title = 'Success') {
    return new EmbedBuilder()
        .setTitle(`✅ ${title}`)
        .setDescription(description)
        .setColor(0x57F287)
        .setTimestamp();
}

function errorEmbed(description, title = 'Error') {
    return new EmbedBuilder()
        .setTitle(`❌ ${title}`)
        .setDescription(description)
        .setColor(0xED4245)
        .setTimestamp();
}

function infoEmbed(description, title = 'Information') {
    return new EmbedBuilder()
        .setTitle(`ℹ️ ${title}`)
        .setDescription(description)
        .setColor(0x5865F2)
        .setTimestamp();
}

function warningEmbed(description, title = 'Warning') {
    return new EmbedBuilder()
        .setTitle(`⚠️ ${title}`)
        .setDescription(description)
        .setColor(0xFEE75C)
        .setTimestamp();
}

module.exports = {
    successEmbed,
    errorEmbed,
    infoEmbed,
    warningEmbed,
};