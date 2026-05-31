import { SurveyDraft } from '../types';
import { initialSurvey } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export interface GenerateSurveyRequest {
  goal: string;
  audience: string;
  tone: string;
}

export async function generateSurveyDraft(request: GenerateSurveyRequest): Promise<SurveyDraft> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/survey-draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Draft request failed');
    }

    return await response.json();
  } catch {
    return {
      ...initialSurvey,
      id: `local-${Date.now()}`,
      title: request.goal ? `${request.goal} Survey` : initialSurvey.title,
      audience: request.audience || initialSurvey.audience,
      goal: request.goal || initialSurvey.goal,
      tone: request.tone || initialSurvey.tone,
    };
  }
}
