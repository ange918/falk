import { useState, useEffect } from 'react';

// Types
export type UserType = 'stylist' | 'young_stylist';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  type: UserType;
  bio: string;
  avatar: string;
  followers: string[];
  following: string[];
  contractWith?: string | null; // ID of the other party
  isOccupied: boolean;
}

export interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  likes: string[]; // User IDs
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface Contract {
  id: string;
  stylistId: string;
  youngStylistId: string;
  status: 'active' | 'terminated';
  startDate: string;
}

// Initial Mock Data
const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'AnnaWintourClone',
    email: 'anna@fashion.com',
    type: 'stylist',
    bio: 'Senior Stylist at Vogue Paris. Looking for fresh talent.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    followers: ['u2', 'u3'],
    following: ['u2'],
    isOccupied: false
  },
  {
    id: 'u2',
    username: 'JeanPaul',
    email: 'jean@design.com',
    type: 'young_stylist',
    bio: 'Avant-garde enthusiast. Recent graduate from CSM.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    followers: ['u1'],
    following: ['u1'],
    isOccupied: false
  },
  {
    id: 'u3',
    username: 'CocoNew',
    email: 'coco@paris.com',
    type: 'young_stylist',
    bio: 'Minimalism is key. Less is more.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    followers: [],
    following: [],
    isOccupied: true,
    contractWith: 'u4' // Simulated existing contract
  },
  {
    id: 'u4',
    username: 'KarlLegacy',
    email: 'karl@brand.com',
    type: 'stylist',
    bio: 'Continuing the legacy.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    followers: [],
    following: [],
    isOccupied: false
  }
];

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u2',
    imageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&h=800&fit=crop',
    caption: 'New collection preview #darkmode',
    likes: ['u1'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2',
    userId: 'u2',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    caption: 'Textures and layers.',
    likes: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'p3',
    userId: 'u3',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop',
    caption: 'Street style vibe',
    likes: ['u1', 'u4'],
    createdAt: new Date().toISOString()
  }
];

// Storage Keys
const KEYS = {
  USERS: 'fashlink_users',
  POSTS: 'fashlink_posts',
  MESSAGES: 'fashlink_messages',
  CONTRACTS: 'fashlink_contracts',
  CURRENT_USER: 'fashlink_current_user'
};

// Helper to initialize storage
export const initStorage = () => {
  if (!localStorage.getItem(KEYS.USERS)) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(MOCK_USERS));
  }
  if (!localStorage.getItem(KEYS.POSTS)) {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(MOCK_POSTS));
  }
  if (!localStorage.getItem(KEYS.CONTRACTS)) {
    // Initial contract for u3 and u4
    const initialContract: Contract = {
      id: 'c1',
      stylistId: 'u4',
      youngStylistId: 'u3',
      status: 'active',
      startDate: new Date().toISOString()
    };
    localStorage.setItem(KEYS.CONTRACTS, JSON.stringify([initialContract]));
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
  }
};

// Storage Accessors
export const storage = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  setUsers: (users: User[]) => localStorage.setItem(KEYS.USERS, JSON.stringify(users)),
  
  getPosts: (): Post[] => JSON.parse(localStorage.getItem(KEYS.POSTS) || '[]'),
  setPosts: (posts: Post[]) => localStorage.setItem(KEYS.POSTS, JSON.stringify(posts)),
  
  getMessages: (): Message[] => JSON.parse(localStorage.getItem(KEYS.MESSAGES) || '[]'),
  setMessages: (msgs: Message[]) => localStorage.setItem(KEYS.MESSAGES, JSON.stringify(msgs)),
  
  getContracts: (): Contract[] => JSON.parse(localStorage.getItem(KEYS.CONTRACTS) || '[]'),
  setContracts: (contracts: Contract[]) => localStorage.setItem(KEYS.CONTRACTS, JSON.stringify(contracts)),

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.CURRENT_USER);
  }
};
