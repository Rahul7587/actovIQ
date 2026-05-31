import { InsightMetric, SurveyDraft } from '../types';

export const initialSurvey: SurveyDraft = {
  id: 'survey-product-feedback',
  title: 'Product Experience Pulse',
  audience: 'Active SaaS customers',
  goal: 'Understand onboarding friction, core feature value, and expansion intent.',
  tone: 'Clear, respectful, concise',
  estimatedMinutes: 4,
  questions: [
    {
      id: 'q1',
      type: 'rating',
      prompt: 'How easy was it to get value from ActovIQ during your first week?',
      required: true,
    },
    {
      id: 'q2',
      type: 'singleChoice',
      prompt: 'Which part of the product feels most valuable right now?',
      required: true,
      options: ['AI survey creation', 'Response collection', 'Analytics', 'Team collaboration'],
    },
    {
      id: 'q3',
      type: 'multiChoice',
      prompt: 'Where should we improve next?',
      required: false,
      options: ['Templates', 'Question recommendations', 'Dashboards', 'Exports', 'Integrations'],
    },
    {
      id: 'q4',
      type: 'text',
      prompt: 'What is one change that would make ActovIQ more useful for your team?',
      required: false,
    },
  ],
};

export const metrics: InsightMetric[] = [
  { label: 'Completion rate', value: '78%', change: '+9.4%' },
  { label: 'Avg. response time', value: '3m 12s', change: '-18s' },
  { label: 'Sentiment score', value: '8.2', change: '+0.7' },
  { label: 'AI quality flags', value: '14', change: '-21%' },
];

export const topThemes = [
  { theme: 'Onboarding clarity', share: 38, color: 'bg-teal' },
  { theme: 'Better reporting', share: 27, color: 'bg-coral' },
  { theme: 'More templates', share: 21, color: 'bg-gold' },
  { theme: 'Integrations', share: 14, color: 'bg-ink' },
];
