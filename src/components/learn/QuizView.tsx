'use client';

import type { Level, QuizItem, QuizOption } from '@/lib/types';
import SpeakerButton from './SpeakerButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuizViewProps {
  level: Level;
  onQuizComplete: (isCorrect: boolean, scoreAwarded: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ level, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = level.quiz[currentQuestionIndex];

  useEffect(() => {
    // Reset state when level changes (though typically quiz is per level)
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
  }, [level]);

  const handleOptionSelect = (option: QuizOption) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setShowExplanation(false); // Hide previous explanation if any

    if (option.isCorrect) {
      setScore(prevScore => prevScore + 10); // Award 10 points for correct answer
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < level.quiz.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      // Quiz finished
      onQuizComplete(score > 0, score); // Pass total score
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(prev => !prev);
  };
  
  const progressPercentage = ((currentQuestionIndex + 1) / level.quiz.length) * 100;

  return (
    <Card className="shadow-xl w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-headline text-primary">Quiz Time!</CardTitle>
          <SpeakerButton textToSpeak={`${currentQuestion.questionText}. ${currentQuestion.options.map((o,i) => `Option ${i+1}: ${o.text}`).join('. ')}`} />
        </div>
        <Progress value={progressPercentage} className="w-full mt-2" />
        <p className="text-sm text-muted-foreground text-center mt-1">Question {currentQuestionIndex + 1} of {level.quiz.length}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-2xl font-semibold text-center mb-4">{currentQuestion.questionText}</h3>
        
        {currentQuestion.assetUrl && (
          <div className="flex justify-center my-4">
            <Image 
              src={currentQuestion.assetUrl} 
              alt={`Quiz illustration for ${currentQuestion.id}`} 
              width={300} 
              height={200} 
              className="rounded-lg shadow-md"
              data-ai-hint="quiz question" 
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto py-4 text-lg whitespace-normal justify-start items-center gap-2 transition-all duration-300
                ${isAnswered && option.isCorrect ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-200' : ''}
                ${isAnswered && selectedOption === option && !option.isCorrect ? 'bg-red-100 border-red-500 text-red-700 hover:bg-red-200' : ''}
                ${!isAnswered ? 'hover:bg-accent/20' : 'cursor-not-allowed'}`}
              onClick={() => handleOptionSelect(option)}
              disabled={isAnswered}
            >
              {isAnswered && option.isCorrect && <CheckCircle className="text-green-500" />}
              {isAnswered && selectedOption === option && !option.isCorrect && <XCircle className="text-red-500" />}
              {option.text}
            </Button>
          ))}
        </div>

        {isAnswered && (
          <div className={`mt-4 p-4 rounded-md text-center ${selectedOption?.isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <p className="text-xl font-semibold">
              {selectedOption?.isCorrect ? 'Correct! Well done!' : 'Not quite, try again next time!'}
            </p>
            {currentQuestion.explanation && (
                 <Button variant="link" onClick={toggleExplanation} className="text-sm mt-2">
                 {showExplanation ? 'Hide Explanation' : 'Show Explanation'} <HelpCircle size={16} className="ml-1"/>
               </Button>
            )}
          </div>
        )}
         {isAnswered && showExplanation && currentQuestion.explanation && (
          <Card className="mt-2 bg-muted p-3">
            <CardContent className="text-sm text-muted-foreground">
              <p><Sparkles size={16} className="inline mr-1 text-yellow-500" /> {currentQuestion.explanation}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter>
        {isAnswered && (
          <Button onClick={handleNextQuestion} className="w-full text-lg py-3 bg-primary hover:bg-primary/90">
            {currentQuestionIndex < level.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizView;
