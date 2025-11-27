import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // Mock: simular verificação de sessão existente
    // Em produção, isto verificaria um token válido via API
    setTimeout(() => {
      setIsPending(false);
    }, 500);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock: simular login bem-sucedido
    // Em produção, isto faria uma requisição real à API
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const mockUser: User = {
      id: 1,
      email: email,
      name: email.split('@')[0]
    };

    setUser(mockUser);
    console.log('Login simulado para:', email);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock: simular registro bem-sucedido
    // Em produção, isto faria uma requisição real à API
    if (!email || !password || !name) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const mockUser: User = {
      id: Math.floor(Math.random() * 10000),
      email: email,
      name: name
    };

    setUser(mockUser);
    console.log('Registro simulado para:', email);
  };

  const logout = async () => {
    // Mock: simular logout
    // Em produção, isto faria uma requisição real à API
    setUser(null);
    console.log('Logout simulado');
  };

  return (
    <AuthContext.Provider value={{ user, isPending, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
