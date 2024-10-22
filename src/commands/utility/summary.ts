import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";


export default {
    data: new SlashCommandBuilder().setName('summary').setDescription('Get a summary of recent messages, and hopefully it works'),
    execute: async (interaction: ChatInputCommandInteraction) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log('Basic information about the build', interaction.member.guild)
        // await interaction.reply('Pong!');
        return true
    }


}