<div align="center">
<img width="1475" height="859" alt="image" src="https://github.com/user-attachments/assets/a5f36df8-4445-4bc9-945d-05d3aa8f3c63" />

</div>

# Meghan – Empathy-First Student Wellness Assistant

A digital companion designed for university students to intervene in 'silent spirals' using sensory-first grounding, proactive triage, and habit-emotional correlation.

View your app - https://meghan-theta.vercel.app/

## Problem It Solves

University students (18-24) often experience mental health challenges but struggle to seek help, falling into "silent spirals" of stress, anxiety, and isolation. Meghan addresses this by:

- **Proactive Intervention**: Identifies students in distress through mood and stress source triage before they reach crisis
- **Non-Judgmental Support**: Provides a safe, empathetic space modeled after a supportive older sibling figure
- **Accessible Wellness Tools**: Offers practical, micro-action based tools that fit into busy student schedules
- **Risk Assessment**: Categorizes users into Green/Yellow/Red tiers to provide appropriate support levels
- **Breaking Isolation**: Connects students with peer communities facing similar challenges

## How It Works

### 1. **Onboarding & Triage**
   - Users start by selecting their current mood (Heavy/Sad, Pulse/Anxious, or Grounded/Calm)
   - Identify primary stress source: Academics, Relationships, Family, or Others
   - Optional detailed sharing of feelings and experiences
   - System assesses risk tier (Green/Yellow/Red) based on mood and responses

### 2. **Empathy-First Chat Interface**
   - AI-powered conversation using Google Gemini API
   - Personalized responses based on user bio (name, major, hobbies, values)
   - Maintains a calm, protective "older sibling" tone
   - Provides exactly one micro-action suggestion per response
   - Crisis detection: Identifies high-risk keywords and gently encourages professional help when needed

### 3. **Wellness Tools**
   - **Pomodoro Timer**: Focus sessions with XP rewards
   - **Sound Therapy**: Ambient sounds for relaxation
   - **Small Promises**: Daily micro-tasks (e.g., "Drink a glass of water")
   - **Daily Reminders**: Personalized motivational messages
   - **Dashboard**: Tracks wellness metrics (steps, sleep, sessions, XP, level)

### 4. **Gamification & Engagement**
   - XP system for completing activities and sharing thoughts
   - Level progression (Growth Phases) based on XP accumulation
   - Empathy points for community engagement
   - Leaderboard for healthy competition and motivation

### 5. **Community Features**
   - **Peer Clusters**: Join support groups based on stress sources
   - **Leaderboard**: See community progress and achievements
   - **Knowledge Center**: Personalize your profile to improve AI responses

### 6. **Personalization**
   - Stores user bio information (name, major, hobbies, values, future vision)
   - AI uses this context to provide more relevant, personalized support
   - Adapts responses based on current mood and stress source

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and set your Gemini API key:
   ```bash
   API_KEY="your-gemini-api-key-here"
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (@google/genai)
- **Icons**: Lucide React
- **Charts**: Recharts

## Features

- 🎯 Proactive mental health triage
- 💬 Empathy-first AI chat interface
- 🎮 Gamification with XP and levels
- 🧘 Wellness tools (Pomodoro, Sound Therapy, Small Promises)
- 👥 Peer clusters and community features
- 📊 Personal wellness dashboard
- 🎨 Beautiful, modern UI with glassmorphism design
