import {
	SlashCommandBuilder,
	ChatInputCommandInteraction,
	TextChannel
} from 'discord.js';
import { fetchOpenAISummary } from '../../clients/openapi';
import { getChannelMessages, postSummary } from './utils';
import { discordClient } from '../../clients/disocrd';

// Defines what the discord user sees when interacting with command
const description = new SlashCommandBuilder()
	.setName('summary')
	.setDescription('Get a summary of recent messages, and hopefully it works')
	.addNumberOption((options) => {
		return options
			.setName('count')
			.setRequired(true)
			.setMaxValue(100)
			.setMinValue(1)
			.setDescription('How many messages do you want to summarize');
	});

// Code that is executed when the command is ran
const command = async (
	interaction: ChatInputCommandInteraction
): Promise<void> => {
	await interaction.deferReply();

	// Get channel
	// const channel = (await discordClient.channels.fetch(interaction.channelId)) as TextChannel;
	// TODO: Support these channels  PublicThreadChannel, TextChannel

	const channel = (await discordClient.channels.fetch(
		interaction.channelId
	)) as TextChannel;

	const channelMessages = await getChannelMessages(channel, interaction);

	if (!channelMessages) {
		// Should never be reached, but adding just in case
		await interaction.editReply(
			'Please specify a number of messages to summarize'
		);
		return;
	}

	const openAIResponse = await fetchOpenAISummary(channelMessages);

	const postMessage = await postSummary(openAIResponse, channel, interaction);

	if (!postMessage) {
		await interaction.editReply(
			'We did not get an actually message back, sorry'
		);
		return;
	}
	return;
};

export default {
	data: description,
	execute: command
};
