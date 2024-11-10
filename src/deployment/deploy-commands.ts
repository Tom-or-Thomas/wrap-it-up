import {
	REST,
	RESTPostAPIApplicationCommandsJSONBody,
	Routes
} from 'discord.js';
import summary from '../commands/summary/summary';
import { environmentVariables } from '../util/environmentVariables';

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

// Grab all the command folders from the commands directory you created earlier
commands.push(summary.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(environmentVariables.discordAppToken);

// and deploy your commands!
(async () => {
	try {
		console.log(
			`Started refreshing ${commands.length} application (/) commands.`
		);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(
				environmentVariables.clientID,
				environmentVariables.guildID
			),
			{ body: commands }
		);

		console.log(`Successfully reloaded application (/) commands.`, data);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
