import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';
import { ChannelMessage } from '..';
import { environmentVariables } from '../util/environmentVariables';


const openai = new OpenAI({
    apiKey: environmentVariables.openAiApiKey,
    project: environmentVariables.openAiProjectID,
});

export const callAI = async (prompt: ChannelMessage[]): Promise<ChatCompletion> => {
    
    return openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
            role: 'system',
            content: 
            `You are going to be provided an stringified array that contains objects. The objects represent unique messages 
            for a Discord channel. Each object includes a key called "createdAt" (that is the time the message 
            was posted), a key called user (which is the the user that posted the message), and the a field
            called message (which is the message the user posted). The array will start with the newest message 
            and end with the oldest message. 
            I want you to read through each message and summarize the conversation. Keep in mind 
            that you may not have the full context for the conversation and that there may be several
            concurrent conversation happening at the same time. Try your best to figure out what the topic(s) are 
            and what the main arguments are. 

            For each unique topic being discuss, I want the response to include the 1-2 sentence summary of the topic that is 
            titled Summary Bot Summary: Insert description here, 4-12 sentences for the arguments being discussed and points 
            specific users brought up, and the end should list each user that participated in the discussion.

            Keep all the response to less than 1800 characters
            `
        },
        {
            role: 'user',
            content: JSON.stringify(prompt)
        }
    ]
    })
}

