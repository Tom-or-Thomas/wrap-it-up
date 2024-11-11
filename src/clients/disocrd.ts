import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { environmentVariables } from '../util/environmentVariables';
import summary from '../commands/summary/summary';

const discordClient = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	]
});

export const authenticateDiscordClient = async () => {
	return discordClient.login(environmentVariables.discordAppToken);
};

export const registerDiscordEvents = async () => {
	discordClient.on(Events.InteractionCreate, async (interaction) => {
		console.log('Interactive "Create" event received');

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
};

// TODO: Support these channels  PublicThreadChannel, TextChannel
export const fetchDiscordChannel = async (
	channelId: string
): Promise<TextChannel> => {
	return (await discordClient.channels.fetch(channelId)) as TextChannel;
};
