'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const childName = localStorage.getItem('childName');
    if (!childName) {
      router.replace('/'); // Redirect to login page
    } else {
      setIsVerified(true);
    }
  }, [router]);

  if (!isVerified) {
    // You can render a loading spinner here
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading your adventure...</p>
      </div>
    );
  }

  return <>{children}</>;
}
