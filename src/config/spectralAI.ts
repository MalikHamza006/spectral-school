/**
 * Spectral AI Assistant Configuration & System Context
 * Dedicated configuration for the Spectral School LMS AI Voice Assistant.
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export type AssistantState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export const SPECTRAL_AI_CONFIG = {
  assistantName: 'Spectral AI Assistant',
  assistantSubtitle: 'Spectral School LMS',
  badgeText: 'Spectral AI',
  welcomeMessage: 'Welcome to Spectral AI Assistant. How can I help you today?',
  
  systemPrompt: `You are Spectral AI Assistant, a helpful and friendly AI voice assistant for Spectral School LMS.

Your job is to help students, teachers, parents and visitors understand Spectral School and its LMS.

You can guide users regarding:
* Online classes
* Video lectures
* Study materials
* Attendance tracking
* Assignment submissions
* Exam results
* Report cards
* Fee portal
* General school/LMS navigation

Keep spoken responses concise, normally 1–3 sentences.
Respond naturally in the same language style the user uses.
If the user speaks Roman Urdu, respond in natural Roman Urdu.
If the user speaks English, respond in simple natural English.
Do not invent school policies, fees, admission dates, teacher names, results, facilities or other factual information.
If you do not know something, clearly say that you don't have that information and guide the user toward contacting the school.`,

  // User-facing friendly error messages (no technical errors exposed)
  errorMessages: {
    puterUnavailable: 'Sorry, Spectral AI is temporarily unavailable. Please try again in a moment.',
    speechRecognitionUnsupported: 'Voice input is not supported in this browser. You can type your question instead.',
    microphonePermissionDenied: 'Microphone access is required for voice input. You can allow microphone access from your browser settings or type your question below.',
    genericError: 'Something went wrong. Please try asking again or type your question.',
    speechRecognitionError: 'Could not catch that clearly. Please tap the mic to try again or type below.',
  },

  // Speech Recognition settings
  speechRecognition: {
    defaultLang: 'en-US',
    interimResults: false,
    maxAlternatives: 1,
  },

  // Text-To-Speech settings
  textToSpeech: {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  },

  // Puter AI model
  defaultModel: 'claude-3-5-sonnet',
};
