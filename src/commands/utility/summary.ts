import { Interaction, SlashCommandBuilder } from "discord.js";


export default {
    data: new SlashCommandBuilder().setName('summary').setDescription('Get a summary of recent messages, and hopefully it works'),
    execute: async (interaction: Interaction) => {
        console.log(`This command was triggered from ${interaction.channel}`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await interaction.reply('Pong!');
        return true
    }


}