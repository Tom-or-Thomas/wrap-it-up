import { ChatInputCommandInteraction, TextChannel } from 'discord.js';
import { ChatCompletion } from 'openai/resources';

export type ChannelMessage = {
	user: string;
	message: string;
};

/**
 * Retrieves messages from the channel the command was called from. The amount of messages retrieve is
 * based on the count that was specified. The message includes th user name and the message content.
 *
 * @param {TextChannel} channel - Discord channel
 * @param {ChatInputCommandInteraction} interaction - Discord interaction
 * @returns {(Promise<ChannelMessage[] | null>)} Discord messages that have be structured for OpenAI
 */
export const getChannelMessages = async (
	channel: TextChannel,
	interaction: ChatInputCommandInteraction
): Promise<ChannelMessage[] | null> => {
	const channelMessages: ChannelMessage[] = [];

	// Get count option passed to command
	const count = interaction.options.data.find((d) => d.name === 'count');

	if (!count?.value) {
		return null;
	}

	//  Get messages from channel
	const messages = await channel?.messages.fetch({
		limit: count.value as number
	});

	console.log(`We received a total of ${messages.size} messages`);

	// Push user messages to array
	for (const message of messages.values()) {
		// TODO: Exclude bot messages or make it an option that can be removed.
		channelMessages.push({
			user: message.author.globalName || message.author.username,
			message: message.content
		});
	}

	return channelMessages;
};

/**
 * Post the ChatGPT message summary response to the channel the command was triggered from.
 * The response is added to a thread and is split based on the individual topic
 *
 * @param {ChatCompletion} response - OpenAI response
 * @param {TextChannel} channel - Discord channel
 * @param {ChatInputCommandInteraction} interaction - Discord interaction
 * @returns {Promise<boolean>}
 */
export const postSummary = async (
	response: ChatCompletion,
	channel: TextChannel,
	interaction: ChatInputCommandInteraction
): Promise<boolean> => {
	// TODO: Add a check here to make sure that OpenAI included ### Summary Bot section or at least formatted properly.
	const messageSummaries = response.choices[0].message.content
		?.split('### Summary Bot Summary')
		.filter((m) => m !== '');

	if (!messageSummaries) {
		return false;
	}
	const startMessage = await interaction.editReply(
		'Starting thread for summary report'
	);

	const thread = await channel.threads.create({
		startMessage,
		name: 'Summary Response'
	});

	for (let i = 0; i < messageSummaries.length; i++) {
		thread.send(`**Topic ${i + 1}${messageSummaries[i]}`);
	}

	return true;
};
