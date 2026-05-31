import { useMemo, useState } from 'react';
import {
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  ClipboardList,
  Eye,
  LayoutDashboard,
  Loader2,
  MessageSquareText,
  Plus,
  Send,
  Sparkles,
} from 'lucide-react';
import { generateSurveyDraft } from './api/surveys';
import { initialSurvey, metrics, topThemes } from './data/mockData';
import { QuestionType, SurveyDraft, SurveyQuestion } from './types';

const navItems = [
  { label: 'Workspace', icon: LayoutDashboard },
  { label: 'Builder', icon: Sparkles },
  { label: 'Responses', icon: MessageSquareText },
  { label: 'Analytics', icon: BarChart3 },
];

const questionLabels: Record<QuestionType, string> = {
  rating: 'Rating',
  singleChoice: 'Single choice',
  multiChoice: 'Multi choice',
  text: 'Text',
};

function App() {
  const [survey, setSurvey] = useState<SurveyDraft>(initialSurvey);
  const [goal, setGoal] = useState('Measure product onboarding quality and identify retention risks');
  const [audience, setAudience] = useState('New trial users and recently converted customers');
  const [tone, setTone] = useState('Warm, precise, low-friction');
  const [isGenerating, setIsGenerating] = useState(false);

  const requiredCount = useMemo(
    () => survey.questions.filter((question) => question.required).length,
    [survey.questions],
  );

  async function handleGenerate() {
    setIsGenerating(true);
    const draft = await generateSurveyDraft({ goal, audience, tone });
    setSurvey(draft);
    setIsGenerating(false);
  }

  function addQuestion(type: QuestionType) {
    const question: SurveyQuestion = {
      id: `q-${Date.now()}`,
      type,
      prompt: type === 'text' ? 'What else should we know?' : 'How would you answer this question?',
      required: false,
      options: type === 'singleChoice' || type === 'multiChoice' ? ['Option A', 'Option B', 'Option C'] : undefined,
    };
    setSurvey((current) => ({ ...current, questions: [...current.questions, question] }));
  }

  return (
    <main className="min-h-screen bg-surface text-ink">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="border-b border-ink/10 bg-white lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 py-4 lg:block lg:px-6 lg:py-7">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white">
                  <Bot size={21} />
                </div>
                <div>
                  <p className="text-lg font-semibold">ActovIQ</p>
                  <p className="text-xs text-ink/55">Survey intelligence</p>
                </div>
              </div>
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-lg border border-ink/10 lg:mt-8" aria-label="Create survey">
              <Plus size={18} />
            </button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:px-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = index === 1;
              return (
                <button
                  key={item.label}
                  className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active ? 'bg-ink text-white' : 'text-ink/65 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="flex-1">
          <header className="flex flex-col gap-4 border-b border-ink/10 bg-white px-5 py-5 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">AI survey builder</h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-ink/65">
                Create adaptive surveys, review AI-generated questions, and prepare response collection from one focused workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium">
                <Eye size={16} />
                Preview
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-coral px-3 py-2 text-sm font-semibold text-white shadow-soft">
                <Send size={16} />
                Publish
              </button>
            </div>
          </header>

          <div className="grid gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
            <div className="space-y-6">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-teal">AI prompt</p>
                    <h2 className="mt-1 text-xl font-semibold">Tell ActovIQ what you need to learn</h2>
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    Generate draft
                  </button>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="md:col-span-2">
                    <span className="text-sm font-medium">Survey goal</span>
                    <textarea
                      value={goal}
                      onChange={(event) => setGoal(event.target.value)}
                      className="mt-2 min-h-24 w-full resize-none rounded-lg border border-ink/15 bg-surface px-3 py-3 text-sm outline-none focus:border-teal"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium">Audience</span>
                    <input
                      value={audience}
                      onChange={(event) => setAudience(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-surface px-3 py-3 text-sm outline-none focus:border-teal"
                    />
                  </label>
                  <label>
                    <span className="text-sm font-medium">Tone</span>
                    <input
                      value={tone}
                      onChange={(event) => setTone(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-ink/15 bg-surface px-3 py-3 text-sm outline-none focus:border-teal"
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-teal">Survey draft</p>
                    <h2 className="mt-1 text-xl font-semibold">{survey.title}</h2>
                    <p className="mt-1 text-sm text-ink/60">
                      {survey.questions.length} questions, {requiredCount} required, about {survey.estimatedMinutes} minutes
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['rating', 'singleChoice', 'text'] as QuestionType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => addQuestion(type)}
                        className="inline-flex items-center gap-2 rounded-lg border border-ink/15 px-3 py-2 text-sm font-medium"
                      >
                        <Plus size={15} />
                        {questionLabels[type]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {survey.questions.map((question, index) => (
                    <article key={question.id} className="rounded-lg border border-ink/10 bg-surface p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-ink/65">Q{index + 1}</span>
                            <span className="rounded-md bg-teal/10 px-2 py-1 text-xs font-semibold text-teal">
                              {questionLabels[question.type]}
                            </span>
                            {question.required && (
                              <span className="rounded-md bg-coral/10 px-2 py-1 text-xs font-semibold text-coral">Required</span>
                            )}
                          </div>
                          <p className="mt-3 text-sm font-medium leading-6">{question.prompt}</p>
                        </div>
                        <ChevronRight className="mt-1 shrink-0 text-ink/35" size={18} />
                      </div>
                      {question.options && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {question.options.map((option) => (
                            <span key={option} className="rounded-md border border-ink/10 bg-white px-2.5 py-1 text-xs text-ink/65">
                              {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-teal">Live preview</p>
                    <h2 className="mt-1 text-lg font-semibold">Respondent flow</h2>
                  </div>
                  <ClipboardList size={22} className="text-coral" />
                </div>
                <div className="mt-5 rounded-lg border border-ink/10 bg-surface p-4">
                  <p className="text-sm font-semibold">{survey.title}</p>
                  <p className="mt-1 text-xs leading-5 text-ink/60">{survey.goal}</p>
                  <div className="mt-4 space-y-4">
                    {survey.questions.slice(0, 3).map((question, index) => (
                      <div key={question.id} className="rounded-lg bg-white p-3">
                        <p className="text-xs font-semibold text-ink/45">Question {index + 1}</p>
                        <p className="mt-1 text-sm font-medium leading-5">{question.prompt}</p>
                        <PreviewInput question={question} />
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-3 py-2 text-sm font-semibold text-white">
                    <Check size={16} />
                    Submit response
                  </button>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-teal">Analytics snapshot</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg border border-ink/10 p-3">
                      <p className="text-xs text-ink/55">{metric.label}</p>
                      <p className="mt-1 text-xl font-semibold">{metric.value}</p>
                      <p className="mt-1 text-xs font-medium text-teal">{metric.change}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3">
                  {topThemes.map((theme) => (
                    <div key={theme.theme}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span>{theme.theme}</span>
                        <span className="font-semibold">{theme.share}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink/[0.08]">
                        <div className={`h-2 rounded-full ${theme.color}`} style={{ width: `${theme.share}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function PreviewInput({ question }: { question: SurveyQuestion }) {
  if (question.type === 'rating') {
    return (
      <div className="mt-3 grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button key={value} className="rounded-md border border-ink/10 py-1 text-xs font-semibold">
            {value}
          </button>
        ))}
      </div>
    );
  }

  if (question.type === 'text') {
    return <div className="mt-3 h-16 rounded-md border border-ink/10 bg-surface" />;
  }

  return (
    <div className="mt-3 space-y-2">
      {question.options?.slice(0, 3).map((option) => (
        <div key={option} className="flex items-center gap-2 text-xs text-ink/65">
          <span className="h-3 w-3 rounded-full border border-ink/25" />
          {option}
        </div>
      ))}
    </div>
  );
}

export default App;
