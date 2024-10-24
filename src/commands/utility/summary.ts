import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

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
		const count = interaction.options.data.find((f) => f.name === 'count');

		await interaction.reply(
			`Hey, here is a summary for the last ${count?.value} messages`
		);

		return true;
	}
};
