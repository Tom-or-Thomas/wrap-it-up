import {
	authenticateDiscordClient,
	registerDiscordEvents
} from './clients/disocrd';

async function init() {
	console.log(`Establishing connection to Discord....`);

	// Log in to Discord with your client's token
	await authenticateDiscordClient();

	console.log(`Connection to Discord is established!`);

	// Setup listener to listen for when command is called
	registerDiscordEvents();

	console.log('Registered all events for Discord client');
}

init();
