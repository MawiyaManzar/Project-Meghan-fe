
export enum Mood {
  SAD = 'Heavy',
  ANXIOUS = 'Pulse',
  CALM = 'Grounded'
}

export enum RiskTier {
  GREEN = 'Green',
  YELLOW = 'Yellow',
  RED = 'Red'
}

export enum StressSource {
  FAMILY = 'Family',
  RELATIONSHIP = 'Relationship',
  ACADEMICS = 'Career/Academics',
  OTHERS = 'Others'
}

export interface UserBio {
  name: string;
  major: string;
  hobbies: string;
  values: string;
  dailyReminder?: string;
  futureVision?: string;
}

export interface SmallPromise {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserState {
  mood: Mood;
  source: StressSource;
  otherText?: string;
  tier: RiskTier;
  steps: number;
  sleepHours: number;
  pomoSessions: number;
  soundSessions: number;
  reminderSaved: boolean;
  xp: number;
  level: number;
  empathyPoints: number;
  bio: UserBio;
  promises: SmallPromise[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  level: number;
  xp: number;
  empathyPoints?: number;
  isUser?: boolean;
}
