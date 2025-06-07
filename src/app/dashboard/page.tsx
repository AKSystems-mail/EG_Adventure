'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSubjects } from '@/lib/content';
import type { Subject } from '@/lib/types';
import Image from 'next/image';

export default function DashboardPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [childName, setChildName] = useState<string | null>(null);

  useEffect(() => {
    setSubjects(getSubjects());
    const name = localStorage.getItem('childName');
    setChildName(name);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold">
          Hello, {childName || 'Adventurer'}!
        </h1>
        <p className="text-xl text-muted-foreground mt-2">Choose a subject to start your quest!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${subject.color || 'bg-card'} text-card-foreground flex flex-col`}>
            <CardHeader className="flex-grow">
              <div className="flex items-center gap-4 mb-2">
                {subject.Icon && <subject.Icon size={40} className="text-primary" />}
                <CardTitle className="text-2xl font-headline">{subject.name}</CardTitle>
              </div>
              <CardDescription className="text-foreground/80 min-h-[3em]">{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/learn/${subject.id}`} passHref>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3">
                  Explore {subject.name}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-10 p-6 bg-secondary text-secondary-foreground shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="https://placehold.co/300x200.png" alt="Achievements" width={150} height={100} className="rounded-lg shadow-md" data-ai-hint="adventure map" />
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-2">Your Adventure Map</h2>
            <p className="mb-4">Track your progress, earn badges, and see how far you've come!</p>
            <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary">View My Progress (Coming Soon!)</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
