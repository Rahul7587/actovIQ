import { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  Code2,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  LineChart,
  Loader2,
  Lock,
  MessageSquareText,
  Moon,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wand2,
  Workflow,
  Zap,
} from 'lucide-react';
import { generateSurveyDraft } from './api/surveys';
import { initialSurvey } from './data/mockData';
import { QuestionType, SurveyDraft, SurveyQuestion } from './types';

type Page =
  | 'landing'
  | 'pricing'
  | 'dashboard'
  | 'builder'
  | 'reports'
  | 'enterprise'
  | 'api'
  | 'blog'
  | 'docs'
  | 'login'
  | 'signup';

type Theme = 'dark' | 'light';

const pages: Array<{ id: Page; label: string }> = [
  { id: 'pricing', label: 'Pricing' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'builder', label: 'Builder' },
  { id: 'reports', label: 'AI Reports' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'api', label: 'API' },
  { id: 'blog', label: 'Blog' },
  { id: 'docs', label: 'Docs' },
];

const appNav = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'builder' as Page, label: 'Intelligence Builder', icon: Wand2 },
  { id: 'reports' as Page, label: 'AI Reports', icon: FileText },
  { id: 'pricing' as Page, label: 'Billing', icon: BriefcaseBusiness },
];

const questionLabels: Record<QuestionType, string> = {
  rating: 'Score',
  singleChoice: 'Choice',
  multiChoice: 'Multi-select',
  text: 'Open text',
};

const featureCards = [
  ['AI Survey Generation', 'Describe what you need to learn. ActovIQ creates the full research structure automatically.', Wand2],
  ['Smart Feedback Collection', 'Forms, links, embeds, QR codes, and shareable journeys built for every audience.', QrCode],
  ['AI Analytics Engine', 'Trends, patterns, themes, risks, opportunities, and anomalies detected without manual slicing.', Brain],
  ['Sentiment Analysis', 'Understand emotional movement across every response, segment, and time period.', Activity],
  ['AI Executive Reports', 'Boardroom-ready summaries, findings, risks, and next actions generated on demand.', FileText],
  ['Recommendation Engine', 'Prioritized decisions based on impact, urgency, confidence, and business context.', Target],
  ['AI Chat Assistant', 'Ask why NPS dropped, what customers hate this week, and what to fix first.', MessageSquareText],
  ['Benchmark Intelligence', 'Compare customer signal against proprietary industry and segment benchmarks.', TrendingUp],
];

const useCases = [
  ['Startups', 'Find what blocks growth before churn shows up.', Zap],
  ['SMBs', 'Know what to fix without hiring an analytics team.', Building2],
  ['Enterprises', 'Turn distributed feedback into operating decisions.', Globe2],
  ['Agencies', 'Ship sharper client insights and executive reports.', BriefcaseBusiness],
  ['Healthcare', 'Detect patient experience risks with governance-ready workflows.', Stethoscope],
  ['Education', 'Understand students, parents, faculty, and programs faster.', GraduationCap],
  ['Government', 'Convert citizen feedback into measurable service priorities.', Landmark],
];

const pricingPlans = [
  ['Free', 'For early teams validating feedback loops.', '₹0', ['Limited responses', 'Basic AI summaries', 'Shareable collection links']],
  ['Pro', 'For teams replacing manual survey analysis.', '₹2,999', ['Unlimited surveys', 'Advanced analytics', 'AI executive reports']],
  ['Business', 'For multi-team intelligence operations.', '₹9,999', ['Benchmark intelligence', 'CRM integrations', 'AI chat assistant']],
  ['Enterprise', 'For regulated and global organizations.', 'Custom', ['Compliance controls', 'Dedicated support', 'White-labeling']],
];

const dashboardMetrics = [
  ['Response count', '18,420', '+22%', BarChart3],
  ['Satisfaction score', '84%', '+6%', Sparkles],
  ['Sentiment score', '8.6', '+0.9', Activity],
  ['NPS', '52', '+11', TrendingUp],
  ['Recommendation score', '91%', '+14%', Target],
];

const reportSections = [
  'Executive summary',
  'Key findings',
  'Sentiment analysis',
  'Trends',
  'Risks',
  'Recommendations',
  'Action plan',
];

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [theme, setTheme] = useState<Theme>('dark');

  const themeVars =
    theme === 'dark'
      ? ({
          '--bg': '#05070d',
          '--panel': '#0a0f1d',
          '--panel-2': '#0f172a',
          '--fg': '#f8fbff',
          '--muted': 'rgba(248,251,255,0.64)',
          '--line': 'rgba(255,255,255,0.10)',
          '--soft': 'rgba(45,116,255,0.14)',
        } as React.CSSProperties)
      : ({
          '--bg': '#f7f9fc',
          '--panel': '#ffffff',
          '--panel-2': '#eef4ff',
          '--fg': '#0b1220',
          '--muted': 'rgba(11,18,32,0.64)',
          '--line': 'rgba(11,18,32,0.10)',
          '--soft': 'rgba(45,116,255,0.11)',
        } as React.CSSProperties);

  return (
    <div style={themeVars} className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      <TopNav page={page} setPage={setPage} theme={theme} setTheme={setTheme} />
      {page === 'landing' && <LandingPage setPage={setPage} />}
      {page === 'pricing' && <PricingPage setPage={setPage} />}
      {page === 'dashboard' && <DashboardPage setPage={setPage} />}
      {page === 'builder' && <BuilderPage setPage={setPage} />}
      {page === 'reports' && <ReportsPage setPage={setPage} />}
      {page === 'enterprise' && <EnterprisePage setPage={setPage} />}
      {page === 'api' && <ApiPage />}
      {page === 'blog' && <BlogPage />}
      {page === 'docs' && <DocsPage />}
      {page === 'login' && <AuthPage mode="login" setPage={setPage} />}
      {page === 'signup' && <AuthPage mode="signup" setPage={setPage} />}
    </div>
  );
}

function TopNav({
  page,
  setPage,
  theme,
  setTheme,
}: {
  page: Page;
  setPage: (page: Page) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <button onClick={() => setPage('landing')} className="flex items-center gap-3 text-left">
          <img
            src="/actoviq-logo.png"
            alt="ActovIQ logo"
            className="h-10 w-10 rounded-lg object-cover shadow-[0_12px_36px_rgba(45,116,255,0.35)]"
          />
          <span>
            <span className="block text-lg font-semibold leading-5">ActovIQ</span>
            <span className="block text-xs text-[var(--muted)]">Decision intelligence</span>
          </span>
        </button>
        <nav className="hidden items-center gap-1 xl:flex">
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                page === item.id ? 'bg-[var(--soft)] text-[#6ea1ff]' : 'text-[var(--muted)] hover:bg-[var(--panel-2)] hover:text-[var(--fg)]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--line)] bg-[var(--panel)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => setPage('login')} className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--fg)] sm:block">
            Login
          </button>
          <button onClick={() => setPage('signup')} className="rounded-lg bg-[#2d74ff] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(45,116,255,0.28)]">
            Start Free
          </button>
        </div>
      </div>
    </header>
  );
}

function LandingPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(45,116,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(45,116,255,0.12)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(45,116,255,0.34),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] lg:px-8 lg:py-28">
          <div className="animate-rise flex min-h-[560px] flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#2d74ff]/35 bg-[#2d74ff]/10 px-3 py-1 text-sm font-semibold text-[#8bb5ff]">
              <Sparkles size={15} />
              AI that turns customer feedback into business decisions automatically.
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.01] tracking-normal md:text-7xl">
              Turn Feedback Into Decisions. Instantly.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              ActovIQ is not another survey tool. It is an AI-first intelligence platform that analyzes feedback, generates reports, and tells your team what to do next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage('signup')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d74ff] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(45,116,255,0.35)] transition hover:bg-[#4b88ff]">
                Start Free
                <ArrowRight size={17} />
              </button>
              <button onClick={() => setPage('enterprise')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] px-5 py-3 text-sm font-semibold">
                Book Demo
              </button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[var(--line)] pt-6">
              {[
                ['10x', 'faster reporting'],
                ['24/7', 'AI analyst'],
                ['India', 'first market'],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <Section eyebrow="The problem" title="Teams collect feedback. Then the real work starts.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['Manual analysis delays decisions.', 'Spreadsheets, exports, charts, and slide decks keep teams reacting late.'],
            ['Reports say what happened, not what to do.', 'Static dashboards rarely translate signal into prioritized action.'],
            ['Feedback lives across disconnected tools.', 'Customer voice gets trapped in forms, CRMs, support tickets, and research files.'],
          ].map(([title, copy]) => (
            <Card key={title}>
              <AlertTriangle className="text-[#6ea1ff]" size={22} />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core features" title="An AI intelligence layer for every feedback workflow.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(([title, copy, Icon]) => {
            const FeatureIcon = Icon as typeof Wand2;
            return (
              <Card key={title as string}>
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#2d74ff]/15 text-[#6ea1ff]">
                  <FeatureIcon size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy as string}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="How it works" title="Prompt, collect, analyze, decide.">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            ['01', 'Describe the decision', 'Tell ActovIQ what business question you need answered.'],
            ['02', 'Generate the research system', 'AI creates questions, sections, branching logic, and structure.'],
            ['03', 'Collect feedback everywhere', 'Use forms, surveys, links, embeds, and QR codes.'],
            ['04', 'Receive next actions', 'Get executive reports, alerts, recommendations, and AI chat answers.'],
          ].map(([step, title, copy]) => (
            <Card key={step}>
              <p className="text-sm font-semibold text-[#6ea1ff]">{step}</p>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </Card>
          ))}
        </div>
      </Section>

      <DashboardSection setPage={setPage} />

      <Section eyebrow="Use cases" title="Built for India first. Ready for global teams.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map(([title, copy, Icon]) => {
            const UseIcon = Icon as typeof Zap;
            return (
              <Card key={title as string}>
                <UseIcon className="text-[#6ea1ff]" size={22} />
                <h3 className="mt-5 text-lg font-semibold">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy as string}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="The reaction we optimize for: this is smarter than SurveyMonkey.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['We stopped debating dashboards and started acting on the top three risks every Monday.', 'Founder, B2B SaaS'],
            ['The executive report felt like it was written by our best strategy analyst.', 'CX Lead, Healthcare'],
            ['Our clients do not want charts. They want decisions. ActovIQ gets that.', 'Partner, Growth Agency'],
          ].map(([quote, person]) => (
            <Card key={person}>
              <p className="text-lg leading-7">"{quote}"</p>
              <p className="mt-6 text-sm font-semibold text-[#6ea1ff]">{person}</p>
            </Card>
          ))}
        </div>
      </Section>

      <PricingPreview setPage={setPage} />

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-[#2d74ff]/30 bg-[#2d74ff] p-8 text-white shadow-[0_30px_100px_rgba(45,116,255,0.28)] md:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-normal">Stop collecting feedback you do not act on.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">ActovIQ turns every customer signal into a business decision, report, alert, and action plan.</p>
            </div>
            <button onClick={() => setPage('signup')} className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0b1220]">
              Start Free
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function DashboardPreview() {
  return (
    <div className="animate-float relative hidden min-h-[620px] lg:block">
      <div className="absolute inset-y-4 left-8 right-0 rounded-lg border border-[var(--line)] bg-[var(--panel)] shadow-[0_40px_120px_rgba(0,0,0,0.38)]">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2d74ff]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--line)]" />
          </div>
          <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">AI decision room</span>
        </div>
        <div className="grid grid-cols-[190px_1fr]">
          <div className="min-h-[548px] border-r border-[var(--line)] p-5">
            <div className="h-8 rounded-md bg-[var(--panel-2)]" />
            <div className="mt-8 space-y-3">
              {['Overview', 'Risks', 'Reports', 'Actions'].map((item, index) => (
                <div key={item} className={`rounded-md px-3 py-2 text-sm ${index === 0 ? 'bg-[#2d74ff] text-white' : 'bg-[var(--panel-2)] text-[var(--muted)]'}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#6ea1ff]">Weekly customer intelligence</p>
                <h3 className="mt-3 text-2xl font-semibold">NPS dropped because onboarding friction increased.</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">AI confidence 91%. Recommended next action: simplify first-run setup and trigger concierge outreach for enterprise trials.</p>
              </div>
              <span className="rounded-lg bg-[#2d74ff]/15 px-3 py-2 text-sm font-semibold text-[#6ea1ff]">High impact</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {dashboardMetrics.slice(0, 3).map(([label, value, change]) => (
                <div key={label as string} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3">
                  <p className="text-xs text-[var(--muted)]">{label as string}</p>
                  <p className="mt-2 text-2xl font-semibold">{value as string}</p>
                  <p className="mt-1 text-xs font-semibold text-[#6ea1ff]">{change as string}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold">Decision drivers</p>
                <LineChart size={18} className="text-[#6ea1ff]" />
              </div>
              {[76, 54, 88, 41, 69, 92, 63, 82].map((height, index) => (
                <span key={index} className="mr-2 inline-block w-9 rounded-t-md bg-[#2d74ff]" style={{ height }} />
              ))}
            </div>
            <div className="mt-6 grid gap-3">
              {['Fix onboarding checklist', 'Escalate shipping complaints', 'Publish retention report'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3">
                  <span className="text-sm">{item}</span>
                  <ChevronRight size={16} className="text-[var(--muted)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSection({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--panel)] px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-[#6ea1ff]">Dashboard preview</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-normal">Analytics that already know the next move.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Charts matter. Decisions matter more. ActovIQ combines metrics, AI summaries, alerts, and recommendations in one operating view.</p>
          <button onClick={() => setPage('dashboard')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2d74ff] px-4 py-2.5 text-sm font-semibold text-white">
            View dashboard
            <ArrowRight size={16} />
          </button>
        </div>
        <DashboardCanvas compact />
      </div>
    </section>
  );
}

function DashboardPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <AppShell active="dashboard" setPage={setPage}>
      <PageHeader eyebrow="Decision cockpit" title="Customer intelligence dashboard" copy="Charts, AI summaries, alerts, and recommendations built for operators who need to act now." />
      <DashboardCanvas />
    </AppShell>
  );
}

function DashboardCanvas({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] ${compact ? '' : 'mt-6'}`}>
      <div className="grid gap-3 md:grid-cols-5">
        {dashboardMetrics.map(([label, value, change, Icon]) => {
          const MetricIcon = Icon as typeof BarChart3;
          return (
            <div key={label as string} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">{label as string}</p>
                <MetricIcon size={16} className="text-[#6ea1ff]" />
              </div>
              <p className="mt-3 text-2xl font-semibold">{value as string}</p>
              <p className="mt-1 text-xs font-semibold text-[#6ea1ff]">{change as string}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Trend and anomaly detection</h3>
            <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">AI monitored</span>
          </div>
          <div className="mt-6 flex h-52 items-end gap-3">
            {[42, 76, 61, 88, 69, 102, 94, 126, 111, 148, 132, 166].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-[#2d74ff]" style={{ height }} />
                <span className="text-[10px] text-[var(--muted)]">{index + 1}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold">AI summary</h3>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Enterprise trial users show rising dissatisfaction with onboarding setup. Sentiment is positive after activation, but the first seven days create revenue risk.</p>
          <div className="mt-5 space-y-3">
            {['Prioritize onboarding redesign', 'Route 42 accounts to success team', 'Benchmark against SaaS activation cohort'].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3">
                <Check size={16} className="mt-0.5 text-[#6ea1ff]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function BuilderPage({ setPage }: { setPage: (page: Page) => void }) {
  const [survey, setSurvey] = useState<SurveyDraft>(initialSurvey);
  const [goal, setGoal] = useState('Create a customer satisfaction survey for an ecommerce company.');
  const [audience, setAudience] = useState('Recent ecommerce buyers in India and global markets');
  const [tone, setTone] = useState('Confident, concise, executive-friendly');
  const [isGenerating, setIsGenerating] = useState(false);

  const requiredCount = useMemo(() => survey.questions.filter((question) => question.required).length, [survey.questions]);

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
      prompt: type === 'text' ? 'What decision should this feedback influence?' : 'Which option best explains this feedback signal?',
      required: false,
      options: type === 'singleChoice' || type === 'multiChoice' ? ['Pricing', 'Support', 'Product quality', 'Delivery'] : undefined,
    };
    setSurvey((current) => ({ ...current, questions: [...current.questions, question] }));
  }

  return (
    <AppShell active="builder" setPage={setPage}>
      <PageHeader eyebrow="Survey intelligence builder" title="Generate the whole feedback system from a prompt." copy="Questions, sections, branching logic, collection formats, and intelligence structure are generated together." />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-6">
          <Card>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#6ea1ff]">Plain English prompt</p>
                <h2 className="mt-1 text-xl font-semibold">Tell ActovIQ the decision you need to make</h2>
              </div>
              <button onClick={handleGenerate} disabled={isGenerating} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d74ff] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-70">
                {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                Generate intelligence plan
              </button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Business decision" value={goal} setValue={setGoal} textarea />
              <Field label="Audience" value={audience} setValue={setAudience} />
              <Field label="Tone" value={tone} setValue={setTone} />
            </div>
          </Card>
          <Card>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#6ea1ff]">Generated structure</p>
                <h2 className="mt-1 text-xl font-semibold">{survey.title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{survey.questions.length} questions, {requiredCount} required, branching-ready</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['rating', 'singleChoice', 'text'] as QuestionType[]).map((type) => (
                  <button key={type} onClick={() => addQuestion(type)} className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-medium">
                    <Plus size={15} />
                    {questionLabels[type]}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {survey.questions.map((question, index) => (
                <article key={question.id} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-[var(--panel)] px-2 py-1 text-xs font-semibold text-[var(--muted)]">Q{index + 1}</span>
                        <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">{questionLabels[question.type]}</span>
                        {question.required && <span className="rounded-md bg-white/8 px-2 py-1 text-xs font-semibold">Required</span>}
                      </div>
                      <p className="mt-3 text-sm font-medium leading-6">{question.prompt}</p>
                    </div>
                    <Workflow className="mt-1 shrink-0 text-[#6ea1ff]" size={18} />
                  </div>
                  {question.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {question.options.map((option) => (
                        <span key={option} className="rounded-md border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1 text-xs text-[var(--muted)]">{option}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </Card>
        </div>
        <BuilderAside survey={survey} />
      </div>
    </AppShell>
  );
}

function BuilderAside({ survey }: { survey: SurveyDraft }) {
  return (
    <aside className="space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6ea1ff]">Collection modes</p>
            <h2 className="mt-1 text-lg font-semibold">Ready for distribution</h2>
          </div>
          <ClipboardList size={22} className="text-[#6ea1ff]" />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {['Forms', 'Surveys', 'Links', 'Embeds', 'QR codes', 'Workflows'].map((item) => (
            <div key={item} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3 text-sm">{item}</div>
          ))}
        </div>
      </Card>
      <Card>
        <p className="text-sm font-semibold text-[#6ea1ff]">AI logic map</p>
        <div className="mt-4 space-y-3">
          {['If satisfaction <= 6, ask root-cause question', 'If delivery issue selected, route to operations', 'If high intent, create sales follow-up'].map((logic) => (
            <div key={logic} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3 text-sm leading-5">{logic}</div>
          ))}
        </div>
      </Card>
      <Card>
        <p className="text-sm font-semibold">{survey.title}</p>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{survey.goal}</p>
        <div className="mt-4 space-y-3">
          {survey.questions.slice(0, 3).map((question, index) => (
            <div key={question.id} className="rounded-lg bg-[var(--panel-2)] p-3">
              <p className="text-xs font-semibold text-[var(--muted)]">Question {index + 1}</p>
              <p className="mt-1 text-sm font-medium leading-5">{question.prompt}</p>
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}

function ReportsPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <AppShell active="reports" setPage={setPage}>
      <PageHeader eyebrow="AI executive reports" title="Boardroom-ready reports generated automatically." copy="Executive summary, findings, sentiment, trends, risks, recommendations, and action plan in one decision document." />
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h3 className="text-xl font-semibold">Report structure</h3>
          <div className="mt-5 space-y-3">
            {reportSections.map((section, index) => (
              <div key={section} className="flex items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[#2d74ff]/15 text-xs font-semibold text-[#6ea1ff]">{index + 1}</span>
                <span className="text-sm font-medium">{section}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Executive summary</h3>
            <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">Auto-generated</span>
          </div>
          <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
            Customer sentiment is improving overall, but NPS decline in enterprise trials is linked to onboarding complexity and delayed support responses. The highest-impact action is to reduce activation steps and trigger guided support for accounts with low early satisfaction.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {['Risk: onboarding friction', 'Opportunity: high expansion intent', 'Action: success team routing'].map((item) => (
              <div key={item} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3 text-sm">{item}</div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function PricingPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow="Pricing" title="Freemium plus usage-based subscriptions." copy="Start free, scale by seats, responses, analytics depth, and enterprise controls." />
        <PricingGrid setPage={setPage} />
      </div>
    </main>
  );
}

function PricingPreview({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--panel)] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6ea1ff]">Pricing preview</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-normal">Start free. Pay when intelligence becomes mission-critical.</h2>
          </div>
          <button onClick={() => setPage('pricing')} className="inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm font-semibold">
            Full pricing
            <ArrowRight size={16} />
          </button>
        </div>
        <PricingGrid setPage={setPage} compact />
      </div>
    </section>
  );
}

function PricingGrid({ setPage, compact = false }: { setPage: (page: Page) => void; compact?: boolean }) {
  return (
    <div className={`grid gap-4 ${compact ? 'lg:grid-cols-4' : 'mt-10 lg:grid-cols-4'}`}>
      {pricingPlans.map(([name, copy, price, items], index) => (
        <Card key={name as string} emphasis={index === 2}>
          <p className="text-lg font-semibold">{name as string}</p>
          <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted)]">{copy as string}</p>
          <p className="mt-6 text-3xl font-semibold">{price as string}<span className="text-sm font-medium text-[var(--muted)]">{price === 'Custom' ? '' : '/mo'}</span></p>
          <button onClick={() => setPage(name === 'Enterprise' ? 'enterprise' : 'signup')} className={`mt-6 w-full rounded-lg px-4 py-2.5 text-sm font-semibold ${index === 2 ? 'bg-white text-[#0b1220]' : 'bg-[#2d74ff] text-white'}`}>
            {name === 'Enterprise' ? 'Book Demo' : 'Start Free'}
          </button>
          <div className="mt-6 space-y-3">
            {(items as string[]).map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Check size={15} className="text-[#6ea1ff]" />
                {item}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function EnterprisePage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <PageHeader eyebrow="Enterprise" title="Feedback intelligence for regulated, distributed teams." copy="Compliance, dedicated support, custom integrations, white-labeling, Microsoft and Google authentication, and global-ready workspace architecture." />
          <button onClick={() => setPage('signup')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2d74ff] px-5 py-3 text-sm font-semibold text-white">
            Book Demo
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {['Compliance controls', 'Dedicated support', 'Custom integrations', 'White-labeling', 'Team workspaces', 'Seat-based billing'].map((item) => (
            <Card key={item}>
              <ShieldCheck className="text-[#6ea1ff]" size={22} />
              <h3 className="mt-5 text-lg font-semibold">{item}</h3>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function ApiPage() {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow="API" title="Integrate ActovIQ into every feedback system." copy="Global-ready architecture for CRMs, support tools, data warehouses, webhooks, embeds, and future multimodal feedback ingestion." />
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <h3 className="text-xl font-semibold">Platform integrations</h3>
            <div className="mt-5 space-y-3">
              {['Supabase + PostgreSQL', 'OpenAI and Anthropic', 'Stripe billing', 'Google authentication', 'Microsoft authentication'].map((item) => (
                <div key={item} className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-3 text-sm">{item}</div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Code2 className="text-[#6ea1ff]" />
              <h3 className="text-xl font-semibold">Example request</h3>
            </div>
            <pre className="mt-5 overflow-x-auto rounded-lg bg-[#05070d] p-4 text-sm leading-6 text-[#b7ccff]">
{`POST /v1/intelligence/reports
{
  "workspaceId": "actoviq_india",
  "source": "customer_feedback",
  "output": ["summary", "risks", "actions"]
}`}
            </pre>
          </Card>
        </div>
      </div>
    </main>
  );
}

function BlogPage() {
  return (
    <ContentPage
      eyebrow="Blog"
      title="Thinking for AI-native customer intelligence."
      items={[
        ['Why surveys are not enough anymore', 'The shift from collection tools to decision systems.'],
        ['Benchmarking customer feedback in India', 'How local market context changes what good looks like.'],
        ['The future roadmap', 'Voice, image, video feedback, mobile apps, and enterprise intelligence systems.'],
      ]}
    />
  );
}

function DocsPage() {
  return (
    <ContentPage
      eyebrow="Documentation"
      title="Build, deploy, and scale ActovIQ workflows."
      items={[
        ['Getting started', 'Create a workspace, connect auth, and launch your first intelligence workflow.'],
        ['Billing and seats', 'Set up Stripe subscriptions, seat-based billing, and usage limits.'],
        ['AI providers', 'Configure OpenAI, Anthropic, and model routing for reports and chat analytics.'],
      ]}
    />
  );
}

function ContentPage({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[][] }) {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow={eyebrow} title={title} copy="Clear, practical guidance for teams building customer intelligence operations." />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {items.map(([itemTitle, copy]) => (
            <Card key={itemTitle}>
              <Search className="text-[#6ea1ff]" size={22} />
              <h3 className="mt-5 text-lg font-semibold">{itemTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function AuthPage({ mode, setPage }: { mode: 'login' | 'signup'; setPage: (page: Page) => void }) {
  const isSignup = mode === 'signup';
  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-5 py-16 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#2d74ff] text-white">
          <Lock size={20} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold">{isSignup ? 'Start making decisions.' : 'Welcome back.'}</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{isSignup ? 'Create your ActovIQ workspace with Google or Microsoft authentication.' : 'Login to your decision intelligence workspace.'}</p>
        <div className="mt-6 space-y-3">
          <button className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-4 py-3 text-sm font-semibold">Continue with Google</button>
          <button className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-4 py-3 text-sm font-semibold">Continue with Microsoft</button>
          <button className="w-full rounded-lg bg-[#2d74ff] px-4 py-3 text-sm font-semibold text-white">{isSignup ? 'Create workspace' : 'Login'}</button>
        </div>
        <button onClick={() => setPage(isSignup ? 'login' : 'signup')} className="mt-5 text-sm font-semibold text-[#6ea1ff]">
          {isSignup ? 'Already have an account? Login' : 'New to ActovIQ? Start free'}
        </button>
      </Card>
    </main>
  );
}

function AppShell({ active, setPage, children }: { active: Page; setPage: (page: Page) => void; children: React.ReactNode }) {
  return (
    <main className="grid min-h-[calc(100vh-73px)] lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-[var(--line)] bg-[var(--panel)] p-4 lg:border-b-0 lg:border-r">
        <div className="flex gap-2 overflow-x-auto lg:block lg:space-y-2">
          {appNav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:w-full ${
                  active === item.id ? 'bg-[#2d74ff] text-white' : 'text-[var(--muted)] hover:bg-[var(--panel-2)] hover:text-[var(--fg)]'
                }`}
              >
                <Icon size={17} />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>
      <section className="px-5 py-6 lg:px-8">{children}</section>
    </main>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-[#6ea1ff]">{eyebrow}</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-normal">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function PageHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm font-semibold text-[#6ea1ff]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">{copy}</p>
    </div>
  );
}

function Card({
  children,
  emphasis = false,
  className = '',
}: {
  children: React.ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <article className={`rounded-lg border p-5 transition duration-300 hover:-translate-y-0.5 ${emphasis ? 'border-[#2d74ff] bg-[#2d74ff] text-white shadow-[0_24px_70px_rgba(45,116,255,0.28)]' : 'border-[var(--line)] bg-[var(--panel)]'} ${className}`}>
      {children}
    </article>
  );
}

function Field({
  label,
  value,
  setValue,
  textarea = false,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  textarea?: boolean;
}) {
  const shared = 'mt-2 w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-3 text-sm outline-none transition focus:border-[#2d74ff]';
  return (
    <label className={textarea ? 'md:col-span-2' : ''}>
      <span className="text-sm font-medium">{label}</span>
      {textarea ? (
        <textarea value={value} onChange={(event) => setValue(event.target.value)} className={`${shared} min-h-28 resize-none`} />
      ) : (
        <input value={value} onChange={(event) => setValue(event.target.value)} className={shared} />
      )}
    </label>
  );
}

export default App;
