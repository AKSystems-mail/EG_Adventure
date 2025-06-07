'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProgress } from '@/lib/types';
import { getLowestDifficultyLevel, getNextDifficultyLevel as getNextContentDifficultyLevel } from '@/lib/content';

const getUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  const childName = localStorage.getItem('childName');
  return childName ? childName.toLowerCase().replace(/\s+/g, '') + '_dummy_id' : null;
};

export function useProgress(subjectId: string) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(() => {
    setIsLoading(true);
    const userId = getUserId();
    if (!userId) {
      setError("User not identified.");
      setIsLoading(false);
      return;
    }

    try {
      const allProgressData = JSON.parse(localStorage.getItem(`userProgress_${userId}`) || '{}');
      let subjectProgress = allProgressData[subjectId];

      if (!subjectProgress) {
        const lowestDifficulty = getLowestDifficultyLevel(subjectId);
        if (lowestDifficulty === null) {
          // This case means there's no content for the subject, which is an issue
          // For now, let's default to a common starting point or handle error
          console.warn(`No levels found for subject ${subjectId}, defaulting difficulty.`);
           subjectProgress = {
            subjectName: subjectId, // Or fetch subject name from content.ts
            currentDifficultyLevel: 101, // Fallback if no levels
            masteryScore: 0,
            badgesEarned: [],
            completedLevels: [],
          };
        } else {
           subjectProgress = {
            subjectName: subjectId,
            currentDifficultyLevel: lowestDifficulty,
            masteryScore: 0,
            badgesEarned: [],
            completedLevels: [],
          };
        }
        allProgressData[subjectId] = subjectProgress;
        localStorage.setItem(`userProgress_${userId}`, JSON.stringify(allProgressData));
      }
      setProgress(subjectProgress);
      setError(null);
    } catch (e) {
      console.error("Failed to load or initialize progress:", e);
      setError("Failed to load progress.");
    } finally {
      setIsLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    loadProgress();
  }, [subjectId, loadProgress]);

  const completeLevel = useCallback((completedDifficultyLevel: number) => {
    const userId = getUserId();
    if (!userId || !progress) return;

    const nextDifficulty = getNextContentDifficultyLevel(subjectId, completedDifficultyLevel);
    
    setProgress(prev => {
      if (!prev) return null;
      const updatedProgress: UserProgress = {
        ...prev,
        masteryScore: prev.masteryScore + 10, // Example scoring
        currentDifficultyLevel: nextDifficulty !== null ? nextDifficulty : prev.currentDifficultyLevel, // Stay on last level if no next
        completedLevels: [...new Set([...prev.completedLevels, completedDifficultyLevel])],
      };

      // Add badge logic here if needed, e.g., if completedLevels.length % 5 === 0
      // updatedProgress.badgesEarned.push('new_badge_id');

      const allProgressData = JSON.parse(localStorage.getItem(`userProgress_${userId}`) || '{}');
      allProgressData[subjectId] = updatedProgress;
      localStorage.setItem(`userProgress_${userId}`, JSON.stringify(allProgressData));
      
      return updatedProgress;
    });
     // If nextDifficulty is null, it means it's the last level.
    return nextDifficulty !== null; // Return true if there's a next level, false otherwise
  }, [subjectId, progress]);

  return { progress, isLoading, error, completeLevel, reloadProgress: loadProgress };
}
