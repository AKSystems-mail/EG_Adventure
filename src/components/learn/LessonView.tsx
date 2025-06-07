import type { Level } from '@/lib/types';
import SpeakerButton from './SpeakerButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface LessonViewProps {
  level: Level;
}

const LessonView: React.FC<LessonViewProps> = ({ level }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-headline text-primary">{level.lessonTitle}</CardTitle>
          <SpeakerButton textToSpeak={`${level.lessonTitle}. ${level.lessonText}`} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed whitespace-pre-line">{level.lessonText}</p>
        {/* Placeholder for lesson-specific image/animation */}
        <div className="flex justify-center my-4">
            <Image src="https://placehold.co/600x300.png" alt={level.lessonTitle} width={600} height={300} className="rounded-lg shadow-md" data-ai-hint="education children" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonView;
