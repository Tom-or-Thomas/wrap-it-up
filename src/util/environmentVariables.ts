import 'dotenv/config';
import { z } from 'zod';

export type EnvironmentVariables = {
	discordAppToken: string;
	clientID: string;
	guildID: string;
	channelID: string;
	maxMessage: number;
	openAiApiKey: string;
	openAiProjectID: string;
};

const schema = z.object({
	DISCORD_APP_TOKEN: z.string({ required_error: 'Discord App Token required' }),
	CLIENT_ID: z.string({ required_error: 'Discord Client ID required' }),
	GUILD_ID: z.string({ required_error: 'Discord Guild ID required' }),
	CHANNEL_ID: z.string({ required_error: 'Discord Channel ID required' }),
	MAX_MESSAGES: z.string().regex(/^\d+$/).default('100').transform(Number),
	OPENAI_API_KEY: z.string({ required_error: 'OpenAI API key required' }),
	OPENAI_PROJECT_ID: z.string({ required_error: 'OpenAI project id required' })
});

// Will fail if any of env variables are not present
const validatedResults = schema.parse(process.env);

export const environmentVariables: Readonly<EnvironmentVariables> = {
	discordAppToken: validatedResults.DISCORD_APP_TOKEN,
	clientID: validatedResults.CLIENT_ID,
	guildID: validatedResults.GUILD_ID,
	channelID: validatedResults.CHANNEL_ID,
	maxMessage: validatedResults.MAX_MESSAGES,
	openAiApiKey: validatedResults.OPENAI_API_KEY,
	openAiProjectID: validatedResults.OPENAI_PROJECT_ID
};
