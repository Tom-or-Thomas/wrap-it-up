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
            `You are going to be provided an stringified array that contains objects. Each object represents a unique messages 
            from a Discord channel. Each object includes the following keys 
                - createdAt: Time the message was posted.
                - user: The user that posted the message.
                - message: The message the user posted. 
            The array will start with the newest message and end with the oldest message. 
            I want you to read through each message and summarize the conversation. Keep in mind 
            that the full context for the conversation may not be encompassed in the messages provided.
            and that there may be several concurrent conversation happening at the same time.
            Try your best to figure out what the topic(s) are and what the main arguments were. 

            For each unique topic, I want the response to to follow the following structure. Starts with a 1-2 sentence summary of the topic that is 
            titled "Summary Bot Summary: Insert description here". Next, I want 4-12 sentences for the arguments and points 
            specific users brought up.

            Keep all the response for each topic to less than 1800 characters
            `
        },
        {
            role: 'user',
            content: JSON.stringify(prompt)
        }
    ]
    })
}

