# Slurpt Discord Bot

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![discord.js](https://img.shields.io/badge/discord.js-v14-blue)
![License](https://img.shields.io/badge/license-MIT-purple)
![Maintained](https://img.shields.io/badge/Maintained-yes-brightgreen)

Slurpt is a **multi-purpose Discord bot** built with **discord.js v14**.
It provides moderation tools, slash commands, verification systems, and utility features to help manage Discord servers.

---

# ✨ Features

* Slash command system
* Moderation tools
* Verification system (button roles)
* Embed-based bot responses
* Help command with automatic command listing
* PM2 support for production running
* Modular command structure

---

# 📋 Command Preview

| Command       | Description                      |
| ------------- | -------------------------------- |
| `/help`       | Shows list of available commands |
| `/ping`       | Checks bot latency               |
| `/hello`      | Greets the user                  |
| `/info`       | Shows bot information            |
| `/avatar`     | Displays a user's avatar         |
| `/serverinfo` | Shows server information         |
| `/userinfo`   | Shows information about a user   |
| `/say`        | Makes the bot send a message     |
| `/clear`      | Deletes messages in a channel    |
| `/kick`       | Kicks a member from the server   |
| `/ban`        | Bans a member from the server    |
| `/timeout`    | Temporarily mutes a member       |
| `/sendrules`  | Sends verification rules message |

<img src="assets/Screenshot 2026-03-15 155455.png" width="300">

---

# 🧰 Tech Stack

* Node.js
* discord.js v14
* PM2
* dotenv

---

# 📁 Project Structure

```
slurpt-discord-bot
│
├ commands/            # Slash command files
├ utils/               # Utility helpers
├ deploy-commands.js   # Slash command deploy script
├ index.js             # Main bot entry
├ package.json
├ .env                 # Environment variables (DO NOT upload)
└ README.md
```

---

# ⚙️ Installation

### 1. Clone repository

```
git clone https://github.com/EsH-4/slurpt-discord-bot
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

# 🚀 Running with PM2

Start bot

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

# 📜 License

This project is open-source and available for educational and personal use.
