import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	TextChannel
} from 'discord.js';
import { callAI } from '../api/openapi';
import { discordClient } from '../disocrd';

type ChannelMessage = {
	user: string;
	message: string;
	createdAt: number;
};

export default {
	data: new SlashCommandBuilder()
		.setName('summary')
		.setDescription('Get a summary of recent messages, and hopefully it works')
		.addNumberOption((options) => {
			return options
				.setName('count')
				.setRequired(true)
				.setMaxValue(100)
				.setMinValue(1)
				.setDescription('How many messages do you want to summarize');
		}),
	execute: async (interaction: ChatInputCommandInteraction) => {
		const channelMessages: ChannelMessage[] = [];

		await interaction.deferReply();

		// Get channel
		// const channel = (await discordClient.channels.fetch(interaction.channelId)) as TextChannel;
		const channel = (await discordClient.channels.fetch(
			interaction.channelId
		)) as TextChannel;

		// Get count option passed to command
		const count = interaction.options.data.find((d) => d.name === 'count');

		if (!count?.value) {
			// Should never be reached, but adding just in case
			await interaction.editReply(
				'Please specify a number of messages to summarize'
			);
			return;
		}

		//  Get messages from channel
		const messages = await channel?.messages.fetch({
			limit: count.value as number
		});

		console.log(`We received a total of ${messages.size} messages`);

		// Push user messages to array
		for (const message of messages.values()) {
			channelMessages.push({
				user: message.author.globalName || message.author.username,
				message: message.content,
				createdAt: message.createdTimestamp
			});
		}

		const openAIResponse = await callAI(channelMessages);

		const messageSummaries = openAIResponse.choices[0].message.content
			?.split('### Summary Bot Summary')
			.filter((m) => m !== '');

		const startMessage = await interaction.editReply(
			!messageSummaries
				? 'We did not get an actually message back, sorry'
				: 'Starting thread for summary report'
		);
		if (!messageSummaries) {
			return;
		}

		console.log('trying to create a thread at this moment', startMessage);
		const thread = await channel.threads.create({
			startMessage,
			name: 'Summary Response'
		});

		for (let i = 0; i < messageSummaries.length; i++) {
			console.log(
				'Attempting to push a new thread message, ',
				messageSummaries[i]
			);
			thread.send(`**Topic ${i + 1}${messageSummaries[i]}`);
		}

		return true;
	}
};
