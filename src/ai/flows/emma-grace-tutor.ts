'use server';
/**
 * @fileOverview An AI tutor named Emma Grace that answers questions about lesson content.
 *
 * - emmaGraceTutor - A function that handles the AI tutor interaction.
 * - EmmaGraceTutorInput - The input type for the emmaGraceTutor function.
 * - EmmaGraceTutorOutput - The return type for the emmaGraceTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EmmaGraceTutorInputSchema = z.object({
  topicId: z.string().describe('The ID of the current topic.'),
  predefinedQuestion: z.string().describe('The predefined question asked by the child.'),
});
export type EmmaGraceTutorInput = z.infer<typeof EmmaGraceTutorInputSchema>;

const EmmaGraceTutorOutputSchema = z.object({
  answer: z.string().describe('The answer from Emma Grace, based on the lesson content.'),
});
export type EmmaGraceTutorOutput = z.infer<typeof EmmaGraceTutorOutputSchema>;

export async function emmaGraceTutor(input: EmmaGraceTutorInput): Promise<EmmaGraceTutorOutput> {
  return emmaGraceTutorFlow(input);
}

const getContentForTopic = ai.defineTool({
  name: 'getContentForTopic',
  description: 'Retrieves all content for a given topic ID from Firestore.',
  inputSchema: z.object({
    topicId: z.string().describe('The ID of the topic to retrieve content for.'),
  }),
  outputSchema: z.string().describe('The concatenated content for the topic.'),
}, async (input) => {
  // Placeholder implementation - replace with actual Firestore retrieval logic
  // This should fetch all lesson content, demo instructions, and quiz questions/answers
  // for the given topicId and concatenate them into a single string.
  // For now, just return a dummy string.
  return `Dummy content for topic ${input.topicId}.  This should be replaced with actual Firestore data.`;
});

const emmaGraceTutorPrompt = ai.definePrompt({
  name: 'emmaGraceTutorPrompt',
  tools: [getContentForTopic],
  input: {schema: EmmaGraceTutorInputSchema},
  output: {schema: EmmaGraceTutorOutputSchema},
  prompt: `You are 'Emma Grace,' a friendly, patient, and encouraging 6 year old tutor helping her friends who are also 6-years-old. Your personality is gentle and positive. You must answer the user's question based ONLY on the provided context. Do not use any outside knowledge. If the answer is not in the context, respond with 'That's a great question! Let's stick to our lesson for now and we can be curious about that later!'

Context: {{{await tools.getContentForTopic topicId=topicId}}}

Question: {{{predefinedQuestion}}}`,
});

const emmaGraceTutorFlow = ai.defineFlow(
  {
    name: 'emmaGraceTutorFlow',
    inputSchema: EmmaGraceTutorInputSchema,
    outputSchema: EmmaGraceTutorOutputSchema,
  },
  async input => {
    const {output} = await emmaGraceTutorPrompt(input);
    return output!;
  }
);
