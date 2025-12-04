import * as SecureStore from 'expo-secure-store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { cadastroUsuario, loginUsuario } from '../service/auth';

interface User {
  id: number | string;
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
    // On mount, check SecureStore for token and user info
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('token');
        const nome = await SecureStore.getItemAsync('nome');
        const email = await SecureStore.getItemAsync('email');
        const usuarioId = await SecureStore.getItemAsync('usuarioId');

        if (token) {
          setUser({ id: usuarioId ?? '0', email: email ?? '', name: nome ?? '' });
        }
      } catch (err) {
        console.error('Erro checando SecureStore no AuthProvider:', err);
      } finally {
        setIsPending(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Email e senha são obrigatórios');
    setIsPending(true);
    try {
      const data = await loginUsuario({ email, senha: password });
      // service/auth.js already stores token and some user info in SecureStore
      const usuario = data?.usuario ?? null;
      if (usuario) {
        setUser({ id: usuario.id ?? '0', email: usuario.email ?? email, name: usuario.nome ?? usuario.name ?? '' });
      }
    } catch (err) {
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) throw new Error('Todos os campos são obrigatórios');
    setIsPending(true);
    try {
      await cadastroUsuario({ nome: name, email, senha: password });
      // After successful registration, attempt to log in
      await login(email, password);
    } catch (err) {
      throw err;
    } finally {
      setIsPending(false);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('nome');
      await SecureStore.deleteItemAsync('email');
      await SecureStore.deleteItemAsync('usuarioId');
    } catch (err) {
      console.error('Erro ao limpar SecureStore no logout:', err);
    } finally {
      setUser(null);
    }
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
