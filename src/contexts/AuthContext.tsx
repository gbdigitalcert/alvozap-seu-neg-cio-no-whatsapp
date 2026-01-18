import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  nomeEstabelecimento: string;
  nomeResponsavel: string;
  telefone: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  nomeEstabelecimento: string;
  nomeResponsavel: string;
  email: string;
  telefone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "alvozap_users";
const CURRENT_USER_KEY = "alvozap_current_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { user: User; password: string }> => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    const userRecord = users[email.toLowerCase()];

    if (!userRecord) {
      return { success: false, error: "Email não encontrado" };
    }

    if (userRecord.password !== password) {
      return { success: false, error: "Senha incorreta" };
    }

    setUser(userRecord.user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));
    return { success: true };
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    const emailKey = data.email.toLowerCase();

    if (users[emailKey]) {
      return { success: false, error: "Este email já está cadastrado" };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      nomeEstabelecimento: data.nomeEstabelecimento,
      nomeResponsavel: data.nomeResponsavel,
      telefone: data.telefone,
    };

    users[emailKey] = {
      user: newUser,
      password: data.password,
    };

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
