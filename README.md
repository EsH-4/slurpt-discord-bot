# Slurpt Discord Bot

Slurpt is a multi-purpose Discord bot built using **discord.js v14**.
It provides moderation tools, slash commands, verification systems, and various utility features designed to help manage Discord servers.

---

## Features

* Slash command system using Discord Application Commands
* Moderation commands (kick, ban, timeout, clear)
* Verification system using button roles
* Automatic help command that lists all commands
* Embed-based feedback messages
* PM2 support for production bot running
* Modular command structure

---

## Technology Stack

* Node.js
* discord.js v14
* PM2 (Process Manager)
* dotenv

---

## Project Structure

```
slurpt-discord-bot
│
├ commands/            # Slash command files
├ utils/               # Utility helpers
├ deploy-commands.js   # Script to register slash commands
├ index.js             # Main bot entry
├ package.json
├ .env                 # Environment variables (DO NOT upload)
└ README.md
```

---

## Installation

### 1. Clone repository

```
git clone https://github.com/yourusername/slurpt-discord-bot
```

### 2. Install dependencies

```
npm install
```

### 3. Setup `.env`

```
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_server_id
```

### 4. Deploy slash commands

```
npm run deploy
```

### 5. Start the bot

```
node index.js
```

---

## Running with PM2

Start bot with PM2

```
pm2 start index.js --name slurpt
```

Restart bot

```
pm2 restart slurpt
```

View logs

```
pm2 logs slurpt
```

---

## Security Notice

Never upload your `.env` file to GitHub.
Add `.env` to your `.gitignore` to prevent leaking your bot token.

---

## License

This project is open-source and available for educational and personal use.
