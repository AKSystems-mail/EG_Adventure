import type { Level } from '@/lib/types';
import SpeakerButton from './SpeakerButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface DemoViewProps {
  level: Level;
}

const DemoView: React.FC<DemoViewProps> = ({ level }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl font-headline text-primary">Try it Out!</CardTitle>
          <SpeakerButton textToSpeak={level.demoInstructions} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed">{level.demoInstructions}</p>
        {/* Placeholder for interactive demo elements */}
        <div className="bg-muted p-6 rounded-lg text-center min-h-[200px] flex items-center justify-center">
            <Image src="https://placehold.co/400x250.png" alt="Interactive Demo Placeholder" width={400} height={250} className="rounded-md" data-ai-hint="interactive game" />
        </div>
        <p className="text-sm text-muted-foreground">Imagine you can click and drag things here to learn!</p>
      </CardContent>
    </Card>
  );
};

export default DemoView;
