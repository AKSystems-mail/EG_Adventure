'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send, MessageSquare, Sparkles, Bot } from 'lucide-react';
import SpeakerButton from './SpeakerButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { emmaGraceTutor } from '@/ai/flows/emma-grace-tutor'; // Path to your Genkit flow
import type { EmmaGraceTutorInput, EmmaGraceTutorOutput } from '@/ai/flows/emma-grace-tutor';

interface AiTutorPanelProps {
  topicId: string;
  levelTitle: string;
}

const predefinedQuestions = [
  "Can you explain this again?",
  "Why is that the answer?",
  "Tell me more about this part.",
  "What's another example?",
];

const AiTutorPanel: React.FC<AiTutorPanelProps> = ({ topicId, levelTitle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuestionSubmit = async (question: string) => {
    setIsLoading(true);
    setAiResponse(null);
    setError(null);

    try {
      const input: EmmaGraceTutorInput = { topicId, predefinedQuestion: question };
      const output: EmmaGraceTutorOutput = await emmaGraceTutor(input);
      setAiResponse(output.answer);
    } catch (err) {
      console.error("Error calling AI tutor:", err);
      setError("Oops! Emma Grace is thinking hard but couldn't answer right now. Try again in a bit!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot size={32} className="text-primary" />
          <CardTitle className="text-2xl font-headline">Ask Emma Grace!</CardTitle>
        </div>
        <CardDescription>Your friendly helper for lesson: <span className="font-semibold">{levelTitle}</span></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">Having a tricky time? Tap a question below!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {predefinedQuestions.map((q, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleQuestionSubmit(q)}
              disabled={isLoading}
              className="h-auto py-3 text-left justify-start"
            >
              <MessageSquare size={18} className="mr-2 shrink-0" />
              {q}
            </Button>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Emma Grace is thinking...</p>
          </div>
        )}

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md">
            <p>{error}</p>
          </div>
        )}

        {aiResponse && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg space-y-2">
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Sparkles size={20} /> Emma Grace says:
              </h4>
              <SpeakerButton textToSpeak={aiResponse} />
            </div>
            <p className="text-foreground whitespace-pre-line">{aiResponse}</p>
          </div>
        )}
      </CardContent>
       <CardFooter>
        <p className="text-xs text-muted-foreground">Emma Grace uses AI to help. Always double-check with a grown-up if you're unsure!</p>
      </CardFooter>
    </Card>
  );
};

export default AiTutorPanel;
