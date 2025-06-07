import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <GraduationCap size={32} />
          <h1 className="text-2xl font-headline font-bold">Emma Grace's Adventure</h1>
        </Link>
        {/* Navigation items can be added here if needed */}
      </div>
    </header>
  );
};

export default AppHeader;
