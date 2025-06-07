import type { Subject, Topic, Level, QuizItem } from './types';
import { Calculator, BookOpenText, Globe, FlaskConical, Puzzle, Award, Star, Medal } from 'lucide-react';

const subjectsData: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    Icon: Calculator,
    description: 'Explore numbers, shapes, and problem-solving!',
    color: 'bg-blue-500',
  },
  {
    id: 'language-arts',
    name: 'Language Arts',
    Icon: BookOpenText,
    description: 'Discover reading, writing, and storytelling.',
    color: 'bg-green-500',
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    Icon: Globe,
    description: 'Learn about people, places, and history.',
    color: 'bg-yellow-500',
  },
  {
    id: 'science',
    name: 'Science',
    Icon: FlaskConical,
    description: 'Uncover the wonders of the natural world.',
    color: 'bg-purple-500',
  },
  {
    id: 'stem-bonus',
    name: 'STEM Bonus',
    Icon: Puzzle,
    description: 'Special challenges integrating all subjects!',
    color: 'bg-red-500',
  },
];

const topicsData: Topic[] = [
  // Math Topics
  { id: 'math-counting', name: 'Counting Fun', subjectId: 'math', description: 'Learn to count objects up to 20.' },
  { id: 'math-addition', name: 'Simple Addition', subjectId: 'math', description: 'Adding small numbers together.' },
  { id: 'math-shapes', name: 'Fun with Shapes', subjectId: 'math', description: 'Identifying common shapes.'},

  // Language Arts Topics
  { id: 'la-alphabet', name: 'The Alphabet', subjectId: 'language-arts', description: 'Learning letters and their sounds.' },
  { id: 'la-sightwords', name: 'Sight Words', subjectId: 'language-arts', description: 'Recognizing common words quickly.' },

  // Placeholder topics for other subjects
  { id: 'ss-community', name: 'Our Community', subjectId: 'social-studies', description: 'Learning about community helpers.'},
  { id: 'sci-plants', name: 'Amazing Plants', subjectId: 'science', description: 'How do plants grow?'},
  { id: 'stem-bridge', name: 'Bridge Building Challenge', subjectId: 'stem-bonus', description: 'A fun STEM challenge!'}
];

const levelsData: Level[] = [
  // Math Levels
  {
    id: 'math-count-1',
    topicId: 'math-counting',
    subjectId: 'math',
    lessonTitle: 'Counting Apples (1-5)',
    difficultyLevel: 101,
    lessonText: 'Hi there! Today, we will learn to count apples. Look at the pretty red apples! Can you count them with me? One, two, three, four, five!',
    demoInstructions: 'Tap on each apple to count it. A number will appear!',
    quiz: [
      {
        id: 'q1_101',
        questionText: 'How many apples are in this picture?',
        questionType: 'multiple_choice',
        assetUrl: 'https://placehold.co/300x200.png',
        options: [
          { text: '3', isCorrect: false },
          { text: '5', isCorrect: true },
          { text: '2', isCorrect: false },
        ],
        explanation: 'Great job! There are 5 shiny apples.'
      },
    ],
  },
  {
    id: 'math-add-1',
    topicId: 'math-addition',
    subjectId: 'math',
    lessonTitle: 'Adding Small Numbers (1+1, 1+2)',
    difficultyLevel: 102,
    lessonText: 'Adding is like putting groups together. If you have 1 apple and get 1 more, how many do you have? That\'s 1 + 1 = 2 apples! What if you have 1 apple and get 2 more? That\'s 1 + 2 = 3 apples!',
    demoInstructions: 'Drag the groups of stars together to see the total.',
    quiz: [
      {
        id: 'q1_102',
        questionText: 'What is 1 + 2?',
        questionType: 'multiple_choice',
        options: [
          { text: '2', isCorrect: false },
          { text: '3', isCorrect: true },
          { text: '4', isCorrect: false },
        ],
        explanation: 'You got it! 1 star plus 2 stars makes 3 stars.'
      },
    ],
  },
   {
    id: 'math-shapes-1',
    topicId: 'math-shapes',
    subjectId: 'math',
    lessonTitle: 'Circles and Squares',
    difficultyLevel: 103,
    lessonText: 'Shapes are all around us! A circle is round like a ball. A square has four equal sides. Can you find a circle and a square in your room?',
    demoInstructions: 'Tap the circle. Now tap the square!',
    quiz: [
      {
        id: 'q1_103',
        questionText: 'Which shape is a circle?',
        questionType: 'multiple_choice',
        assetUrl: 'https://placehold.co/300x200.png', // Image showing a circle and a square
        options: [
          { text: 'Shape A (Circle)', isCorrect: true },
          { text: 'Shape B (Square)', isCorrect: false },
        ],
        explanation: 'Correct! A circle is perfectly round.'
      },
    ],
  },

  // Language Arts Levels
  {
    id: 'la-alpha-1',
    topicId: 'la-alphabet',
    subjectId: 'language-arts',
    lessonTitle: 'Letter A',
    difficultyLevel: 101,
    lessonText: 'This is the letter A! A is for apple and ant. Can you say "A"?',
    demoInstructions: 'Trace the letter A with your finger on the screen.',
    quiz: [
      {
        id: 'q1_la_101',
        questionText: 'Which word starts with A?',
        questionType: 'multiple_choice',
        options: [
          { text: 'Cat', isCorrect: false },
          { text: 'Apple', isCorrect: true },
          { text: 'Dog', isCorrect: false },
        ],
        explanation: 'That\'s right! Apple starts with A.'
      },
    ],
  },
  {
    id: 'la-sight-1',
    topicId: 'la-sightwords',
    subjectId: 'language-arts',
    lessonTitle: 'The Word "The"',
    difficultyLevel: 102,
    lessonText: 'This is the word "the". We use it a lot! Like "the cat" or "the sun". Let\'s practice reading it!',
    demoInstructions: 'Tap the word "the" every time you see it in the sentences.',
    quiz: [
      {
        id: 'q1_la_102',
        questionText: 'Find the word "the": the quick brown fox.',
        questionType: 'multiple_choice',
        options: [
          { text: 'quick', isCorrect: false },
          { text: 'the', isCorrect: true },
          { text: 'fox', isCorrect: false },
        ],
        explanation: 'Excellent! You found "the".'
      },
    ],
  },
  // Placeholder levels for other subjects
  {
    id: 'ss-comm-1',
    topicId: 'ss-community',
    subjectId: 'social-studies',
    lessonTitle: 'Firefighters',
    difficultyLevel: 101,
    lessonText: 'Firefighters are brave helpers in our community. They put out fires and help people.',
    demoInstructions: 'Tap the firefighter to see their cool truck!',
    quiz: [{ id: 'q1_ss_101', questionText: 'What do firefighters help with?', questionType: 'multiple_choice', options: [{text: 'Baking cakes', isCorrect: false}, {text: 'Putting out fires', isCorrect: true}], explanation: 'Yes, firefighters put out fires!'}]
  },
  {
    id: 'sci-plants-1',
    topicId: 'sci-plants',
    subjectId: 'science',
    lessonTitle: 'Parts of a Plant',
    difficultyLevel: 101,
    lessonText: 'Plants have roots, a stem, and leaves. Roots help them drink water from the ground!',
    demoInstructions: 'Match the part of the plant to its name.',
    quiz: [{ id: 'q1_sci_101', questionText: 'Which part helps a plant drink water?', questionType: 'multiple_choice', options: [{text: 'Leaves', isCorrect: false}, {text: 'Roots', isCorrect: true}], explanation: 'Correct! Roots help plants drink.'}]
  },
  {
    id: 'stem-bonus-1',
    topicId: 'stem-bridge',
    subjectId: 'stem-bonus',
    lessonTitle: 'Build a Strong Bridge!',
    difficultyLevel: 101, // STEM bonus levels can also have difficulty
    lessonText: 'Let\'s use shapes we learned in Math and ideas about strong structures from Science to design a bridge!',
    demoInstructions: 'Try different shapes to see which makes the strongest bridge base.',
    quiz: [{ id: 'q1_stem_101', questionText: 'Which shape is often strong for building?', questionType: 'multiple_choice', options: [{text: 'A wiggly line', isCorrect: false}, {text: 'A triangle', isCorrect: true}], explanation: 'Triangles are super strong shapes for building!'}]
  },
];

export const getSubjects = (): Subject[] => subjectsData;

export const getSubjectById = (id: string): Subject | undefined =>
  subjectsData.find((s) => s.id === id);

export const getTopicsForSubject = (subjectId: string): Topic[] =>
  topicsData.filter((t) => t.subjectId === subjectId);
  
export const getTopicById = (id: string): Topic | undefined =>
  topicsData.find((t) => t.id === id);

export const getLevelByDifficulty = (subjectId: string, difficultyLevel: number): Level | undefined =>
  levelsData.find(
    (l) => l.subjectId === subjectId && l.difficultyLevel === difficultyLevel
  );

export const getNextDifficultyLevel = (subjectId: string, currentDifficulty: number): number | null => {
  const subjectLevels = levelsData
    .filter(l => l.subjectId === subjectId)
    .sort((a, b) => a.difficultyLevel - b.difficultyLevel);
  
  const currentIndex = subjectLevels.findIndex(l => l.difficultyLevel === currentDifficulty);
  
  if (currentIndex !== -1 && currentIndex < subjectLevels.length - 1) {
    return subjectLevels[currentIndex + 1].difficultyLevel;
  }
  return null; // No more levels or current difficulty not found
};

export const getLowestDifficultyLevel = (subjectId: string): number | null => {
  const subjectLevels = levelsData
    .filter(l => l.subjectId === subjectId)
    .sort((a, b) => a.difficultyLevel - b.difficultyLevel);
  return subjectLevels.length > 0 ? subjectLevels[0].difficultyLevel : null;
}

export const achievementBadges = [
  { id: 'math_master_1', name: 'Math Whiz Kid', Icon: Award, description: 'Completed 5 math levels!' },
  { id: 'reading_star_1', name: 'Reading Star', Icon: Star, description: 'Mastered 10 sight words!' },
  { id: 'science_explorer_1', name: 'Science Explorer', Icon: Medal, description: 'Finished the plants unit!'}
];

// Helper for AI Tutor content retrieval
export const getContentForTopicId = (topicId: string): string => {
  const topic = getTopicById(topicId);
  if (!topic) return "Topic not found.";

  const relatedLevels = levelsData.filter(level => level.topicId === topicId);
  
  let content = `Topic: ${topic.name}\nDescription: ${topic.description || ''}\n\n`;

  relatedLevels.forEach(level => {
    content += `Lesson: ${level.lessonTitle}\nText: ${level.lessonText}\nDemo: ${level.demoInstructions}\n`;
    level.quiz.forEach(q => {
      content += `Quiz Question: ${q.questionText}\n`;
      if (q.questionType === 'multiple_choice') {
        content += `Options: ${q.options.map(opt => opt.text).join(', ')}\n`;
        const correctAnswer = q.options.find(opt => opt.isCorrect)?.text;
        content += `Correct Answer: ${correctAnswer}\nExplanation: ${q.explanation}\n`;
      }
    });
    content += '\n';
  });

  return content;
};

// This is a mock, in a real app this would call the AI flow.
export const emmaGraceTutorMock = async (topicId: string, predefinedQuestion: string): Promise<{answer: string}> => {
  const context = getContentForTopicId(topicId);
  // Simplified mock logic
  if (predefinedQuestion.toLowerCase().includes("explain")) {
    const lessonText = levelsData.find(l => l.topicId === topicId)?.lessonText;
    return { answer: `Okay, let me try to explain that part of the lesson again! ${lessonText || 'Let me see...'} Remember, we were talking about...` };
  }
  if (predefinedQuestion.toLowerCase().includes("why")) {
    const quizItem = levelsData.find(l => l.topicId === topicId)?.quiz[0];
    return { answer: `That's a good question! The answer is like that because... ${quizItem?.explanation || 'it just is for now! We can learn more later.'}` };
  }
  return { answer: "I'm here to help! What part are you curious about from our lesson?" };
};
