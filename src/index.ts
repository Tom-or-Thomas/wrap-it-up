// Setup env variables
// import 'dotenv/config';

import { Events } from 'discord.js';
import summary from './commands/summary';
import { environmentVariables } from './util/environmentVariables';
import { discordClient } from './disocrd';

export type ChannelMessage = {
	user: string;
	message: string;
	createdAt: number;
};

// [0] is newest message
export const channelMessages: ChannelMessage[] = [];

async function init() {

	console.log(`Establishing connection to Discord....`);

	// Log in to Discord with your client's token
	await discordClient.login(environmentVariables.discordAppToken);

	console.log(`Connection to Discord is established!`);

	// Setup listener to listen for when command is called
	discordClient.on(Events.InteractionCreate, async (interaction) => {
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
