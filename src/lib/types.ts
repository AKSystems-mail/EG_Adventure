import type { LucideIcon } from 'lucide-react';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizItem {
  id: string;
  questionText: string;
  questionType: 'multiple_choice' | 'true_false'; // Extend as needed
  options: QuizOption[];
  assetUrl?: string; // Optional image/asset for the question
  explanation?: string; // Explanation for the correct answer
}

export interface Level {
  id: string;
  topicId: string;
  subjectId: string;
  lessonTitle: string;
  difficultyLevel: number;
  lessonText: string;
  demoInstructions: string;
  quiz: QuizItem[];
}

export interface Topic {
  id: string;
  name: string;
  description?: string;
  subjectId: string;
  // Levels are now primarily identified by difficultyLevel within a subject
}

export interface Subject {
  id: string;
  name: string;
  Icon?: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>; // Allow custom SVGs too
  description: string;
  color?: string; // Optional color for subject card styling
}

export interface UserProgress {
  subjectName: string;
  currentDifficultyLevel: number;
  masteryScore: number;
  badgesEarned: string[];
  completedLevels: number[]; // Store difficultyLevels of completed levels
}

export interface User {
  id: string;
  name: string;
  progress: {
    [subjectId: string]: UserProgress;
  };
}
