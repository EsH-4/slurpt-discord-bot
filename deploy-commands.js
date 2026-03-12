const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
require('module-alias/register');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.warn(`⚠️ Command di ${file} tidak punya properti "data" atau "execute".`);
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`🔄 Started refreshing ${commands.length} global application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log(`✅ Successfully reloaded ${commands.length} global application (/) commands.`);
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
    }
})();