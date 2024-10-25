import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { channelMessages } from '..';
import { callAI } from '../api/openapi';


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
				
		await interaction.editReply(
				response.choices[0].message?.content?.slice(0, 1500) || 'We did not get an actually message back, sorry', 
		);

		return true;
	}
};
