
import { RiskTier, UserBio, LeaderboardEntry, StressSource } from './types';

export const SYSTEM_INSTRUCTIONS = (tier: RiskTier, mood: string, source: string, bio: UserBio) => `
You are Meghan, an "Older Sibling" figure—calm, protective, and non-judgmental.
The user is a university student (18-24).

User Knowledge (Personalize your response using this if available):
- Name: ${bio.name || 'Friend'}
- Major/Studies: ${bio.major || 'Unknown'}
- Hobbies: ${bio.hobbies || 'Unknown'}
- Core Values: ${bio.values || 'Unknown'}

Current Context:
- User's Mood: ${mood}
- Primary Stressor: ${source}
- Risk Tier: ${tier}

Guidelines:
1. Always maintain a soothing, supportive "older sibling" tone.
2. Use the User's bio information naturally to show you "know" them (e.g., if they are a CS major, you might mention screen fatigue).
3. If tier is RED: Prioritize safety. Gently encourage professional help while providing grounding.
4. CRITICAL: Suggest exactly ONE small micro-action task per reply. Never more than one. 
5. Identify clearly as a grounding tool, not a medical professional.
`;

export const CRISIS_KEYWORDS = ["hopeless", "hurt", "kill", "suicide", "end it", "worthless", "pain", "empty"];

export const PEER_CLUSTERS = [
  { 
    id: '1', 
    source: StressSource.ACADEMICS,
    name: 'Sanctuary of Scholars', 
    description: 'A quiet space for those navigating the weight of expectations and the search for their path.', 
    members: 124 
  },
  { 
    id: '2', 
    source: StressSource.RELATIONSHIP,
    name: 'The Empathy Grove', 
    description: 'Connecting with others to find balance in our bonds and peace in our interactions.', 
    members: 89 
  },
  { 
    id: '3', 
    source: StressSource.FAMILY,
    name: 'The Roots Room', 
    description: 'Exploring the complexities of where we come from while growing into who we are.', 
    members: 312 
  },
  { 
    id: '4', 
    source: StressSource.OTHERS,
    name: 'The Horizon Glade', 
    description: 'A dedicated space for processing life’s many unexpected turns and finding a steady rhythm.', 
    members: 540 
  },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "QuietSage", level: 12, xp: 2450 },
  { rank: 2, name: "SteadyPulse", level: 10, xp: 2100 },
  { rank: 3, name: "BraveWillow", level: 9, xp: 1950 },
  { rank: 4, name: "CalmRiver", level: 7, xp: 1540 },
  { rank: 5, name: "OakHeart", level: 6, xp: 1320 },
];
