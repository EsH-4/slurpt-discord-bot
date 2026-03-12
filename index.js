const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
require('module-alias/register');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`⚠️ Command di ${file} tidak punya properti "data" atau "execute".`);
    }
}

client.once(Events.ClientReady, readyClient => {
    console.log(`✅ ${readyClient.user.tag} is online!`);
});

client.on(Events.InteractionCreate, async interaction => {
    // Button verify rules
    if (interaction.isButton()) {
        if (interaction.customId !== 'verify_rules') return;
        const { successEmbed, warningEmbed, errorEmbed, infoEmbed } = require('@commands/utils/embeds.js');
        if (!interaction.inGuild()) {
            return interaction.reply({
                embeds: [infoEmbed('Button ini hanya bisa dipakai di server.')],
                ephemeral: true,
            });
        }

        const rakyat = interaction.guild.roles.cache.get('1365938281820192768');
        const cowok = interaction.guild.roles.cache.get('1425847118538473644');
        const visitor = interaction.guild.roles.cache.get('1410177952565563514');

        if (!rakyat) {
            return interaction.reply({
                embeds: [errorEmbed('Role rakyat tidak ditemukan.')],
                ephemeral: true,
            });
        }

        if (interaction.member.roles.cache.has(rakyat.id)) {
            return interaction.reply({
                embeds: [warningEmbed('Kamu sudah verified.')],
                ephemeral: true,
            });
        }

        try {
            const rolesToAdd = [rakyat, cowok].filter(Boolean);
            await interaction.member.roles.add(rolesToAdd);

            if (visitor) {
                await interaction.member.roles.remove(visitor);
            }

            await interaction.reply({
                embeds: [successEmbed('Kamu berhasil diverifikasi!')],
                ephemeral: true,
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                embeds: [errorEmbed('Terjadi error saat memberikan role.')],
                ephemeral: true,
            });
        }

        return;
    }

    // Slash commands
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ Error executing /${interaction.commandName}:`, error);

        const { errorEmbed } = require('@commands/utils/embeds.js');
        const payload = {
            embeds: [errorEmbed('Terjadi error saat menjalankan command.')],
            ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(payload);
        } else {
            await interaction.reply(payload);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);