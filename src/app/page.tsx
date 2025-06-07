'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [name, setName] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // To prevent flash of login page if already logged in

  useEffect(() => {
    const storedName = localStorage.getItem('childName');
    if (storedName) {
      router.replace('/dashboard'); 
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('childName', name.trim());
      router.push('/dashboard');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <GraduationCap size={48} />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to Emma's EduVenture!</CardTitle>
          <CardDescription className="text-md">Let's start your learning journey!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="childName" className="text-lg">What's your first name, adventurer?</Label>
              <Input
                id="childName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Alex"
                required
                className="h-12 text-lg"
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
              Start Learning!
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
