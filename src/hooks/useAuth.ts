import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  childName: string | null;
  userId: string | null;
  login: (name: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [childName, setChildName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('childName');
    if (storedName) {
      setChildName(storedName);
      setUserId(storedName.toLowerCase().replace(/\s+/g, '') + '_dummy_id');
    }
    setIsLoading(false);
  }, []);

  const login = (name: string) => {
    localStorage.setItem('childName', name);
    setChildName(name);
    setUserId(name.toLowerCase().replace(/\s+/g, '') + '_dummy_id');
    router.push('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('childName');
    setChildName(null);
    setUserId(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ childName, userId, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
