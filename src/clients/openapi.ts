import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';
import { environmentVariables } from '../util/environmentVariables';
import { ChannelMessage } from '../commands/summary/utils';

const openai = new OpenAI({
	apiKey: environmentVariables.openAiApiKey,
	project: environmentVariables.openAiProjectID
});

export const fetchOpenAISummary = async (
	prompt: ChannelMessage[]
): Promise<ChatCompletion> => {
	return openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: `
                You are going to be provided an stringified array that contains objects. Each object represents a unique messages from a Discord channel. Each object includes the following keys:
                    - createdAt: Time the message was posted.
                    - user: The user that posted the message.
                    - message: The message the user posted. 
                The array will start with the newest message and end with the oldest message. I want you to read through each message and summarize the conversation. Keep in mind that the full context for the conversation may not be encompassed in the messages provided and that there may be several concurrent conversation happening at the same time. Try your best to figure out what the topic(s) are being discussed and what the main arguments are. 
                After you've identified all the unique topics, I want you to use the template below to describe each topic. 

                \`\`\`
                ### Summary Bot Summary: <Enter Header for Topic> 

                <Enter 4-12 summary of the topic>
                \`\`\`

                Keep the response for each topic to less than 1800 characters.
            `
			},
			{
				role: 'user',
				content: JSON.stringify(prompt)
			}
		]
	});
};
