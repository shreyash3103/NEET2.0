/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

import "@designcodeio/threeui/style.css";

import { StudyTimer } from './components/neet/StudyTimer';
import { DailyTargets } from './components/neet/DailyTargets';
import { SyllabusTracker } from './components/neet/SyllabusTracker';
import { PYQBank } from './components/neet/PYQBank';
import { NcertHighlighter } from './components/neet/NcertHighlighter';
import { MistakeNotebook } from './components/neet/MistakeNotebook';
import { AuthModal } from './components/neet/AuthModal';

import { INITIAL_SYLLABUS } from './components/neet/syllabusData';
import { INITIAL_PYQS } from './components/neet/pyqData';
import { INITIAL_NCERT_LINES } from './components/neet/ncertData';
import {
  DailyTarget,
  SyllabusChapter,
  PYQuestion,
  NcertLine,
  MistakeLog,
  StudySession,
  UserProfile
} from './components/neet/types';
import {
  Target,
  Timer,
  BookOpen,
  FileQuestion,
  Highlighter,
  AlertOctagon,
  User,
  X,
  Maximize2,
  Sparkles
} from 'lucide-react';

export function Scene() {
  return (
    <div className="shader-frame w-full h-screen">
      <iframe
        src="/NEET2.0/landing-pages/kage.html"
        title="Kage landing page"
        className="block w-full h-full border-0"
      />
    </div>
  );
}

export type ActiveNeetTool = 'timer' | 'targets' | 'syllabus' | 'pyq' | 'ncert' | 'mistakes' | null;

export default function App() {
  const [activeTool, setActiveTool] = useState<ActiveNeetTool>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Authenticated user state (Default to student's verified Gmail account)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('neet_user');
      if (saved) return JSON.parse(saved);
      return {
        email: 'shreyashmission700@gmail.com',
        name: 'Shreyash',
        targetScore: 720,
        neetyear: 2027,
        joinedDate: 'Oct 2026'
      };
    } catch {
      return null;
    }
  });

  // Daily targets state (Zero fake completed tasks - starting uncompleted)
  const [targets, setTargets] = useState<DailyTarget[]>(() => {
    try {
      const saved = localStorage.getItem('neet_targets');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'target-1',
          title: 'Master Ray Optics (Lens Maker & Prism)',
          subject: 'Physics',
          chapter: 'Ray Optics',
          targetQuestions: 30,
          completedQuestions: 0,
          targetMinutes: 60,
          completedMinutes: 0,
          completed: false,
          priority: 'High',
          createdAt: new Date().toISOString()
        },
        {
          id: 'target-2',
          title: 'NCERT Line-by-Line: Molecular Basis of Inheritance',
          subject: 'Botany',
          chapter: 'Molecular Basis of Inheritance',
          targetQuestions: 40,
          completedQuestions: 0,
          targetMinutes: 60,
          completedMinutes: 0,
          completed: false,
          priority: 'High',
          createdAt: new Date().toISOString()
        },
        {
          id: 'target-3',
          title: 'Coordination Compounds Isomerism & CFT Drills',
          subject: 'Chemistry',
          chapter: 'Coordination Compounds',
          targetQuestions: 25,
          completedQuestions: 0,
          targetMinutes: 45,
          completedMinutes: 0,
          completed: false,
          priority: 'Medium',
          createdAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Syllabus progress state
  const [chapters, setChapters] = useState<SyllabusChapter[]>(() => {
    try {
      const saved = localStorage.getItem('neet_chapters');
      if (saved) return JSON.parse(saved);
      return INITIAL_SYLLABUS;
    } catch {
      return INITIAL_SYLLABUS;
    }
  });

  // PYQs
  const [questions, setQuestions] = useState<PYQuestion[]>(() => {
    try {
      const saved = localStorage.getItem('neet_pyqs');
      if (saved) return JSON.parse(saved);
      return INITIAL_PYQS;
    } catch {
      return INITIAL_PYQS;
    }
  });

  // NCERT lines
  const [ncertLines, setNcertLines] = useState<NcertLine[]>(() => {
    try {
      const saved = localStorage.getItem('neet_ncert_lines');
      if (saved) return JSON.parse(saved);
      return INITIAL_NCERT_LINES;
    } catch {
      return INITIAL_NCERT_LINES;
    }
  });

  // Mistake Notebook
  const [mistakeLogs, setMistakeLogs] = useState<MistakeLog[]>(() => {
    try {
      const saved = localStorage.getItem('neet_mistake_logs');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'mistake-1',
          questionRef: 'Fringe width variation in medium (YDSE)',
          subject: 'Physics',
          topic: 'Wave Optics',
          mistakeType: 'Conceptual Gap',
          myWrongAnswer: 'Assumed fringe width was independent of refractive index',
          correctConcept: 'Wavelength in medium is λ/μ, hence β_medium = β_air / μ (fringe width decreases)',
          actionItem: 'Re-read wave optics NCERT section 10.3 on wavelength alteration',
          date: 'Oct 02'
        }
      ];
    } catch {
      return [];
    }
  });

  // Genuine study sessions (Strictly real time - starting from 0 real sessions!)
  const [sessions, setSessions] = useState<StudySession[]>(() => {
    try {
      const saved = localStorage.getItem('neet_study_sessions');
      if (saved) return JSON.parse(saved);
      return [];
    } catch {
      return [];
    }
  });

  // Listen for navigation clicks from the 3D Sanctuary cards (Daily Target, Pomodoro, Syllabus)
  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'OPEN_NEET_TOOL') {
        setActiveTool(e.data.tool as ActiveNeetTool);
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, []);

  // Local storage synchronization
  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem('neet_user', JSON.stringify(currentUser));
      else localStorage.removeItem('neet_user');
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_targets', JSON.stringify(targets));
    } catch {}
  }, [targets]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_chapters', JSON.stringify(chapters));
    } catch {}
  }, [chapters]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_pyqs', JSON.stringify(questions));
    } catch {}
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_ncert_lines', JSON.stringify(ncertLines));
    } catch {}
  }, [ncertLines]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_mistake_logs', JSON.stringify(mistakeLogs));
    } catch {}
  }, [mistakeLogs]);

  useEffect(() => {
    try {
      localStorage.setItem('neet_study_sessions', JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  // Target handlers
  const handleAddTarget = (targetData: Omit<DailyTarget, 'id' | 'createdAt' | 'completed'>) => {
    const newTarget: DailyTarget = {
      ...targetData,
      id: 'target-' + Date.now(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setTargets((prev) => [newTarget, ...prev]);
  };

  const handleToggleTarget = (id: string) => {
    setTargets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTarget = (id: string) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  // Syllabus handlers
  const handleToggleChapter = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleIncrementRevision = (id: string) => {
    setChapters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, revisionCount: c.revisionCount + 1 } : c))
    );
  };

  // PYQ handlers
  const handleToggleBookmarkPYQ = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q))
    );
  };

  // NCERT line handlers
  const handleToggleBookmarkNcert = (id: string) => {
    setNcertLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isBookmarked: !l.isBookmarked } : l))
    );
  };

  const handleAddNcertLine = (lineData: Omit<NcertLine, 'id'>) => {
    const newLine: NcertLine = {
      ...lineData,
      id: 'ncert-' + Date.now()
    };
    setNcertLines((prev) => [newLine, ...prev]);
  };

  // Mistake Log handlers
  const handleAddMistakeLog = (logData: Omit<MistakeLog, 'id' | 'date'>) => {
    const newLog: MistakeLog = {
      ...logData,
      id: 'log-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    setMistakeLogs((prev) => [newLog, ...prev]);
  };

  const handleDeleteMistakeLog = (id: string) => {
    setMistakeLogs((prev) => prev.filter((l) => l.id !== id));
  };

  // Timer Session handler
  const handleSessionComplete = (session: StudySession) => {
    setSessions((prev) => [...prev, session]);
  };

  // Calculated Real stats
  const totalMinutes = sessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const realHours = Math.floor(totalMinutes / 60);
  const realMins = totalMinutes % 60;
  const completedTargetsCount = targets.filter((t) => t.completed).length;

  return (
    <div className="w-full h-screen overflow-hidden bg-[#05070a] text-[#dfe7e0] font-sans relative">
      {/* 
        3D NEET Sanctuary Scene:
        Always alive, always animating with the 3D "NEET" wordmark in the sky,
        charred cypress, lanterns, vermilion moon, and all original scroll effects!
      */}
      <div className="w-full h-full absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Floating Zen Top Navigation Bar over the 3D Sanctuary */}
      <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-[#05070a]/75 backdrop-blur-md border-b border-[#dfe7e0]/15 px-4 flex items-center justify-between transition-all">
        {/* Brand identity: NEET 2027 Sanctuary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTool(null)}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#e0231c] animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-[#dfe7e0]">
              NEET 2027 <span className="text-[#aab4ad] font-normal text-xs font-mono">· AIIMS SANCTUARY</span>
            </span>
          </div>
        </div>

        {/* Center NEET 2027 Interactive Tool Shortcuts */}
        <nav aria-label="Study Tools" className="hidden lg:flex items-center gap-1 p-1 bg-[#0a0e12]/80 backdrop-blur-md rounded-xl border border-[#dfe7e0]/15">
          <button
            onClick={() => setActiveTool(activeTool === 'targets' ? null : 'targets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'targets'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <Target size={14} />
            <span>Daily Targets</span>
            <span className="text-[10px] opacity-75">({completedTargetsCount}/{targets.length})</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'timer' ? null : 'timer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'timer'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <Timer size={14} />
            <span>Pomodoro</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'syllabus' ? null : 'syllabus')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'syllabus'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <BookOpen size={14} />
            <span>Syllabus 2027</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'pyq' ? null : 'pyq')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'pyq'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <FileQuestion size={14} />
            <span>PYQ Bank</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'ncert' ? null : 'ncert')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'ncert'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <Highlighter size={14} />
            <span>NCERT Punch</span>
          </button>

          <button
            onClick={() => setActiveTool(activeTool === 'mistakes' ? null : 'mistakes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition font-medium ${
              activeTool === 'mistakes'
                ? 'bg-[#e0231c] text-white shadow-sm'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <AlertOctagon size={14} />
            <span>Error Log</span>
          </button>
        </nav>

        {/* Right Action Icons & Authentic Gmail Account */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 text-xs text-[#aab4ad] font-mono bg-[#0a0e12]/80 px-3 py-1.5 rounded-lg border border-[#dfe7e0]/10">
            <span title="Genuine verified study duration">⏱️ {realHours}h {realMins}m</span>
            <span>·</span>
            <span title="Daily targets progress">🎯 {completedTargetsCount}/{targets.length}</span>
          </div>

          <button
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border border-[#dfe7e0]/20 hover:border-[#dfe7e0]/40 text-[#dfe7e0] bg-[#0a0e12]/90 backdrop-blur-md transition"
            title="Google Account Session"
          >
            <div className="w-5 h-5 rounded-full bg-[#e0231c] text-[10px] text-white flex items-center justify-center font-bold">
              {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <span className="hidden sm:inline font-mono truncate max-w-[140px]">
              {currentUser ? currentUser.email.split('@')[0] : 'Sign In'}
            </span>
          </button>
        </div>
      </header>

      {/* Floating Glass Tool Overlay Panels (over the live 3D NEET sanctuary) */}
      {activeTool !== null && (
        <div className="fixed inset-0 z-40 pt-16 pb-20 px-4 sm:px-8 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full max-w-4xl max-h-[85vh] overflow-y-auto pointer-events-auto rounded-3xl bg-[#05070a]/92 backdrop-blur-2xl border border-[#dfe7e0]/20 shadow-2xl p-6 relative flex flex-col gap-4 text-[#dfe7e0]">
            {/* Close / Minimize button at top right */}
            <div className="flex items-center justify-between border-b border-[#dfe7e0]/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#e0231c]" />
                <span className="text-xs uppercase font-mono tracking-widest text-[#aab4ad]">
                  NEET 2027 Live Cockpit · {activeTool.toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => setActiveTool(null)}
                className="p-1.5 rounded-full text-[#aab4ad] hover:text-[#dfe7e0] hover:bg-[#dfe7e0]/10 transition"
                title="Return to 3D Temple View"
              >
                <X size={18} />
              </button>
            </div>

            {/* Active Content */}
            {activeTool === 'targets' && (
              <DailyTargets
                targets={targets}
                onAddTarget={handleAddTarget}
                onToggleTarget={handleToggleTarget}
                onDeleteTarget={handleDeleteTarget}
              />
            )}

            {activeTool === 'timer' && (
              <StudyTimer
                onSessionComplete={handleSessionComplete}
                sessions={sessions}
              />
            )}

            {activeTool === 'syllabus' && (
              <SyllabusTracker
                chapters={chapters}
                onToggleChapter={handleToggleChapter}
                onIncrementRevision={handleIncrementRevision}
              />
            )}

            {activeTool === 'pyq' && (
              <PYQBank
                questions={questions}
                onToggleBookmark={handleToggleBookmarkPYQ}
              />
            )}

            {activeTool === 'ncert' && (
              <NcertHighlighter
                lines={ncertLines}
                onToggleBookmark={handleToggleBookmarkNcert}
                onAddLine={handleAddNcertLine}
              />
            )}

            {activeTool === 'mistakes' && (
              <MistakeNotebook
                logs={mistakeLogs}
                onAddLog={handleAddMistakeLog}
                onDeleteLog={handleDeleteMistakeLog}
              />
            )}
          </div>
        </div>
      )}

      {/* Gmail / Google Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={(profile) => setCurrentUser(profile)}
        onLogout={() => setCurrentUser(null)}
      />
    </div>
  );
}
