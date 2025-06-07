'use client';

import { Sparkles, PartyPopper, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CelebrationProps {
  message: string;
  onComplete?: () => void;
  duration?: number; // in milliseconds
}

const Celebration: React.FC<CelebrationProps> = ({ message, onComplete, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  if (!visible) return null;

  // Generate random positions for sparkles
  const numSparkles = 20;
  const sparkles = Array.from({ length: numSparkles }).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 0.5}s`,
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
      color: ['hsl(var(--primary))', 'hsl(var(--accent))', '#FFD700'][Math.floor(Math.random()*3)]
    }
  }));


  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background p-8 rounded-xl shadow-2xl text-center relative overflow-hidden max-w-md w-full">
        {/* Sparkles background effect */}
        {sparkles.map(sparkle => (
          <Sparkles
            key={sparkle.id}
            className="absolute animate-firework opacity-0"
            style={sparkle.style}
            size={Math.random() * 20 + 20}
            strokeWidth={1.5}
          />
        ))}
        
        <PartyPopper size={64} className="mx-auto text-accent mb-4 animate-bounce" />
        <h2 className="text-3xl font-headline font-bold text-primary mb-3">
          {message}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">You're doing an amazing job!</p>
        <div className="flex justify-center">
            <CheckCircle size={48} className="text-green-500 animate-pulse"/>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
