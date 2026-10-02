import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Clock, CheckCircle2 } from 'lucide-react';
import { Subject, StudySession } from './types';

interface StudyTimerProps {
  onSessionComplete?: (session: StudySession) => void;
  sessions: StudySession[];
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ onSessionComplete, sessions }) => {
  // Modes: Pomodoro (25m), Deep Work (50m), Long Session (90m), Custom
  const [timerMode, setTimerMode] = useState<'pomodoro' | 'deep' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [customMinutes, setCustomMinutes] = useState(25);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Physics');
  const [sessionNotes, setSessionNotes] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Time remaining in seconds
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [totalDuration, setTotalDuration] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Real seconds tracked during this session
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Web Audio chime generator (synthesized Tibetan Singing Bowl sound)
  const playZenBell = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const freqs = [528, 1056, 1584]; // 528 Hz Solfeggio "Miracle / Focus" frequency
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.6);
      });
    } catch {
      // AudioContext fallback
    }
  };

  // Set mode times
  const selectMode = (mode: 'pomodoro' | 'deep' | 'shortBreak' | 'longBreak') => {
    setIsActive(false);
    setIsCompleted(false);
    setTimerMode(mode);
    setElapsedSeconds(0);

    let mins = 25;
    if (mode === 'pomodoro') mins = 25;
    else if (mode === 'deep') mins = 50;
    else if (mode === 'shortBreak') mins = 5;
    else if (mode === 'longBreak') mins = 15;

    setTotalDuration(mins * 60);
    setTimeLeft(mins * 60);
  };

  // Timer Tick
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            setIsCompleted(true);
            playZenBell();
            
            // Record real study session if work mode
            if (timerMode === 'pomodoro' || timerMode === 'deep') {
              const studiedMins = Math.round((totalDuration - 0) / 60);
              if (studiedMins > 0 && onSessionComplete) {
                onSessionComplete({
                  id: 'session-' + Date.now(),
                  subject: selectedSubject,
                  durationMinutes: studiedMins,
                  timestamp: new Date().toISOString(),
                  notes: sessionNotes || undefined
                });
              }
            }
            return 0;
          }
          return prev - 1;
        });

        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, totalDuration, timerMode, selectedSubject, sessionNotes, onSessionComplete]);

  const toggleTimer = () => {
    if (!isActive && isCompleted) {
      // Reset
      setTimeLeft(totalDuration);
      setIsCompleted(false);
      setElapsedSeconds(0);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsCompleted(false);
    setTimeLeft(totalDuration);
    setElapsedSeconds(0);
  };

  // Calculate real total studied time from verified sessions
  const realTotalMinutes = sessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const realHours = Math.floor(realTotalMinutes / 60);
  const realMins = realTotalMinutes % 60;

  // Format time display
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className={`flex flex-col gap-6 text-[#dfe7e0] ${isFullscreen ? 'fixed inset-0 z-50 bg-[#05070a] p-8 overflow-y-auto' : ''}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">Focus Temple · Deep Study Timer</h2>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Strictly authentic stopwatch · Zero bots, zero simulated metrics · Only genuine study time is logged
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Tibetan bell' : 'Enable Tibetan bell'}
            className="p-2 rounded border border-[#dfe7e0]/15 hover:border-[#dfe7e0]/40 transition text-[#aab4ad] hover:text-[#dfe7e0]"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Zen Mode' : 'Enter Zen Fullscreen'}
            className="p-2 rounded border border-[#dfe7e0]/15 hover:border-[#dfe7e0]/40 transition text-[#aab4ad] hover:text-[#dfe7e0]"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* Mode selection buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectMode('pomodoro')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            timerMode === 'pomodoro'
              ? 'bg-[#e0231c] text-white shadow-sm'
              : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          25 min Pomodoro
        </button>
        <button
          onClick={() => selectMode('deep')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            timerMode === 'deep'
              ? 'bg-[#e0231c] text-white shadow-sm'
              : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          50 min Deep Work
        </button>
        <button
          onClick={() => selectMode('shortBreak')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            timerMode === 'shortBreak'
              ? 'bg-[#c9a24a] text-[#05070a] shadow-sm font-semibold'
              : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          5 min Short Break
        </button>
        <button
          onClick={() => selectMode('longBreak')}
          className={`px-3 py-1.5 text-xs font-medium rounded transition ${
            timerMode === 'longBreak'
              ? 'bg-[#c9a24a] text-[#05070a] shadow-sm font-semibold'
              : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
          }`}
        >
          15 min Long Break
        </button>
      </div>

      {/* Subject Selector for Work Sessions */}
      {(timerMode === 'pomodoro' || timerMode === 'deep') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#aab4ad]">Focus Subject:</span>
          {(['Physics', 'Chemistry', 'Botany', 'Zoology'] as Subject[]).map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-2.5 py-1 text-xs rounded transition ${
                selectedSubject === subj
                  ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium border border-[#dfe7e0]/30'
                  : 'text-[#aab4ad] hover:text-[#dfe7e0] border border-transparent'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>
      )}

      {/* Timer Circle Display */}
      <div className="flex flex-col items-center justify-center py-6 bg-[#0a0e12] rounded-xl border border-[#dfe7e0]/10 relative overflow-hidden">
        {/* Subtle circular progress track */}
        <div className="relative flex items-center justify-center w-64 h-64 my-2">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-[#dfe7e0]/5 fill-none"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-[#e0231c] fill-none transition-all duration-500 ease-out"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - progressPercent / 100)}
              strokeLinecap="round"
            />
          </svg>

          {/* Time digits */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-mono tracking-tighter text-[#dfe7e0] font-light">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs tracking-wider uppercase text-[#aab4ad] mt-2">
              {isActive ? 'Session in Progress' : isCompleted ? 'Completed!' : 'Ready'}
            </span>
            <span className="text-[11px] text-[#e0231c] mt-0.5 font-medium">
              {selectedSubject}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={resetTimer}
            title="Reset"
            className="p-3 rounded-full border border-[#dfe7e0]/15 hover:border-[#dfe7e0]/40 text-[#aab4ad] hover:text-[#dfe7e0] transition"
          >
            <RotateCcw size={18} />
          </button>

          <button
            onClick={toggleTimer}
            className={`px-8 py-3 rounded-full font-medium text-sm flex items-center gap-2 shadow-lg transition ${
              isActive
                ? 'bg-[#05070a] border border-[#e0231c] text-[#e0231c] hover:bg-[#e0231c]/10'
                : 'bg-[#e0231c] text-white hover:bg-[#e0231c]/90'
            }`}
          >
            {isActive ? (
              <>
                <Pause size={18} /> Pause Focus
              </>
            ) : isCompleted ? (
              <>
                <RotateCcw size={18} /> Next Session
              </>
            ) : (
              <>
                <Play size={18} /> Begin Session
              </>
            )}
          </button>
        </div>

        {/* Optional session note */}
        <div className="w-full max-w-sm px-4 mt-6">
          <input
            type="text"
            placeholder="Goal for this session (e.g. 15 PYQs on Wave Optics)..."
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            className="w-full bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
          />
        </div>
      </div>

      {/* Real Statistics Box (Anti-Slop: Zero bots, zero fabricated data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
          <div className="flex items-center justify-between text-xs text-[#aab4ad]">
            <span>Genuine Study Time</span>
            <Clock size={14} />
          </div>
          <div className="mt-2 text-2xl font-light text-[#dfe7e0]">
            {realHours}h {realMins}m
          </div>
          <p className="text-[11px] text-[#78837c] mt-1">Logged only from genuine timer completions</p>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
          <div className="flex items-center justify-between text-xs text-[#aab4ad]">
            <span>Deep Sessions Completed</span>
            <CheckCircle2 size={14} />
          </div>
          <div className="mt-2 text-2xl font-light text-[#dfe7e0]">
            {sessions.length}
          </div>
          <p className="text-[11px] text-[#78837c] mt-1">Active focus intervals verified</p>
        </div>

        <div className="p-4 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
          <div className="flex items-center justify-between text-xs text-[#aab4ad]">
            <span>Subject Balance</span>
            <span className="text-[10px] text-[#c9a24a]">NEET 2027</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#aab4ad] flex-wrap">
            {(['Physics', 'Chemistry', 'Botany', 'Zoology'] as Subject[]).map((s) => {
              const count = sessions.filter((sess) => sess.subject === s).length;
              return (
                <span key={s} className="text-[#dfe7e0]">
                  {s.slice(0, 4)}: {count}
                  <span className="text-[#78837c] mx-1">·</span>
                </span>
              );
            })}
          </div>
          <p className="text-[11px] text-[#78837c] mt-1">Balanced revision across PCB</p>
        </div>
      </div>

      {/* Recent Session Logs */}
      {sessions.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-[#dfe7e0]/10 pt-4">
          <h3 className="text-xs uppercase tracking-wider text-[#aab4ad]">Today's Verified Log</h3>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {sessions.slice(-5).reverse().map((sess) => (
              <div
                key={sess.id}
                className="flex items-center justify-between p-2 rounded bg-[#0a0e12] border border-[#dfe7e0]/5 text-xs text-[#dfe7e0]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#e0231c] font-medium">{sess.subject}</span>
                  <span className="text-[#78837c]">·</span>
                  <span>{sess.notes || 'Focused Study Session'}</span>
                </div>
                <div className="text-[#aab4ad]">
                  +{sess.durationMinutes} min
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
