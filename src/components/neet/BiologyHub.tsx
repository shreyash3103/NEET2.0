import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Bookmark, BookmarkCheck, Check, Flower2, Leaf, Search, X } from 'lucide-react';
import { NcertLine, PYQuestion, SyllabusChapter, Subject } from './types';

type BiologySubject = Extract<Subject, 'Botany' | 'Zoology'>;
type BiologyView = 'home' | 'chapters' | 'ncert' | 'pyq';

interface BiologyHubProps {
  chapters: SyllabusChapter[];
  questions: PYQuestion[];
  ncertLines: NcertLine[];
  onToggleChapter: (id: string) => void;
  onToggleBookmarkPYQ: (id: string) => void;
  onToggleBookmarkNcert: (id: string) => void;
  onClose: () => void;
}

const subjectDetails: Record<BiologySubject, { icon: typeof Leaf; description: string; image: string; alt: string }> = {
  Botany: {
    icon: Leaf,
    description: 'Plant diversity, structure, physiology, genetics and ecology.',
    image: 'inner-green-assets/card-ethos.jpg',
    alt: 'A cushion of moss and lichen in a shaded forest ecosystem'
  },
  Zoology: {
    icon: Flower2,
    description: 'Animal diversity, human physiology, reproduction and evolution.',
    image: 'inner-green-assets/card-ecostove.jpg',
    alt: 'A quiet, green woodland habitat'
  }
};

export const BiologyHub: React.FC<BiologyHubProps> = ({
  chapters,
  questions,
  ncertLines,
  onToggleChapter,
  onToggleBookmarkPYQ,
  onToggleBookmarkNcert,
  onClose
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [view, setView] = useState<BiologyView>('home');
  const [subject, setSubject] = useState<BiologySubject>('Botany');
  const [grade, setGrade] = useState<'All' | 'Class 11' | 'Class 12'>('All');
  const [search, setSearch] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleSceneAction = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type !== 'neet-biology-action') return;
      switch (event.data.action) {
        case 'close': onClose(); break;
        case 'botany': case 'chapters': setSubject('Botany'); setView('chapters'); break;
        case 'zoology': setSubject('Zoology'); setView('chapters'); break;
        case 'ncert': setView('ncert'); break;
        case 'pyq': setView('pyq'); break;
      }
    };
    window.addEventListener('message', handleSceneAction);
    return () => window.removeEventListener('message', handleSceneAction);
  }, [onClose]);

  const allBiologyChapters = chapters.filter((chapter) => chapter.subject === 'Botany' || chapter.subject === 'Zoology');
  const subjectChapters = useMemo(() => chapters.filter((chapter) => chapter.subject === subject), [chapters, subject]);
  const shownChapters = subjectChapters.filter((chapter) => {
    const matchesGrade = grade === 'All' || chapter.grade === grade;
    const matchesSearch = `${chapter.name} ${chapter.unit} ${chapter.subtopics.join(' ')}`.toLowerCase().includes(search.toLowerCase());
    return matchesGrade && matchesSearch;
  });
  const biologyProgress = allBiologyChapters.length
    ? Math.round((allBiologyChapters.filter((chapter) => chapter.completed).length / allBiologyChapters.length) * 100)
    : 0;
  const subjectQuestions = questions.filter((question) => question.subject === subject && question.exam === 'NEET');
  const subjectNotes = ncertLines.filter((line) => line.subject === subject);
  const SectionIcon = subjectDetails[subject].icon;
  const switchView = (nextView: BiologyView, nextSubject = subject) => {
    setView(nextView);
    setSubject(nextSubject);
    setGrade('All');
    setSearch('');
    if (nextView === 'home') frameRef.current?.contentWindow?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const biologyNav = (
    <nav className="biology-local-dock" aria-label="Biology study sections">
      <button className="biology-local-mark" onClick={() => switchView('home')} aria-label="Return to Biology scene"><Leaf size={18} /></button>
      <button onClick={() => switchView('chapters', 'Botany')} aria-pressed={view === 'chapters' && subject === 'Botany'}><Leaf size={13} /><span>Botany</span></button>
      <button onClick={() => switchView('chapters', 'Zoology')} aria-pressed={view === 'chapters' && subject === 'Zoology'}><Flower2 size={13} /><span>Zoology</span></button>
      <button onClick={() => switchView('ncert')} aria-pressed={view === 'ncert'}><BookOpen size={13} /><span>NCERT</span></button>
      <button onClick={() => switchView('pyq')} aria-pressed={view === 'pyq'}><ArrowRight size={13} /><span>PYQs</span></button>
      <button className="biology-local-exit" onClick={onClose} aria-label="Exit Biology"><X size={14} /><span>Exit</span></button>
    </nav>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#4a4d44]">
      <style>{`
        .biology-local-dock{position:absolute;z-index:62;top:30px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:3px;height:48px;padding:5px;border:1px solid rgba(255,255,255,.13);border-radius:15px;background:rgba(34,40,31,.94);box-shadow:0 8px 22px rgba(10,14,8,.3)}
        .biology-local-dock button{height:36px;display:flex;align-items:center;justify-content:center;gap:7px;padding:0 12px;border:1px solid transparent;border-radius:10px;background:rgba(255,255,255,.04);color:rgba(255,255,255,.7);font:500 10px Lexend,system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;transition:.18s}
        .biology-local-dock button:hover,.biology-local-dock button[aria-pressed="true"]{background:#f2f3ef;color:#23261f}
        .biology-local-dock .biology-local-mark{width:36px;padding:0;background:#eef1e7;color:#23261f}
        .biology-local-dock .biology-local-exit{border-color:rgba(255,255,255,.1);margin-left:3px}
        @media(max-width:560px){.biology-local-dock{top:10px;width:calc(100% - 16px);justify-content:space-between;gap:1px;padding:4px}.biology-local-dock button{height:34px;padding:0 8px;font-size:8px;letter-spacing:.3px}.biology-local-dock button span{display:none}.biology-local-dock .biology-local-mark{display:flex}}
      `}</style>

      <iframe
        ref={frameRef}
        id="biology-frame"
        title="Animated Biology study hub"
        src="/NEET2.0/landing-pages/biology-hub.html"
        className="block h-full w-full border-0"
        style={{ pointerEvents: view === 'home' ? 'auto' : 'none' }}
        allow="fullscreen"
      />

      {view !== 'home' && <>
        {biologyNav}
        <section className="fixed bottom-4 left-3 right-3 top-[90px] z-[60] overflow-y-auto rounded-[30px] border border-white/50 bg-[#f2f3ef]/[.97] px-5 pb-8 pt-7 text-[#23261f] shadow-[0_28px_90px_rgba(16,21,13,.45)] sm:left-5 sm:right-5 sm:px-9 sm:pt-8 lg:left-10 lg:right-10 lg:px-12" aria-label={`${subject} ${view}`}>
          <header className="flex flex-col gap-5 border-b border-[#23261f]/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-[#7c8177]"><SectionIcon size={14} /> Biology field guide · NEET 2027</div>
              <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-5xl">{view === 'chapters' ? `The ${subject} atlas.` : view === 'ncert' ? 'Notes from the text.' : 'Practice in the living world.'}</h1>
              <p className="mt-2 text-sm leading-6 text-[#62675e]">{view === 'chapters' ? subjectDetails[subject].description : view === 'ncert' ? 'Biology NCERT excerpts and high-yield notes, gathered for quick revision.' : 'Biology NEET questions. Choose an option to check your answer and review the explanation.'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {(view === 'chapters' ? ['Botany', 'Zoology'] as BiologySubject[] : [subject] as BiologySubject[]).map((item) => <button key={item} onClick={() => { setSubject(item); setSearch(''); }} aria-pressed={subject === item} className={`rounded-full border px-4 py-2 text-xs transition ${subject === item ? 'border-[#4a4d44] bg-[#4a4d44] text-white' : 'border-[#4a4d44]/20 text-[#4a4d44] hover:border-[#4a4d44]'}`}>{item}</button>)}
              <label className="relative"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7c8177]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={view === 'pyq' ? 'Search questions' : 'Find a chapter'} className="w-44 rounded-full border border-[#23261f]/15 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-[#4a4d44]" /></label>
            </div>
          </header>

          {view === 'chapters' && <>
            <div className="flex flex-wrap items-center justify-between gap-4 py-5 text-xs text-[#7c8177]">
              <span>{allBiologyChapters.filter((chapter) => chapter.completed).length} of {allBiologyChapters.length} Biology chapters complete · {biologyProgress}%</span>
              <div className="flex items-center gap-1 rounded-full bg-[#e7e9e3] p-1">{(['All', 'Class 11', 'Class 12'] as const).map((item) => <button key={item} onClick={() => setGrade(item)} className={`rounded-full px-3 py-1.5 text-[11px] transition ${grade === item ? 'bg-white text-[#23261f] shadow-sm' : 'text-[#7c8177]'}`}>{item}</button>)}</div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {shownChapters.map((chapter, index) => <article key={chapter.id} className="rounded-2xl border border-[#23261f]/[.08] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#23261f]/5">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.17em] text-[#7c8177]">{chapter.grade} · {chapter.unit}</p><h2 className="mt-2 text-lg font-normal leading-snug tracking-tight">{chapter.name}</h2></div><button onClick={() => onToggleChapter(chapter.id)} aria-label={`${chapter.completed ? 'Mark incomplete' : 'Mark complete'}: ${chapter.name}`} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${chapter.completed ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-[#23261f]/15 text-[#7c8177] hover:border-emerald-700 hover:text-emerald-800'}`}><Check size={14} /></button></div>
                <p className="mt-4 min-h-10 text-xs leading-5 text-[#7c8177]">{chapter.subtopics.slice(0, 3).join(' · ')}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[#23261f]/[.08] pt-4"><span className="font-mono text-[10px] text-[#9aa095]">{String(index + 1).padStart(2, '0')} / {subjectChapters.length}</span><div className="flex gap-1.5"><button onClick={() => switchView('ncert', subject)} className="rounded-full border border-[#23261f]/[.12] px-2.5 py-1.5 text-[10px] hover:border-[#4a4d44]">NCERT</button><button onClick={() => switchView('pyq', subject)} className="rounded-full bg-[#4a4d44] px-2.5 py-1.5 text-[10px] text-white hover:bg-[#363a31]">PYQs <ArrowRight className="ml-1 inline" size={11} /></button></div></div>
              </article>)}
              {shownChapters.length === 0 && <div className="rounded-2xl border border-dashed border-[#23261f]/20 p-10 text-center text-sm text-[#7c8177] md:col-span-2 xl:col-span-3">No {subject.toLowerCase()} chapters match that search.</div>}
            </div>
          </>}

          {view === 'ncert' && <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {subjectNotes.filter((line) => `${line.chapter} ${line.quoteText} ${line.whyNtaAsksThis}`.toLowerCase().includes(search.toLowerCase())).map((line) => <article key={line.id} className="rounded-2xl border border-[#23261f]/[.08] bg-white p-5"><div className="flex items-start justify-between gap-3"><p className="text-[10px] uppercase tracking-[.17em] text-[#7c8177]">{line.chapter} · {line.pageOrSection}</p><button onClick={() => onToggleBookmarkNcert(line.id)} aria-label={line.isBookmarked ? 'Remove saved note' : 'Save note'} className="text-[#7c8177] hover:text-[#4a4d44]">{line.isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}</button></div><blockquote className="mt-4 text-base leading-7">“{line.quoteText}”</blockquote><p className="mt-4 border-t border-[#23261f]/[.08] pt-3 text-xs leading-5 text-[#7c8177]">{line.whyNtaAsksThis}</p></article>)}
            {subjectNotes.length === 0 && <div className="rounded-2xl border border-dashed border-[#23261f]/20 p-10 text-center text-sm text-[#7c8177] md:col-span-2 xl:col-span-3">NCERT excerpts for {subject} will appear here as they are added.</div>}
          </div>}

          {view === 'pyq' && <div className="mt-6 grid gap-3 xl:grid-cols-2">
            {subjectQuestions.filter((question) => `${question.topic} ${question.question}`.toLowerCase().includes(search.toLowerCase())).map((question, index) => <article key={question.id} className="rounded-2xl border border-[#23261f]/[.08] bg-white p-5"><div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[.15em] text-[#7c8177]"><span>{question.topic} · NEET {question.year}</span><button onClick={() => onToggleBookmarkPYQ(question.id)} aria-label={question.isBookmarked ? 'Remove saved question' : 'Save question'} className="hover:text-[#4a4d44]">{question.isBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}</button></div><h2 className="mt-3 text-sm font-medium leading-6">{question.question}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{Object.entries(question.options).map(([key, value]) => { const picked = answers[question.id] === key; const correct = question.correctOption === key; return <button key={key} disabled={Boolean(answers[question.id])} onClick={() => setAnswers((current) => ({ ...current, [question.id]: key }))} className={`rounded-xl border px-3 py-2 text-left text-xs leading-5 transition ${answers[question.id] ? correct ? 'border-emerald-700/30 bg-emerald-50 text-emerald-900' : picked ? 'border-rose-500/30 bg-rose-50 text-rose-900' : 'border-[#23261f]/10 text-[#7c8177]' : 'border-[#23261f]/10 hover:border-[#4a4d44]/50'}`}><span className="mr-2 font-mono">{key}</span>{value}</button>; })}</div>{answers[question.id] && <p className="mt-4 border-t border-[#23261f]/[.08] pt-3 text-xs leading-5 text-[#62675e]">{question.explanation}</p>}<span className="mt-4 block text-[10px] text-[#9aa095]">Question {index + 1} · {question.difficulty}</span></article>)}
            {subjectQuestions.length === 0 && <div className="rounded-2xl border border-dashed border-[#23261f]/20 p-10 text-center text-sm text-[#7c8177] xl:col-span-2">Biology NEET questions for {subject} will appear here as they are added.</div>}
          </div>}
        </section>
        <button onClick={() => switchView('home')} className="fixed right-3 top-3 z-[70] grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-[#22281f]/90 text-white hover:bg-[#22281f]" aria-label="Close this Biology panel and return to the animated scene" title="Back to Biology scene">×</button>
      </>}
    </div>
  );
};
