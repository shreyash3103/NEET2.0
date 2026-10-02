import React, { useState } from 'react';
import {
  Timer,
  Target,
  BookOpen,
  FileQuestion,
  Highlighter,
  AlertOctagon,
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { StudyTimer } from './StudyTimer';
import { DailyTargets } from './DailyTargets';
import { SyllabusTracker } from './SyllabusTracker';
import { PYQBank } from './PYQBank';
import { NcertHighlighter } from './NcertHighlighter';
import { MistakeNotebook } from './MistakeNotebook';
import {
  DailyTarget,
  SyllabusChapter,
  PYQuestion,
  NcertLine,
  MistakeLog,
  StudySession,
  UserProfile
} from './types';

interface NeetDashboardProps {
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  // State and handlers
  targets: DailyTarget[];
  onAddTarget: (target: Omit<DailyTarget, 'id' | 'createdAt' | 'completed'>) => void;
  onToggleTarget: (id: string) => void;
  onDeleteTarget: (id: string) => void;
  // Syllabus
  chapters: SyllabusChapter[];
  onToggleChapter: (id: string) => void;
  onIncrementRevision: (id: string) => void;
  // PYQ
  questions: PYQuestion[];
  onToggleBookmarkPYQ: (id: string) => void;
  // NCERT
  ncertLines: NcertLine[];
  onToggleBookmarkNcert: (id: string) => void;
  onAddNcertLine: (line: Omit<NcertLine, 'id'>) => void;
  // Mistakes
  mistakeLogs: MistakeLog[];
  onAddMistakeLog: (log: Omit<MistakeLog, 'id' | 'date'>) => void;
  onDeleteMistakeLog: (id: string) => void;
  // Timer Sessions
  sessions: StudySession[];
  onSessionComplete: (session: StudySession) => void;
}

export type DashboardTab = 'timer' | 'targets' | 'syllabus' | 'pyq' | 'ncert' | 'mistakes';

export const NeetDashboard: React.FC<NeetDashboardProps> = ({
  currentUser,
  onOpenAuth,
  targets,
  onAddTarget,
  onToggleTarget,
  onDeleteTarget,
  chapters,
  onToggleChapter,
  onIncrementRevision,
  questions,
  onToggleBookmarkPYQ,
  ncertLines,
  onToggleBookmarkNcert,
  onAddNcertLine,
  mistakeLogs,
  onAddMistakeLog,
  onDeleteMistakeLog,
  sessions,
  onSessionComplete
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('targets');

  // Stats calculation (Authentic only - no bots or fake metrics)
  const totalStudiedMinutes = sessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const realHours = Math.floor(totalStudiedMinutes / 60);
  const realMins = totalStudiedMinutes % 60;

  const completedTargets = targets.filter((t) => t.completed).length;
  const completedChapters = chapters.filter((c) => c.completed).length;
  const syllabusPercent = Math.round((completedChapters / chapters.length) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6 text-[#dfe7e0]">
      {/* Top Banner with Aspirant Profile & Verified Metrics */}
      <div className="p-5 rounded-2xl bg-[#0a0e12] border border-[#dfe7e0]/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#e0231c]/15 border border-[#e0231c]/40 flex items-center justify-center text-[#e0231c] font-semibold text-lg">
            {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'N'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium text-[#dfe7e0]">
                {currentUser ? `${currentUser.name}’s Mission NEET 2027` : 'NEET 2027 Aspirant Command Center'}
              </h1>
              <span className="text-[11px] text-[#c9a24a] font-mono flex items-center gap-1">
                <ShieldCheck size={13} /> Authentic Study Hub
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#aab4ad] mt-0.5 flex-wrap">
              <span>{currentUser ? currentUser.email : 'Guest Student'}</span>
              <span aria-hidden="true">·</span>
              <span>Target: {currentUser ? `${currentUser.targetScore}/720` : '700+ AIR'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#dfe7e0]">Syllabus: {syllabusPercent}% Done</span>
            </div>
          </div>
        </div>

        {/* Real Stats Pill & Auth Button */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3 bg-[#05070a] px-3.5 py-2 rounded-xl border border-[#dfe7e0]/10 text-xs">
            <div>
              <div className="text-[10px] text-[#aab4ad]">Real Deep Study</div>
              <div className="text-sm font-mono text-[#dfe7e0] font-medium">{realHours}h {realMins}m</div>
            </div>
            <div className="w-[1px] h-6 bg-[#dfe7e0]/10" />
            <div>
              <div className="text-[10px] text-[#aab4ad]">Targets Done</div>
              <div className="text-sm font-mono text-[#dfe7e0] font-medium">{completedTargets}/{targets.length}</div>
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 transition ${
              currentUser
                ? 'bg-[#dfe7e0]/10 hover:bg-[#dfe7e0]/15 text-[#dfe7e0] border border-[#dfe7e0]/20'
                : 'bg-[#e0231c] hover:bg-[#e0231c]/90 text-white shadow-md'
            }`}
          >
            <User size={14} />
            {currentUser ? 'My Gmail Account' : 'Sign In with Gmail'}
          </button>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#0a0e12] rounded-xl border border-[#dfe7e0]/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('targets')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'targets'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <Target size={15} />
          <span>Daily Targets</span>
          {targets.filter((t) => !t.completed).length > 0 && (
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center font-mono">
              {targets.filter((t) => !t.completed).length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('timer')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'timer'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <Timer size={15} />
          <span>Pomodoro Timer</span>
        </button>

        <button
          onClick={() => setActiveTab('syllabus')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'syllabus'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <BookOpen size={15} />
          <span>NEET 2027 Syllabus</span>
        </button>

        <button
          onClick={() => setActiveTab('pyq')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'pyq'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <FileQuestion size={15} />
          <span>NEET &amp; JEE PYQs</span>
        </button>

        <button
          onClick={() => setActiveTab('ncert')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'ncert'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <Highlighter size={15} />
          <span>NCERT Golden Lines</span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex items-center gap-2 px-4 py-2 text-xs rounded-lg transition whitespace-nowrap ${
            activeTab === 'mistakes'
              ? 'bg-[#e0231c] text-white font-medium shadow-sm'
              : 'text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          <AlertOctagon size={15} />
          <span>Error Log</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="bg-[#05070a] p-6 rounded-2xl border border-[#dfe7e0]/10 shadow-lg min-h-[500px]">
        {activeTab === 'targets' && (
          <DailyTargets
            targets={targets}
            onAddTarget={onAddTarget}
            onToggleTarget={onToggleTarget}
            onDeleteTarget={onDeleteTarget}
          />
        )}

        {activeTab === 'timer' && (
          <StudyTimer
            onSessionComplete={onSessionComplete}
            sessions={sessions}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusTracker
            chapters={chapters}
            onToggleChapter={onToggleChapter}
            onIncrementRevision={onIncrementRevision}
          />
        )}

        {activeTab === 'pyq' && (
          <PYQBank
            questions={questions}
            onToggleBookmark={onToggleBookmarkPYQ}
          />
        )}

        {activeTab === 'ncert' && (
          <NcertHighlighter
            lines={ncertLines}
            onToggleBookmark={onToggleBookmarkNcert}
            onAddLine={onAddNcertLine}
          />
        )}

        {activeTab === 'mistakes' && (
          <MistakeNotebook
            logs={mistakeLogs}
            onAddLog={onAddMistakeLog}
            onDeleteLog={onDeleteMistakeLog}
          />
        )}
      </div>
    </div>
  );
};
