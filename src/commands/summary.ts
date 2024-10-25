import { SlashCommandBuilder, ChatInputCommandInteraction, TextChannel } from 'discord.js';
import { channelMessages } from '..';
import { callAI } from '../api/openapi';
import { discordClient } from '../disocrd';
import { environmentVariables } from '../util/environmentVariables';


export default {
	data: new SlashCommandBuilder()
		.setName('summary')
		.setDescription('Get a summary of recent messages, and hopefully it works')
		.addNumberOption((options) => {
			return options
				.setName('count')
				.setRequired(true)
				.addChoices(
					{ name: '50', value: 50 },
					{ name: '100', value: 100 },
					{ name: '150', value: 150 },
					{ name: '200', value: 200 }
				)
				.setDescription('How many messages do you want to summarize');
		}),
	execute: async (interaction: ChatInputCommandInteraction) => {

		await interaction.deferReply();

		const response = await callAI(channelMessages)
				
		const messages = response.choices[0].message.content?.split('**Summary Bot Summary').filter(m => m !== '');

		const startMessage = await interaction.editReply(
			!messages ? 
			'We did not get an actually message back, sorry':
			"Starting thread for summary report",
		);
		if (!messages) {
			return;
		}

		const channel = await discordClient.channels.fetch(interaction.channelId) as TextChannel;

		const thread = await channel.threads.create({startMessage, name: 'Summary Response'});
		for (let i = 0; i < messages.length; i++)  {
			thread.send(`**Topic ${i + 1}${messages[i]}`);
		}

		return true;
	}
};
