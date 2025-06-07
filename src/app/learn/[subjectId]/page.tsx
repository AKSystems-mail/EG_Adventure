'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { getSubjectById, getLevelByDifficulty, getTopicById } from '@/lib/content';
import type { Subject, Level, Topic } from '@/lib/types';

import LessonView from '@/components/learn/LessonView';
import DemoView from '@/components/learn/DemoView';
import QuizView from '@/components/learn/QuizView';
import AiTutorPanel from '@/components/learn/AiTutorPanel';
import Celebration from '@/components/learn/Celebration';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertTriangle, Lightbulb, BookOpen, CheckSquare, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

export default function LearnPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  const router = useRouter();
  const { toast } = useToast();

  const { progress, isLoading: progressLoading, error: progressError, completeLevel, reloadProgress } = useProgress(subjectId);
  
  const [subject, setSubject] = useState<Subject | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [isLastLevel, setIsLastLevel] = useState(false);


  useEffect(() => {
    if (subjectId) {
      const foundSubject = getSubjectById(subjectId);
      if (foundSubject) {
        setSubject(foundSubject);
      } else {
        // Handle subject not found, maybe redirect or show error
        console.error("Subject not found:", subjectId);
        router.push('/dashboard'); // Or an error page
      }
    }
  }, [subjectId, router]);

  useEffect(() => {
    if (progress && subject) {
      setIsLoadingContent(true);
      const level = getLevelByDifficulty(subject.id, progress.currentDifficultyLevel);
      setCurrentLevel(level || null);
      if (level) {
        const topic = getTopicById(level.topicId);
        setCurrentTopic(topic || null);
      } else {
        // This might mean the user has completed all levels or there's a content gap
        setIsLastLevel(true); 
        console.warn(`No level found for subject ${subject.id} at difficulty ${progress.currentDifficultyLevel}`);
      }
      setIsLoadingContent(false);
    }
  }, [progress, subject]);

  const handleQuizComplete = (isCorrect: boolean, scoreAwarded: number) => {
    if (currentLevel) {
      const hasNextLevel = completeLevel(currentLevel.difficultyLevel);
      if (!hasNextLevel) {
        setIsLastLevel(true);
      }

      setCelebrationMessage(isCorrect ? "Level Complete!" : "Good Effort!");
      setShowCelebration(true);
      toast({
        title: isCorrect ? "Awesome Job!" : "Keep Trying!",
        description: `You earned ${scoreAwarded} points! ${!hasNextLevel ? "You've reached the end of this adventure!" : ""}`,
        variant: isCorrect ? "default" : "destructive",
      });
    }
  };
  
  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    if (isLastLevel && !currentLevel) { // If it was the last level and now currentLevel is null
      // No explicit action needed here, page will show "all levels complete" message
    } else {
       reloadProgress(); // This will trigger re-fetch of new level content
    }
  };

  if (progressLoading || isLoadingContent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-2xl font-semibold">Loading your next adventure...</p>
        <p className="text-muted-foreground">Getting everything ready for {subject?.name || 'learning'}!</p>
      </div>
    );
  }

  if (progressError) {
    return (
       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-4">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-3xl font-bold text-destructive mb-2">Oops! Something went wrong.</h2>
        <p className="text-xl text-muted-foreground mb-6">{progressError}</p>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Dashboard
        </Button>
      </div>
    );
  }

  if (!currentLevel && isLastLevel) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-4">
        <Sparkles className="h-20 w-20 text-accent mb-6 animate-pulse" />
        <h2 className="text-4xl font-bold font-headline text-primary mb-4">Congratulations!</h2>
        <p className="text-xl text-foreground mb-3">
          You've completed all available adventures in {subject?.name || 'this subject'} for now!
        </p>
        <p className="text-md text-muted-foreground mb-8">
          Check back later for new challenges, or explore another subject.
        </p>
        <Link href="/dashboard" passHref>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }
  
  if (!subject || !progress || !currentLevel || !currentTopic) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-4">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-3xl font-bold text-destructive mb-2">Adventure Not Found</h2>
        <p className="text-xl text-muted-foreground mb-6">We couldn't find the learning content. Please try again or go back.</p>
        <Button onClick={() => router.push('/dashboard')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2 mb-8 border-b pb-6">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center justify-center gap-3">
          {subject.Icon && <subject.Icon size={48} className="inline-block" />}
          {subject.name}
        </h1>
        <p className="text-xl text-muted-foreground">Topic: {currentTopic.name}</p>
        <p className="text-lg text-accent font-semibold">Current Challenge: Level {currentLevel.difficultyLevel}</p>
      </header>

      <Tabs defaultValue="lesson" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-6">
          <TabsTrigger value="lesson" className="py-3 text-md"><BookOpen className="mr-2 h-5 w-5"/>Lesson</TabsTrigger>
          <TabsTrigger value="demo" className="py-3 text-md"><Lightbulb className="mr-2 h-5 w-5"/>Demo</TabsTrigger>
          <TabsTrigger value="quiz" className="py-3 text-md"><CheckSquare className="mr-2 h-5 w-5"/>Quiz</TabsTrigger>
          <TabsTrigger value="tutor" className="py-3 text-md col-span-3 md:col-span-2"><MessageCircle className="mr-2 h-5 w-5"/>Ask Emma Grace</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lesson">
          <LessonView level={currentLevel} />
        </TabsContent>
        <TabsContent value="demo">
          <DemoView level={currentLevel} />
        </TabsContent>
        <TabsContent value="quiz">
          <QuizView level={currentLevel} onQuizComplete={handleQuizComplete} />
        </TabsContent>
         <TabsContent value="tutor">
          <div className="flex justify-center">
            <AiTutorPanel topicId={currentLevel.topicId} levelTitle={currentLevel.lessonTitle} />
          </div>
        </TabsContent>
      </Tabs>

      {showCelebration && (
        <Celebration 
          message={celebrationMessage} 
          onComplete={handleCelebrationComplete}
        />
      )}
      
      <div className="mt-12 text-center">
        <Link href="/dashboard" passHref>
            <Button variant="outline" size="lg">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Subjects
            </Button>
        </Link>
      </div>
    </div>
  );
}
