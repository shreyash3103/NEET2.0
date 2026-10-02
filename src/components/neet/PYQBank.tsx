import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, CheckCircle2, XCircle, HelpCircle, Eye, EyeOff, Timer } from 'lucide-react';
import { PYQuestion, Subject } from './types';

interface PYQBankProps {
  questions: PYQuestion[];
  onToggleBookmark: (id: string) => void;
}

export const PYQBank: React.FC<PYQBankProps> = ({ questions, onToggleBookmark }) => {
  const [selectedExam, setSelectedExam] = useState<'All' | 'NEET' | 'JEE Main'>('All');
  const [selectedSubject, setSelectedSubject] = useState<'All' | Subject>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Easy' | 'Moderate' | 'Challenging'>('All');
  const [activeTab, setActiveTab] = useState<'All' | 'Bookmarked'>('All');

  // User selected answers: { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [userAnswers, setUserAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Toggled solutions visibility: { [questionId]: boolean }
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const filteredQuestions = questions.filter((q) => {
    const matchesExam = selectedExam === 'All' || q.exam === selectedExam;
    const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesBookmark = activeTab === 'All' || (activeTab === 'Bookmarked' && q.isBookmarked);
    return matchesExam && matchesSubject && matchesDifficulty && matchesBookmark;
  });

  const handleSelectOption = (qId: string, option: 'A' | 'B' | 'C' | 'D') => {
    if (userAnswers[qId]) return; // already answered
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
    // Auto show solution after answering
    setShowSolution((prev) => ({ ...prev, [qId]: true }));
  };

  const toggleSolution = (qId: string) => {
    setShowSolution((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="flex flex-col gap-6 text-[#dfe7e0]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">Crucial PYQ Repository</h2>
            <span className="text-xs text-[#c9a24a] font-mono">
              {filteredQuestions.length} Questions Curated
            </span>
          </div>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Authentic NEET &amp; JEE Main crossover questions · Step-by-step solutions &amp; trap analysis
          </p>
        </div>

        {/* Tab switch: All vs Bookmarked */}
        <div className="flex items-center gap-1 p-1 bg-[#0a0e12] rounded-lg border border-[#dfe7e0]/10">
          <button
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 text-xs rounded transition ${
              activeTab === 'All'
                ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            All PYQs
          </button>
          <button
            onClick={() => setActiveTab('Bookmarked')}
            className={`px-3 py-1.5 text-xs rounded transition flex items-center gap-1 ${
              activeTab === 'Bookmarked'
                ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <Bookmark size={12} />
            Saved ({questions.filter((q) => q.isBookmarked).length})
          </button>
        </div>
      </div>

      {/* Filter rows */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Exam Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#aab4ad]">Exam:</span>
          {(['All', 'NEET', 'JEE Main'] as const).map((e) => (
            <button
              key={e}
              onClick={() => setSelectedExam(e)}
              className={`px-2.5 py-1 rounded transition ${
                selectedExam === e
                  ? 'bg-[#e0231c] text-white font-medium'
                  : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[#aab4ad]">Subject:</span>
          {(['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-2.5 py-1 rounded transition ${
                selectedSubject === s
                  ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium border border-[#dfe7e0]/20'
                  : 'text-[#aab4ad] hover:text-[#dfe7e0]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#aab4ad]">Difficulty:</span>
          {(['All', 'Easy', 'Moderate', 'Challenging'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-2 py-0.5 rounded transition text-[11px] ${
                selectedDifficulty === d
                  ? 'bg-[#c9a24a] text-[#05070a] font-medium'
                  : 'text-[#78837c] hover:text-[#dfe7e0]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-4">
        {filteredQuestions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          const isAnswered = !!userAns;
          const isCorrect = userAns === q.correctOption;
          const isSolVisible = showSolution[q.id];

          return (
            <div
              key={q.id}
              className="p-5 rounded-xl bg-[#0a0e12] border border-[#dfe7e0]/15 flex flex-col gap-4"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3 text-xs text-[#aab4ad] border-b border-[#dfe7e0]/10 pb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-[#e0231c]">
                    {q.exam} {q.year}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#dfe7e0]">{q.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{q.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[11px] font-mono text-[#c9a24a]">{q.questionType}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#78837c]">Q{idx + 1}</span>
                  <button
                    onClick={() => onToggleBookmark(q.id)}
                    className="p-1 text-[#aab4ad] hover:text-[#c9a24a] transition"
                    title={q.isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                  >
                    {q.isBookmarked ? (
                      <BookmarkCheck size={16} className="text-[#c9a24a]" />
                    ) : (
                      <Bookmark size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-sm text-[#dfe7e0] leading-relaxed whitespace-pre-line font-normal">
                {q.question}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const optText = q.options[optKey];
                  const isSelected = userAns === optKey;
                  const isTargetCorrect = q.correctOption === optKey;

                  let borderClass = 'border-[#dfe7e0]/15 hover:border-[#dfe7e0]/40';
                  let bgClass = 'bg-[#05070a]/60';
                  let badgeClass = 'text-[#aab4ad] bg-[#dfe7e0]/5';

                  if (isAnswered) {
                    if (isTargetCorrect) {
                      borderClass = 'border-emerald-500/80';
                      bgClass = 'bg-emerald-950/20';
                      badgeClass = 'bg-emerald-600 text-white';
                    } else if (isSelected && !isTargetCorrect) {
                      borderClass = 'border-[#e0231c]';
                      bgClass = 'bg-[#e0231c]/10';
                      badgeClass = 'bg-[#e0231c] text-white';
                    }
                  }

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleSelectOption(q.id, optKey)}
                      disabled={isAnswered}
                      className={`p-3 rounded-lg border text-left flex items-start gap-3 transition ${borderClass} ${bgClass}`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${badgeClass}`}>
                        {optKey}
                      </span>
                      <span className="text-xs text-[#dfe7e0] leading-snug">{optText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action and feedback bar */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {isAnswered && (
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={15} /> Correct! +4 Marks
                        </span>
                      ) : (
                        <span className="text-[#e0231c] flex items-center gap-1">
                          <XCircle size={15} /> Incorrect! -1 Mark (Correct: Option {q.correctOption})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleSolution(q.id)}
                  className="flex items-center gap-1 text-xs text-[#aab4ad] hover:text-[#dfe7e0] transition py-1 px-2.5 rounded border border-[#dfe7e0]/10 hover:border-[#dfe7e0]/30"
                >
                  {isSolVisible ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{isSolVisible ? 'Hide Solution' : 'View Solution'}</span>
                </button>
              </div>

              {/* Solution Panel */}
              {isSolVisible && (
                <div className="p-4 rounded-lg bg-[#05070a] border border-[#dfe7e0]/10 text-xs text-[#dfe7e0] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[#c9a24a] font-medium border-b border-[#dfe7e0]/10 pb-1.5">
                    <span>Explanation &amp; Working Steps:</span>
                    <span className="font-mono text-[#aab4ad]">Answer: ({q.correctOption})</span>
                  </div>

                  <div className="whitespace-pre-line leading-relaxed text-[#dfe7e0]/90">
                    {q.explanation}
                  </div>

                  {q.keyFormulaOrConcept && (
                    <div className="mt-1 pt-2 border-t border-[#dfe7e0]/10 text-[#aab4ad] flex items-start gap-1.5 font-mono text-[11px]">
                      <span className="text-[#e0231c] font-semibold">Key Concept:</span>
                      <span className="text-[#dfe7e0]">{q.keyFormulaOrConcept}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
