import { useMemo, useState } from 'react';
import {
  ArrowRight,
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
  ShieldCheck,
  Sparkles,
  Wand2,
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
  const [showBuilder, setShowBuilder] = useState(false);
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

  if (!showBuilder) {
    return <LandingPage onStart={() => setShowBuilder(true)} />;
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

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      <section className="relative min-h-screen overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,116,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(45,116,255,0.12)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,rgba(5,7,13,1),rgba(5,7,13,0))]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2d74ff] text-white">
              <Bot size={21} />
            </div>
            <div>
              <p className="text-lg font-semibold">ActovIQ</p>
              <p className="text-xs text-white/50">AI survey intelligence</p>
            </div>
          </div>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open builder
            <ArrowRight size={16} />
          </button>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] lg:px-8 lg:pb-20 lg:pt-24">
          <div className="flex min-h-[520px] flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2d74ff]/35 bg-[#2d74ff]/10 px-3 py-1 text-sm font-medium text-[#8bb5ff]">
              <Sparkles size={15} />
              AI-native survey creation
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-normal md:text-6xl lg:text-7xl">
              ActovIQ turns messy questions into useful survey insight.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              Build targeted surveys, generate high-quality questions, collect clean responses, and surface decision-ready patterns from one focused workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onStart}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d74ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(45,116,255,0.32)] transition hover:bg-[#4b88ff]"
              >
                Launch builder
                <ArrowRight size={17} />
              </button>
              <a
                href="#workflow"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/8"
              >
                See workflow
              </a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ['4 min', 'draft time'],
                ['78%', 'completion'],
                ['8.2', 'sentiment'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/42">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <div className="absolute inset-y-4 left-10 right-0 rounded-lg border border-white/10 bg-[#080c16]/90 shadow-[0_35px_100px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2d74ff]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#8bb5ff]">Live draft</span>
              </div>
              <div className="grid grid-cols-[190px_1fr]">
                <div className="min-h-[548px] border-r border-white/10 p-5">
                  <div className="h-8 rounded-md bg-white/10" />
                  <div className="mt-8 space-y-3">
                    {['Workspace', 'Builder', 'Responses', 'Analytics'].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-md px-3 py-2 text-sm ${index === 1 ? 'bg-[#2d74ff] text-white' : 'bg-white/[0.04] text-white/55'}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="h-3 w-24 rounded-full bg-[#2d74ff]/60" />
                      <div className="mt-4 h-7 w-72 rounded-md bg-white/15" />
                      <div className="mt-3 h-3 w-96 max-w-full rounded-full bg-white/10" />
                    </div>
                    <button className="rounded-lg bg-[#2d74ff] px-4 py-2 text-sm font-semibold">Generate</button>
                  </div>
                  <div className="mt-8 grid gap-4">
                    {[
                      ['Rating', 'How easy was it to get value during your first week?'],
                      ['Single choice', 'Which product moment felt most useful?'],
                      ['Text', 'What would make this workflow easier?'],
                    ].map(([type, question]) => (
                      <div key={question} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-[#2d74ff]/15 px-2 py-1 text-xs font-semibold text-[#8bb5ff]">{type}</span>
                          <span className="rounded-md bg-white/8 px-2 py-1 text-xs text-white/45">AI refined</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/82">{question}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {['Completion', 'Themes', 'Quality'].map((label, index) => (
                      <div key={label} className="rounded-lg border border-white/10 bg-[#070a12] p-3">
                        <p className="text-xs text-white/45">{label}</p>
                        <div className="mt-3 h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-[#2d74ff]" style={{ width: `${72 - index * 14}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="border-b border-white/10 bg-[#05070d] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#8bb5ff]">Built for teams who need signal</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal md:text-4xl">From prompt to publish without the survey busywork.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [Wand2, 'Generate better drafts', 'Describe your goal and audience. ActovIQ proposes focused questions, formats, and response paths.'],
              [ClipboardList, 'Launch cleaner surveys', 'Preview respondent flow, tune question types, and keep surveys short enough to finish.'],
              [ShieldCheck, 'Read the pattern', 'Track completion, sentiment, recurring themes, and quality flags before decisions get stale.'],
            ].map(([Icon, title, copy]) => {
              const CardIcon = Icon as typeof Wand2;
              return (
                <article key={title as string} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2d74ff]/15 text-[#8bb5ff]">
                    <CardIcon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{title as string}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] px-5 py-16 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal">Start with the builder.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
              The first version is ready for survey creation, preview, and response intelligence. Database-backed persistence comes next.
            </p>
          </div>
          <button
            onClick={onStart}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#07111f] transition hover:bg-[#dbe8ff]"
          >
            Open ActovIQ
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
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
