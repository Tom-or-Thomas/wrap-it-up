import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import summary from './commands/utility/summary';

// Setup env variables
import 'dotenv/config';

// TODO: Cleanup typing for env variables.
const MAX_MESSAGES = (process.env.MAX_MESSAGES as unknown as number) || 200;

type ChannelMessage = {
	user: string;
	message: string;
	createdAt: number;
};

// [0] is newest message
export const channelMessages: ChannelMessage[] = [];

async function init() {
	// Create a new client instance
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.MessageContent
		]
	});

	console.log(`Establishing connection to Discord....`);

	// Log in to Discord with your client's token
	await client.login(process.env.DISCORD_APP_TOKEN);

	console.log(`Connection to Discord is established!`);

	// Get channel
	const channel = (await client.channels.fetch(
		process.env.CHANNEL_ID as string
	)) as TextChannel;

	//  Get messages for channel
	const messages = await channel?.messages.fetch({ limit: 5 });

	console.log(`We received a total of ${messages.size} messages`);

	// Push user messages to array
	for (const message of messages.values()) {
		channelMessages.push({
			user: message.author.globalName || message.author.username,
			message: message.content,
			createdAt: message.createdTimestamp
		});
	}

	//  Listen for new messages in the channel
	client.on('messageCreate', async (newMessage) => {
		// Only want to check on messages coming from channel we are monitoring
		if (newMessage.guildId !== process.env.CHANNEL_ID) {
			return;
		}

		// If above max number of messages, remove the last item (oldest message)
		if (channelMessages.length > MAX_MESSAGES) {
			channelMessages.pop();
		}

		// Add new item to begging of an array
		channelMessages.unshift({
			user: newMessage.author.globalName || newMessage.author.username,
			message: newMessage.content,
			createdAt: newMessage.createdTimestamp
		});
	});

	// Setup listener to listen for when command is called
	client.on(Events.InteractionCreate, async (interaction) => {
		console.log('Interactive Create event received');

		// TODO: Figure out if this will ever be called from other commands
		if (!interaction.isChatInputCommand()) {
			console.error('Interaction was not chat input command');
			return;
		}
		// Make sure client is only called for commands we know.
		if (interaction.commandName !== 'summary') {
			console.log('Unknown command received', {
				command: interaction.commandName
			});
			return;
		}

		try {
			// Execute summary command, since it's the only command currently supported
			await summary.execute(interaction);
			return;
		} catch (error: unknown) {
			console.log('encountered error when executing summary command', {
				error
			});
		}
	});
}

init();
