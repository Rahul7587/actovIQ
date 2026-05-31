export type QuestionType = 'rating' | 'singleChoice' | 'multiChoice' | 'text';

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  required: boolean;
  options?: string[];
}

export interface SurveyDraft {
  id: string;
  title: string;
  audience: string;
  goal: string;
  tone: string;
  estimatedMinutes: number;
  questions: SurveyQuestion[];
}

export interface InsightMetric {
  label: string;
  value: string;
  change: string;
}
