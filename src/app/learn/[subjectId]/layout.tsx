import AuthGuard from '@/components/auth/AuthGuard';
import type { ReactNode } from 'react';

export default function LearnSubjectLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
