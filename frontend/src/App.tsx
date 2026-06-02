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
  Code2,
  Copy,
  Eye,
  FileText,
  Globe2,
  GripVertical,
  GraduationCap,
  History,
  Landmark,
  LayoutDashboard,
  LineChart,
  Lock,
  MessageSquareText,
  Monitor,
  Moon,
  Plus,
  QrCode,
  Redo2,
  Search,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Sun,
  Tablet,
  Target,
  Trash2,
  TrendingUp,
  Undo2,
  Upload,
  Wand2,
  Workflow,
  Zap,
} from 'lucide-react';

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
  | 'help'
  | 'about'
  | 'login'
  | 'signup';

type Theme = 'dark' | 'light';

const pages: Array<{ id: Page; label: string }> = [
  { id: 'builder', label: 'Builder' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'enterprise', label: 'Enterprise' },
  { id: 'docs', label: 'Docs' },
  { id: 'help', label: 'Help' },
  { id: 'about', label: 'About us' },
];

const appNav = [
  { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'builder' as Page, label: 'Intelligence Builder', icon: Wand2 },
  { id: 'reports' as Page, label: 'AI Reports', icon: FileText },
  { id: 'pricing' as Page, label: 'Billing', icon: BriefcaseBusiness },
];

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

type BuilderQuestionType =
  | 'shortText'
  | 'longText'
  | 'email'
  | 'phone'
  | 'date'
  | 'singleChoice'
  | 'multipleChoice'
  | 'dropdown'
  | 'starRating'
  | 'nps'
  | 'likert'
  | 'ranking'
  | 'matrix'
  | 'fileUpload';

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

interface BuilderQuestion {
  id: string;
  type: BuilderQuestionType;
  title: string;
  description: string;
  required: boolean;
  settings: {
    placeholder: string;
    minLength?: number;
    maxLength?: number;
    helpText: string;
    defaultValue: string;
    randomizeOptions: boolean;
  };
  options: string[];
  order: number;
}

interface BuilderSection {
  id: string;
  title: string;
  order: number;
  questions: BuilderQuestion[];
}

interface BuilderSurvey {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Published';
  settings: {
    branding: {
      logoName: string;
      primaryColor: string;
      secondaryColor: string;
    };
    behavior: {
      anonymousResponses: boolean;
      allowMultipleResponses: boolean;
      progressBar: boolean;
    };
    limits: {
      responseLimit: number;
      expirationDate: string;
    };
    thankYou: {
      title: string;
      message: string;
    };
  };
  sections: BuilderSection[];
}

const questionTypeLabels: Record<BuilderQuestionType, string> = {
  shortText: 'Short Text',
  longText: 'Long Text',
  email: 'Email',
  phone: 'Phone Number',
  date: 'Date',
  singleChoice: 'Single Choice',
  multipleChoice: 'Multiple Choice',
  dropdown: 'Dropdown',
  starRating: 'Star Rating',
  nps: 'NPS',
  likert: 'Likert Scale',
  ranking: 'Ranking',
  matrix: 'Matrix',
  fileUpload: 'File Upload',
};

const questionLibrary: Array<{ category: string; items: BuilderQuestionType[] }> = [
  { category: 'Basic Inputs', items: ['shortText', 'longText', 'email', 'phone', 'date'] },
  { category: 'Choice Questions', items: ['singleChoice', 'multipleChoice', 'dropdown'] },
  { category: 'Rating Questions', items: ['starRating', 'nps', 'likert'] },
  { category: 'Advanced Questions', items: ['ranking', 'matrix', 'fileUpload'] },
];

const choiceQuestionTypes: BuilderQuestionType[] = ['singleChoice', 'multipleChoice', 'dropdown', 'ranking', 'matrix', 'likert'];

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
      {page === 'help' && <HelpPage />}
      {page === 'about' && <AboutPage setPage={setPage} />}
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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 lg:flex-nowrap lg:px-8">
        <button onClick={() => setPage('landing')} className="flex items-center gap-4 text-left">
          <img
            src="/actoviq-logo.png"
            alt="ActovIQ logo"
            className="h-14 w-14 rounded-xl object-cover shadow-[0_16px_44px_rgba(45,116,255,0.38)]"
          />
          <span>
            <span className="block text-2xl font-semibold leading-6 tracking-normal">ActovIQ</span>
            <span className="mt-1 block text-sm text-[var(--muted)]">Decision intelligence</span>
          </span>
        </button>
        <nav className="order-3 flex w-full gap-1 overflow-x-auto border-t border-[var(--line)] pt-3 lg:order-none lg:w-auto lg:border-t-0 lg:pt-0">
          {pages.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`min-w-max rounded-lg px-3 py-2 text-sm font-medium transition ${
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
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
              This page introduces the agenda: how ActovIQ captures customer signal, detects patterns, generates executive-ready intelligence, and helps teams move from raw responses to confident decisions.
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
  const [survey, setSurvey] = useState<BuilderSurvey>(createInitialBuilderSurvey());
  const [selectedQuestionId, setSelectedQuestionId] = useState('q-csat');
  const [selectedSectionId, setSelectedSectionId] = useState('section-customer-experience');
  const [query, setQuery] = useState('');
  const [saveStatus, setSaveStatus] = useState('All changes saved');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');

  const selectedQuestion = useMemo(
    () => survey.sections.flatMap((section) => section.questions).find((question) => question.id === selectedQuestionId),
    [survey.sections, selectedQuestionId],
  );

  const selectedSection = useMemo(
    () => survey.sections.find((section) => section.id === selectedSectionId) ?? survey.sections[0],
    [survey.sections, selectedSectionId],
  );

  function touch(status = 'Auto-saved just now') {
    setSaveStatus(status);
  }

  function updateSurvey(updater: (current: BuilderSurvey) => BuilderSurvey) {
    setSurvey((current) => updater(current));
    touch();
  }

  function updateSurveyField<K extends 'title' | 'description'>(key: K, value: BuilderSurvey[K]) {
    updateSurvey((current) => ({ ...current, [key]: value }));
  }

  function updateQuestion(questionId: string, updater: (question: BuilderQuestion) => BuilderQuestion) {
    updateSurvey((current) => ({
      ...current,
      sections: current.sections.map((section) => ({
        ...section,
        questions: section.questions.map((question) => (question.id === questionId ? updater(question) : question)),
      })),
    }));
  }

  function addSection() {
    const id = createId('section');
    updateSurvey((current) => ({
      ...current,
      sections: [
        ...current.sections,
        {
          id,
          title: `Section ${current.sections.length + 1}`,
          order: current.sections.length,
          questions: [],
        },
      ],
    }));
    setSelectedSectionId(id);
  }

  function updateSection(sectionId: string, updater: (section: BuilderSection) => BuilderSection) {
    updateSurvey((current) => ({ ...current, sections: current.sections.map((section) => (section.id === sectionId ? updater(section) : section)) }));
  }

  function deleteSection(sectionId: string) {
    if (survey.sections.length === 1) return;
    const nextSection = survey.sections.find((section) => section.id !== sectionId);
    updateSurvey((current) => ({ ...current, sections: current.sections.filter((section) => section.id !== sectionId).map(withOrder) }));
    if (nextSection) setSelectedSectionId(nextSection.id);
  }

  function duplicateSection(sectionId: string) {
    const section = survey.sections.find((item) => item.id === sectionId);
    if (!section) return;
    const copy: BuilderSection = {
      ...section,
      id: createId('section'),
      title: `${section.title} copy`,
      questions: section.questions.map((question, index) => ({ ...question, id: createId('question'), order: index })),
      order: survey.sections.length,
    };
    updateSurvey((current) => ({ ...current, sections: [...current.sections, copy] }));
    setSelectedSectionId(copy.id);
  }

  function reorderSections(fromId: string, toId: string) {
    const fromIndex = survey.sections.findIndex((section) => section.id === fromId);
    const toIndex = survey.sections.findIndex((section) => section.id === toId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
    updateSurvey((current) => ({ ...current, sections: moveItem(current.sections, fromIndex, toIndex).map(withOrder) }));
  }

  function addQuestion(type: BuilderQuestionType, sectionId = selectedSection.id) {
    const question = createQuestion(type);
    updateSection(sectionId, (section) => ({ ...section, questions: [...section.questions, { ...question, order: section.questions.length }] }));
    setSelectedSectionId(sectionId);
    setSelectedQuestionId(question.id);
  }

  function deleteQuestion(sectionId: string, questionId: string) {
    updateSection(sectionId, (section) => ({ ...section, questions: section.questions.filter((question) => question.id !== questionId).map(withOrder) }));
    if (selectedQuestionId === questionId) setSelectedQuestionId('');
  }

  function duplicateQuestion(sectionId: string, questionId: string) {
    const section = survey.sections.find((item) => item.id === sectionId);
    const question = section?.questions.find((item) => item.id === questionId);
    if (!section || !question) return;
    const questionIndex = section.questions.findIndex((item) => item.id === questionId);
    const copy = { ...question, id: createId('question'), title: `${question.title} copy` };
    updateSection(sectionId, (current) => {
      const next = [...current.questions];
      next.splice(questionIndex + 1, 0, copy);
      return { ...current, questions: next.map(withOrder) };
    });
    setSelectedQuestionId(copy.id);
  }

  function reorderQuestion(sectionId: string, fromQuestionId: string, toQuestionId: string) {
    const section = survey.sections.find((item) => item.id === sectionId);
    if (!section) return;
    const fromIndex = section.questions.findIndex((question) => question.id === fromQuestionId);
    const toIndex = section.questions.findIndex((question) => question.id === toQuestionId);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return;
    updateSection(sectionId, (current) => ({ ...current, questions: moveItem(current.questions, fromIndex, toIndex).map(withOrder) }));
  }

  return (
    <AppShell active="builder" setPage={setPage}>
      <BuilderToolbar
        survey={survey}
        previewMode={previewMode}
        saveStatus={saveStatus}
        previewDevice={previewDevice}
        setPreviewMode={setPreviewMode}
        setPreviewDevice={setPreviewDevice}
        updateSurveyField={updateSurveyField}
        touch={touch}
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
        <QuestionLibrary query={query} setQuery={setQuery} addQuestion={addQuestion} />
        {previewMode ? (
          <SurveyPreview survey={survey} device={previewDevice} />
        ) : (
          <SurveyCanvas
            survey={survey}
            selectedQuestionId={selectedQuestionId}
            selectedSectionId={selectedSectionId}
            setSelectedQuestionId={setSelectedQuestionId}
            setSelectedSectionId={setSelectedSectionId}
            addSection={addSection}
            addQuestion={addQuestion}
            updateSection={updateSection}
            deleteSection={deleteSection}
            duplicateSection={duplicateSection}
            reorderSections={reorderSections}
            deleteQuestion={deleteQuestion}
            duplicateQuestion={duplicateQuestion}
            reorderQuestion={reorderQuestion}
          />
        )}
        <BuilderConfigPanel
          survey={survey}
          selectedQuestion={selectedQuestion}
          selectedSection={selectedSection}
          updateSurvey={updateSurvey}
          updateQuestion={updateQuestion}
          addQuestion={addQuestion}
        />
      </div>
    </AppShell>
  );
}

function BuilderToolbar({
  survey,
  previewMode,
  saveStatus,
  previewDevice,
  setPreviewMode,
  setPreviewDevice,
  updateSurveyField,
  touch,
}: {
  survey: BuilderSurvey;
  previewMode: boolean;
  saveStatus: string;
  previewDevice: PreviewDevice;
  setPreviewMode: (value: boolean) => void;
  setPreviewDevice: (value: PreviewDevice) => void;
  updateSurveyField: <K extends 'title' | 'description'>(key: K, value: BuilderSurvey[K]) => void;
  touch: (status?: string) => void;
}) {
  return (
    <div className="sticky top-[105px] z-30 rounded-lg border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_92%,transparent)] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={survey.title}
              onChange={(event) => updateSurveyField('title', event.target.value)}
              className="min-w-72 rounded-lg border border-transparent bg-transparent px-2 py-1 text-xl font-semibold outline-none transition focus:border-[var(--line)] focus:bg-[var(--panel-2)]"
            />
            <span className={`rounded-md px-2 py-1 text-xs font-semibold ${survey.status === 'Published' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-[#2d74ff]/12 text-[#6ea1ff]'}`}>
              {survey.status}
            </span>
            <span className="rounded-md bg-[var(--panel-2)] px-2 py-1 text-xs text-[var(--muted)]">{saveStatus}</span>
          </div>
          <p className="mt-1 px-2 text-xs text-[var(--muted)]">Version history is ready for future collaboration workflows.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <IconButton label="Undo" icon={Undo2} onClick={() => touch('Undo placeholder')} />
          <IconButton label="Redo" icon={Redo2} onClick={() => touch('Redo placeholder')} />
          <IconButton label="Version history" icon={History} onClick={() => touch('Version history placeholder')} />
          <button onClick={() => setPreviewMode(!previewMode)} className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm font-semibold">
            <Eye size={16} />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          {previewMode && (
            <div className="flex rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-1">
              {[
                ['desktop', Monitor],
                ['tablet', Tablet],
                ['mobile', Smartphone],
              ].map(([device, Icon]) => {
                const DeviceIcon = Icon as typeof Tablet;
                return (
                  <button
                    key={device as string}
                    onClick={() => setPreviewDevice(device as PreviewDevice)}
                    className={`grid h-8 w-8 place-items-center rounded-md ${previewDevice === device ? 'bg-[#2d74ff] text-white' : 'text-[var(--muted)]'}`}
                    aria-label={`${device} preview`}
                  >
                    <DeviceIcon size={15} />
                  </button>
                );
              })}
            </div>
          )}
          <button onClick={() => touch('Saved manually')} className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm font-semibold">
            <Save size={16} />
            Save
          </button>
          <button onClick={() => touch('Publish queued')} className="inline-flex items-center gap-2 rounded-lg bg-[#2d74ff] px-3 py-2 text-sm font-semibold text-white">
            <Upload size={16} />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionLibrary({
  query,
  setQuery,
  addQuestion,
}: {
  query: string;
  setQuery: (query: string) => void;
  addQuestion: (type: BuilderQuestionType) => void;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  return (
    <aside className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 xl:sticky xl:top-[210px] xl:max-h-[calc(100vh-230px)] xl:overflow-auto">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[#6ea1ff]">Question blocks</p>
          <h2 className="mt-1 text-lg font-semibold">Drag onto canvas</h2>
        </div>
        <GripVertical size={18} className="text-[var(--muted)]" />
      </div>
      <label className="mt-4 flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2">
        <Search size={15} className="text-[var(--muted)]" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search question types" className="w-full bg-transparent text-sm outline-none" />
      </label>
      <div className="mt-4 space-y-5">
        {questionLibrary.map((group) => {
          const items = group.items.filter((type) => questionTypeLabels[type].toLowerCase().includes(normalizedQuery));
          if (!items.length) return null;
          return (
            <div key={group.category}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{group.category}</p>
              <div className="space-y-2">
                {items.map((type) => (
                  <button
                    key={type}
                    draggable
                    onDragStart={(event) => event.dataTransfer.setData('question-type', type)}
                    onClick={() => addQuestion(type)}
                    className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2.5 text-left text-sm transition hover:-translate-y-0.5 hover:border-[#2d74ff]/50"
                  >
                    <span>{questionTypeLabels[type]}</span>
                    <Plus size={15} className="text-[#6ea1ff]" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function SurveyCanvas({
  survey,
  selectedQuestionId,
  selectedSectionId,
  setSelectedQuestionId,
  setSelectedSectionId,
  addSection,
  addQuestion,
  updateSection,
  deleteSection,
  duplicateSection,
  reorderSections,
  deleteQuestion,
  duplicateQuestion,
  reorderQuestion,
}: {
  survey: BuilderSurvey;
  selectedQuestionId: string;
  selectedSectionId: string;
  setSelectedQuestionId: (id: string) => void;
  setSelectedSectionId: (id: string) => void;
  addSection: () => void;
  addQuestion: (type: BuilderQuestionType, sectionId?: string) => void;
  updateSection: (sectionId: string, updater: (section: BuilderSection) => BuilderSection) => void;
  deleteSection: (sectionId: string) => void;
  duplicateSection: (sectionId: string) => void;
  reorderSections: (fromId: string, toId: string) => void;
  deleteQuestion: (sectionId: string, questionId: string) => void;
  duplicateQuestion: (sectionId: string, questionId: string) => void;
  reorderQuestion: (sectionId: string, fromQuestionId: string, toQuestionId: string) => void;
}) {
  return (
    <section className="min-w-0 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4">
      <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#6ea1ff]">Center canvas</p>
          <h2 className="mt-1 text-2xl font-semibold">Survey structure</h2>
        </div>
        <button onClick={addSection} className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#2d74ff] px-3 py-2 text-sm font-semibold text-white">
          <Plus size={16} />
          Add section
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {survey.sections.map((section, sectionIndex) => (
          <article
            key={section.id}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('section-id', section.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const sectionId = event.dataTransfer.getData('section-id');
              const questionType = event.dataTransfer.getData('question-type') as BuilderQuestionType;
              if (sectionId) reorderSections(sectionId, section.id);
              if (questionType) addQuestion(questionType, section.id);
            }}
            className={`rounded-lg border bg-[var(--panel-2)] p-4 transition ${selectedSectionId === section.id ? 'border-[#2d74ff]/70 shadow-[0_0_0_1px_rgba(45,116,255,0.35)]' : 'border-[var(--line)]'}`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <GripVertical size={18} className="shrink-0 text-[var(--muted)]" />
                <span className="shrink-0 rounded-md bg-[var(--panel)] px-2 py-1 text-xs font-semibold text-[var(--muted)]">Section {sectionIndex + 1}</span>
                <input
                  value={section.title}
                  onChange={(event) => updateSection(section.id, (current) => ({ ...current, title: event.target.value }))}
                  onFocus={() => setSelectedSectionId(section.id)}
                  className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-2 py-1 font-semibold outline-none focus:border-[var(--line)] focus:bg-[var(--panel)]"
                />
              </div>
              <div className="flex items-center gap-1">
                <IconButton label="Duplicate section" icon={Copy} onClick={() => duplicateSection(section.id)} />
                <IconButton label="Delete section" icon={Trash2} onClick={() => deleteSection(section.id)} />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {section.questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  sectionId={section.id}
                  active={selectedQuestionId === question.id}
                  select={() => {
                    setSelectedSectionId(section.id);
                    setSelectedQuestionId(question.id);
                  }}
                  duplicateQuestion={duplicateQuestion}
                  deleteQuestion={deleteQuestion}
                  reorderQuestion={reorderQuestion}
                />
              ))}
              <button
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const questionType = event.dataTransfer.getData('question-type') as BuilderQuestionType;
                  if (questionType) addQuestion(questionType, section.id);
                }}
                onClick={() => addQuestion('shortText', section.id)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel)] px-4 py-4 text-sm font-semibold text-[var(--muted)] transition hover:border-[#2d74ff]/60 hover:text-[#6ea1ff]"
              >
                <Plus size={16} />
                Drop a question block or add short text
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuestionCard({
  question,
  sectionId,
  active,
  select,
  duplicateQuestion,
  deleteQuestion,
  reorderQuestion,
}: {
  question: BuilderQuestion;
  sectionId: string;
  active: boolean;
  select: () => void;
  duplicateQuestion: (sectionId: string, questionId: string) => void;
  deleteQuestion: (sectionId: string, questionId: string) => void;
  reorderQuestion: (sectionId: string, fromQuestionId: string, toQuestionId: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('question-id', question.id);
        event.dataTransfer.setData('question-section-id', sectionId);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const questionId = event.dataTransfer.getData('question-id');
        const sourceSectionId = event.dataTransfer.getData('question-section-id');
        if (questionId && sourceSectionId === sectionId) reorderQuestion(sectionId, questionId, question.id);
      }}
      onClick={select}
      className={`rounded-lg border p-4 transition hover:-translate-y-0.5 ${active ? 'border-[#2d74ff] bg-[#2d74ff]/10' : 'border-[var(--line)] bg-[var(--panel)]'}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <GripVertical size={17} className="mt-1 shrink-0 text-[var(--muted)]" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">{questionTypeLabels[question.type]}</span>
              {question.required && <span className="rounded-md bg-[var(--panel-2)] px-2 py-1 text-xs font-semibold">Required</span>}
            </div>
            <h3 className="mt-2 font-semibold">{question.title}</h3>
            {question.description && <p className="mt-1 text-sm text-[var(--muted)]">{question.description}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <IconButton label="Quick edit" icon={Wand2} onClick={select} />
          <IconButton label="Duplicate question" icon={Copy} onClick={() => duplicateQuestion(sectionId, question.id)} />
          <IconButton label="Delete question" icon={Trash2} onClick={() => deleteQuestion(sectionId, question.id)} />
        </div>
      </div>
    </div>
  );
}

function BuilderConfigPanel({
  survey,
  selectedQuestion,
  selectedSection,
  updateSurvey,
  updateQuestion,
  addQuestion,
}: {
  survey: BuilderSurvey;
  selectedQuestion?: BuilderQuestion;
  selectedSection: BuilderSection;
  updateSurvey: (updater: (current: BuilderSurvey) => BuilderSurvey) => void;
  updateQuestion: (questionId: string, updater: (question: BuilderQuestion) => BuilderQuestion) => void;
  addQuestion: (type: BuilderQuestionType, sectionId?: string) => void;
}) {
  return (
    <aside className="space-y-4 xl:sticky xl:top-[210px] xl:max-h-[calc(100vh-230px)] xl:overflow-auto">
      <SurveySettingsPanel survey={survey} updateSurvey={updateSurvey} />
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#6ea1ff]">Question configuration</p>
            <h2 className="mt-1 text-lg font-semibold">{selectedQuestion ? 'Edit selected question' : 'No question selected'}</h2>
          </div>
          <Workflow size={19} className="text-[#6ea1ff]" />
        </div>
        {selectedQuestion ? (
          <QuestionSettings question={selectedQuestion} updateQuestion={updateQuestion} />
        ) : (
          <div className="mt-4 rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel-2)] p-4 text-sm text-[var(--muted)]">
            Select a question on the canvas or add one to {selectedSection.title}.
            <button onClick={() => addQuestion('shortText', selectedSection.id)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2d74ff] px-3 py-2 text-sm font-semibold text-white">
              <Plus size={15} />
              Add question
            </button>
          </div>
        )}
      </Card>
    </aside>
  );
}

function QuestionSettings({ question, updateQuestion }: { question: BuilderQuestion; updateQuestion: (questionId: string, updater: (question: BuilderQuestion) => BuilderQuestion) => void }) {
  const hasOptions = choiceQuestionTypes.includes(question.type);
  const patch = (updates: Partial<BuilderQuestion>) => updateQuestion(question.id, (current) => ({ ...current, ...updates }));
  const patchSettings = (updates: Partial<BuilderQuestion['settings']>) => updateQuestion(question.id, (current) => ({ ...current, settings: { ...current.settings, ...updates } }));

  return (
    <div className="mt-5 space-y-5">
      <SettingsGroup title="General">
        <BuilderInput label="Question Title" value={question.title} onChange={(value) => patch({ title: value })} />
        <BuilderInput label="Description" value={question.description} onChange={(value) => patch({ description: value })} textarea />
        <BuilderInput label="Placeholder Text" value={question.settings.placeholder} onChange={(value) => patchSettings({ placeholder: value })} />
      </SettingsGroup>
      <SettingsGroup title="Validation">
        <ToggleRow label="Required" checked={question.required} onChange={(value) => patch({ required: value })} />
        <NumberInput label="Minimum Length" value={question.settings.minLength ?? 0} onChange={(value) => patchSettings({ minLength: value })} />
        <NumberInput label="Maximum Length" value={question.settings.maxLength ?? 120} onChange={(value) => patchSettings({ maxLength: value })} />
      </SettingsGroup>
      {hasOptions && (
        <SettingsGroup title="Choice Options">
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div key={`${option}-${index}`} className="flex items-center gap-2">
                <GripVertical size={15} className="text-[var(--muted)]" />
                <input
                  value={option}
                  onChange={(event) =>
                    patch({
                      options: question.options.map((item, optionIndex) => (optionIndex === index ? event.target.value : item)),
                    })
                  }
                  className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none focus:border-[#2d74ff]"
                />
                <button onClick={() => patch({ options: question.options.filter((_, optionIndex) => optionIndex !== index) })} className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)]">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => patch({ options: [...question.options, `Option ${question.options.length + 1}`] })} className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold">
            <Plus size={15} />
            Add Option
          </button>
        </SettingsGroup>
      )}
      <SettingsGroup title="Appearance">
        <BuilderInput label="Help Text" value={question.settings.helpText} onChange={(value) => patchSettings({ helpText: value })} textarea />
        <BuilderInput label="Default Value" value={question.settings.defaultValue} onChange={(value) => patchSettings({ defaultValue: value })} />
      </SettingsGroup>
      <SettingsGroup title="Advanced">
        <ToggleRow label="Randomize Options" checked={question.settings.randomizeOptions} onChange={(value) => patchSettings({ randomizeOptions: value })} />
      </SettingsGroup>
    </div>
  );
}

function SurveySettingsPanel({ survey, updateSurvey }: { survey: BuilderSurvey; updateSurvey: (updater: (current: BuilderSurvey) => BuilderSurvey) => void }) {
  const updateSettings = (updater: (settings: BuilderSurvey['settings']) => BuilderSurvey['settings']) => updateSurvey((current) => ({ ...current, settings: updater(current.settings) }));
  return (
    <Card>
      <p className="text-sm font-semibold text-[#6ea1ff]">Survey settings</p>
      <div className="mt-5 space-y-5">
        <SettingsGroup title="General">
          <BuilderInput label="Survey Name" value={survey.title} onChange={(value) => updateSurvey((current) => ({ ...current, title: value }))} />
          <BuilderInput label="Survey Description" value={survey.description} onChange={(value) => updateSurvey((current) => ({ ...current, description: value }))} textarea />
        </SettingsGroup>
        <SettingsGroup title="Branding">
          <BuilderInput label="Logo Upload" value={survey.settings.branding.logoName} onChange={(value) => updateSettings((settings) => ({ ...settings, branding: { ...settings.branding, logoName: value } }))} />
          <BuilderInput label="Primary Color" value={survey.settings.branding.primaryColor} onChange={(value) => updateSettings((settings) => ({ ...settings, branding: { ...settings.branding, primaryColor: value } }))} />
          <BuilderInput label="Secondary Color" value={survey.settings.branding.secondaryColor} onChange={(value) => updateSettings((settings) => ({ ...settings, branding: { ...settings.branding, secondaryColor: value } }))} />
        </SettingsGroup>
        <SettingsGroup title="Behavior">
          <ToggleRow label="Anonymous Responses" checked={survey.settings.behavior.anonymousResponses} onChange={(value) => updateSettings((settings) => ({ ...settings, behavior: { ...settings.behavior, anonymousResponses: value } }))} />
          <ToggleRow label="Allow Multiple Responses" checked={survey.settings.behavior.allowMultipleResponses} onChange={(value) => updateSettings((settings) => ({ ...settings, behavior: { ...settings.behavior, allowMultipleResponses: value } }))} />
          <ToggleRow label="Progress Bar" checked={survey.settings.behavior.progressBar} onChange={(value) => updateSettings((settings) => ({ ...settings, behavior: { ...settings.behavior, progressBar: value } }))} />
        </SettingsGroup>
        <SettingsGroup title="Limits">
          <NumberInput label="Response Limit" value={survey.settings.limits.responseLimit} onChange={(value) => updateSettings((settings) => ({ ...settings, limits: { ...settings.limits, responseLimit: value } }))} />
          <BuilderInput label="Survey Expiration Date" value={survey.settings.limits.expirationDate} onChange={(value) => updateSettings((settings) => ({ ...settings, limits: { ...settings.limits, expirationDate: value } }))} />
        </SettingsGroup>
        <SettingsGroup title="Thank You Screen">
          <BuilderInput label="Title" value={survey.settings.thankYou.title} onChange={(value) => updateSettings((settings) => ({ ...settings, thankYou: { ...settings.thankYou, title: value } }))} />
          <BuilderInput label="Message" value={survey.settings.thankYou.message} onChange={(value) => updateSettings((settings) => ({ ...settings, thankYou: { ...settings.thankYou, message: value } }))} textarea />
        </SettingsGroup>
      </div>
    </Card>
  );
}

function SurveyPreview({ survey, device }: { survey: BuilderSurvey; device: PreviewDevice }) {
  const widthClass = device === 'desktop' ? 'max-w-5xl' : device === 'tablet' ? 'max-w-2xl' : 'max-w-sm';
  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4">
      <div className={`mx-auto rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-5 transition-all ${widthClass}`}>
        {survey.settings.behavior.progressBar && (
          <div className="mb-5 h-2 rounded-full bg-[var(--panel)]">
            <div className="h-2 w-1/3 rounded-full bg-[#2d74ff]" />
          </div>
        )}
        <h1 className="text-3xl font-semibold">{survey.title}</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{survey.description}</p>
        <div className="mt-8 space-y-8">
          {survey.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.questions.map((question) => (
                  <QuestionRenderer key={question.id} question={question} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 rounded-lg bg-[#2d74ff] px-5 py-3 text-sm font-semibold text-white">Submit response</button>
      </div>
    </section>
  );
}

function QuestionRenderer({ question }: { question: BuilderQuestion }) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold">{question.title} {question.required && <span className="text-[#6ea1ff]">*</span>}</p>
          {question.description && <p className="mt-1 text-sm text-[var(--muted)]">{question.description}</p>}
          {question.settings.helpText && <p className="mt-1 text-xs text-[var(--muted)]">{question.settings.helpText}</p>}
        </div>
        <span className="rounded-md bg-[#2d74ff]/12 px-2 py-1 text-xs font-semibold text-[#6ea1ff]">{questionTypeLabels[question.type]}</span>
      </div>
      <div className="mt-4">
        {question.type === 'shortText' && <input readOnly placeholder={question.settings.placeholder} className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none" />}
        {question.type === 'longText' && <textarea readOnly placeholder={question.settings.placeholder} className="min-h-24 w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none" />}
        {question.type === 'email' && <input readOnly placeholder="name@company.com" className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none" />}
        {question.type === 'phone' && <input readOnly placeholder="+91 98765 43210" className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none" />}
        {question.type === 'date' && <input readOnly placeholder="YYYY-MM-DD" className="w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none" />}
        {question.type === 'singleChoice' && <OptionList options={question.options} mode="radio" />}
        {question.type === 'multipleChoice' && <OptionList options={question.options} mode="checkbox" />}
        {question.type === 'dropdown' && <div className="rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm text-[var(--muted)]">Select an option</div>}
        {question.type === 'starRating' && <div className="flex gap-1 text-[#6ea1ff]">{[1, 2, 3, 4, 5].map((star) => <span key={star}>★</span>)}</div>}
        {question.type === 'nps' && <div className="grid grid-cols-11 gap-1">{Array.from({ length: 11 }, (_, index) => <span key={index} className="grid h-8 place-items-center rounded-md border border-[var(--line)] text-xs">{index}</span>)}</div>}
        {question.type === 'likert' && <OptionList options={question.options} mode="radio" />}
        {question.type === 'ranking' && <div className="space-y-2">{question.options.map((option, index) => <div key={option} className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--panel-2)] p-2 text-sm"><span className="text-[var(--muted)]">{index + 1}</span>{option}</div>)}</div>}
        {question.type === 'matrix' && <MatrixPreview />}
        {question.type === 'fileUpload' && <div className="rounded-lg border border-dashed border-[var(--line)] bg-[var(--panel-2)] p-6 text-center text-sm text-[var(--muted)]">Upload file</div>}
      </div>
    </div>
  );
}

function OptionList({ options, mode }: { options: string[]; mode: 'radio' | 'checkbox' }) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option} className="flex items-center gap-2 text-sm">
          <span className={`h-4 w-4 border border-[var(--line)] ${mode === 'radio' ? 'rounded-full' : 'rounded'}`} />
          {option}
        </div>
      ))}
    </div>
  );
}

function MatrixPreview() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead className="text-[var(--muted)]">
          <tr>
            <th className="py-2 text-left">Attribute</th>
            <th>Low</th>
            <th>Medium</th>
            <th>High</th>
          </tr>
        </thead>
        <tbody>
          {['Quality', 'Speed', 'Support'].map((row) => (
            <tr key={row} className="border-t border-[var(--line)]">
              <td className="py-2">{row}</td>
              {[1, 2, 3].map((item) => <td key={item} className="text-center"><span className="inline-block h-4 w-4 rounded-full border border-[var(--line)]" /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function BuilderInput({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  const className = 'mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none transition focus:border-[#2d74ff]';
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
      {textarea ? <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${className} min-h-20 resize-none`} /> : <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />}
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
      <input value={value} type="number" onChange={(event) => onChange(Number(event.target.value))} className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm outline-none transition focus:border-[#2d74ff]" />
    </label>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button onClick={() => onChange(!checked)} className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--panel-2)] px-3 py-2 text-sm">
      <span>{label}</span>
      <span className={`relative h-5 w-9 rounded-full transition ${checked ? 'bg-[#2d74ff]' : 'bg-[var(--line)]'}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${checked ? 'left-4' : 'left-0.5'}`} />
      </span>
    </button>
  );
}

function IconButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Plus; onClick: () => void }) {
  return (
    <button onClick={(event) => { event.stopPropagation(); onClick(); }} className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)] bg-[var(--panel-2)] text-[var(--muted)] transition hover:text-[#6ea1ff]" aria-label={label} title={label}>
      <Icon size={15} />
    </button>
  );
}

function createInitialBuilderSurvey(): BuilderSurvey {
  return {
    id: 'survey-customer-satisfaction',
    title: 'Customer Satisfaction Intelligence Survey',
    description: 'Understand what customers value, where friction exists, and which actions should be prioritized.',
    status: 'Draft',
    settings: {
      branding: { logoName: 'ActovIQ', primaryColor: '#2d74ff', secondaryColor: '#0f172a' },
      behavior: { anonymousResponses: true, allowMultipleResponses: false, progressBar: true },
      limits: { responseLimit: 5000, expirationDate: '2026-12-31' },
      thankYou: { title: 'Thank you', message: 'Your response will help us make better decisions.' },
    },
    sections: [
      {
        id: 'section-customer-experience',
        title: 'Customer experience',
        order: 0,
        questions: [
          createQuestion('nps', 'q-nps', 'How likely are you to recommend us?'),
          createQuestion('singleChoice', 'q-csat', 'Which area should we improve first?'),
          createQuestion('longText', 'q-context', 'What should leadership know about your experience?'),
        ].map(withOrder),
      },
      {
        id: 'section-contact',
        title: 'Follow-up details',
        order: 1,
        questions: [createQuestion('email', 'q-email', 'Where can we contact you if we need context?')].map(withOrder),
      },
    ],
  };
}

function createQuestion(type: BuilderQuestionType, id = createId('question'), title = questionTypeLabels[type]): BuilderQuestion {
  const hasOptions = choiceQuestionTypes.includes(type);
  return {
    id,
    type,
    title,
    description: defaultDescription(type),
    required: ['email', 'nps', 'singleChoice'].includes(type),
    settings: {
      placeholder: defaultPlaceholder(type),
      minLength: type === 'shortText' || type === 'longText' ? 2 : undefined,
      maxLength: type === 'longText' ? 500 : type === 'shortText' ? 120 : undefined,
      helpText: '',
      defaultValue: '',
      randomizeOptions: false,
    },
    options: hasOptions ? defaultOptions(type) : [],
    order: 0,
  };
}

function defaultOptions(type: BuilderQuestionType) {
  if (type === 'likert') return ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
  if (type === 'matrix') return ['Quality', 'Speed', 'Support'];
  return ['Product experience', 'Pricing', 'Support', 'Delivery'];
}

function defaultDescription(type: BuilderQuestionType) {
  if (type === 'nps') return 'Use this to measure referral intent.';
  if (type === 'fileUpload') return 'Collect supporting documents or screenshots.';
  return 'Edit this question to match the decision you need to make.';
}

function defaultPlaceholder(type: BuilderQuestionType) {
  if (type === 'email') return 'name@company.com';
  if (type === 'phone') return '+91 98765 43210';
  if (type === 'date') return 'YYYY-MM-DD';
  return 'Type your answer';
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function withOrder<T extends { order: number }>(item: T, index: number): T {
  return { ...item, order: index };
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number) {
  const next = [...items];
  const [item] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, item);
  return next;
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

function HelpPage() {
  return (
    <ContentPage
      eyebrow="Help"
      title="Get unstuck and move faster with ActovIQ."
      copy="Find product guidance, support paths, setup help, and best practices for turning customer signal into action."
      items={[
        ['Product support', 'Get help with workspaces, access, billing, and deployment questions.'],
        ['Builder guidance', 'Learn how to write better prompts and generate stronger intelligence workflows.'],
        ['Report quality', 'Improve summaries, recommendations, and action plans for leadership teams.'],
      ]}
    />
  );
}

function AboutPage({ setPage }: { setPage: (page: Page) => void }) {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <PageHeader
            eyebrow="About us"
            title="We are building the intelligence layer for customer decisions."
            copy="ActovIQ starts in India with a global-ready architecture for startups, SMBs, enterprises, agencies, healthcare, education, and public-sector teams."
          />
          <button onClick={() => setPage('builder')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2d74ff] px-5 py-3 text-sm font-semibold text-white">
            Explore Builder
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['Mission', 'Help teams stop guessing and start acting on customer intelligence.'],
            ['Point of view', 'Collection is only step one. The real value is automated decisions.'],
            ['Market focus', 'India-first execution with product architecture built for global scale.'],
            ['Roadmap', 'Voice, image, video feedback, mobile apps, and enterprise intelligence systems.'],
          ].map(([title, copy]) => (
            <Card key={title}>
              <Sparkles className="text-[#6ea1ff]" size={22} />
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function ContentPage({
  eyebrow,
  title,
  copy = 'Clear, practical guidance for teams building customer intelligence operations.',
  items,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  items: string[][];
}) {
  return (
    <main className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow={eyebrow} title={title} copy={copy} />
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
