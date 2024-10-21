import {Client, Collection, Events, GatewayIntentBits} from 'discord.js';
import * as summary from './commands/utility/summary'




const token = process.env.DISCORD_APP_TOKEN


async function init() {

    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    const commands = new Collection();

    commands.set('summary', summary.default)
    
    // Log in to Discord with your client's token
    await client.login(token);
    
    
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName !== 'summary') {
            console.log('Unknown command received', {command: interaction.commandName})
            return;
        }


        try {
            await summary.default.execute(interaction)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(err: any) {
            console.log('encountered error when executing summary command', {error: err?.messages})
        }
        console.log(interaction);
    });
    
    // Registering Commands
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

}



init();