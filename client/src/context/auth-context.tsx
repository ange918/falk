import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, storage, initStorage, UserType } from '@/lib/storage';
import { useLocation } from 'wouter';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  register: (data: Omit<User, 'id' | 'followers' | 'following' | 'isOccupied'>) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    initStorage();
    const storedUser = storage.getCurrentUser();
    if (storedUser) {
      // Refresh user data from main users array to keep sync
      const allUsers = storage.getUsers();
      const freshUser = allUsers.find(u => u.id === storedUser.id);
      setUser(freshUser || null);
    }
  }, []);

  const login = async (email: string) => {
    const users = storage.getUsers();
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      storage.setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const register = async (data: Omit<User, 'id' | 'followers' | 'following' | 'isOccupied'>) => {
    const users = storage.getUsers();
    const newUser: User = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      followers: [],
      following: [],
      isOccupied: false
    };
    
    users.push(newUser);
    storage.setUsers(users);
    
    setUser(newUser);
    storage.setCurrentUser(newUser);
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
    setLocation('/');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    storage.setCurrentUser(updatedUser);
    
    // Also update in main users list
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      storage.setUsers(users);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
