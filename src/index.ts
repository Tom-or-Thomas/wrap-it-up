import {Client, GatewayIntentBits} from 'discord.js';


const token = process.env.DISCORD_APP_TOKEN

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Log in to Discord with your client's token
client.login(token);