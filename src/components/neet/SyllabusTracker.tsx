import React, { useState } from 'react';
import { Search, Check, RotateCw, BookOpen, AlertCircle } from 'lucide-react';
import { SyllabusChapter, Subject } from './types';

interface SyllabusTrackerProps {
  chapters: SyllabusChapter[];
  onToggleChapter: (id: string) => void;
  onIncrementRevision: (id: string) => void;
}

export const SyllabusTracker: React.FC<SyllabusTrackerProps> = ({
  chapters,
  onToggleChapter,
  onIncrementRevision
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Physics');
  const [selectedGrade, setSelectedGrade] = useState<'All' | 'Class 11' | 'Class 12'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const filteredChapters = chapters.filter((c) => {
    const matchesSubject = c.subject === selectedSubject;
    const matchesGrade = selectedGrade === 'All' || c.grade === selectedGrade;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtopics.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesGrade && matchesSearch;
  });

  const subjectChapters = chapters.filter((c) => c.subject === selectedSubject);
  const completedCount = subjectChapters.filter((c) => c.completed).length;
  const totalCount = subjectChapters.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 text-[#dfe7e0]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">Official NEET 2027 Syllabus</h2>
            <span className="text-xs text-[#c9a24a] font-mono">
              {completedCount} / {totalCount} Chapters ({percent}%)
            </span>
          </div>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Updated per recent NTA guidelines · Includes weightage analysis and high-yield subtopics
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78837c]" />
          <input
            type="text"
            placeholder="Search chapters or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0e12] border border-[#dfe7e0]/15 rounded pl-9 pr-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
          />
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-[#0a0e12] rounded-lg border border-[#dfe7e0]/10 overflow-x-auto">
          {(['Physics', 'Chemistry', 'Botany', 'Zoology'] as Subject[]).map((subj) => {
            const count = chapters.filter((c) => c.subject === subj && c.completed).length;
            const total = chapters.filter((c) => c.subject === subj).length;
            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 text-xs rounded transition flex items-center gap-1.5 whitespace-nowrap ${
                  selectedSubject === subj
                    ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium'
                    : 'text-[#aab4ad] hover:text-[#dfe7e0]'
                }`}
              >
                <span>{subj}</span>
                <span className="text-[10px] text-[#78837c]">
                  ({count}/{total})
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 text-xs">
          {(['All', 'Class 11', 'Class 12'] as const).map((grade) => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-2.5 py-1 rounded transition ${
                selectedGrade === grade
                  ? 'border border-[#dfe7e0]/30 text-[#dfe7e0] bg-[#dfe7e0]/10'
                  : 'text-[#78837c] hover:text-[#dfe7e0]'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      <div className="flex flex-col gap-2.5">
        {filteredChapters.map((chapter) => {
          const isExpanded = expandedChapter === chapter.id;

          return (
            <div
              key={chapter.id}
              className={`rounded-lg border transition ${
                chapter.completed
                  ? 'bg-[#0a0e12]/60 border-[#dfe7e0]/10'
                  : 'bg-[#0a0e12] border-[#dfe7e0]/15 hover:border-[#dfe7e0]/30'
              }`}
            >
              <div className="p-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => onToggleChapter(chapter.id)}
                    className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                      chapter.completed
                        ? 'bg-[#e0231c] border-[#e0231c] text-white'
                        : 'border-[#dfe7e0]/30 hover:border-[#e0231c]'
                    }`}
                  >
                    {chapter.completed && <Check size={14} />}
                  </button>

                  <div
                    className="min-w-0 cursor-pointer"
                    onClick={() => setExpandedChapter(isExpanded ? null : chapter.id)}
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-medium ${chapter.completed ? 'line-through text-[#78837c]' : 'text-[#dfe7e0]'}`}>
                        {chapter.name}
                      </span>
                      {chapter.isNtaRevised && (
                        <span className="text-[10px] text-[#c9a24a] flex items-center gap-0.5">
                          <AlertCircle size={10} />
                          NTA 2027 Revised
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#aab4ad] mt-0.5">
                      <span>{chapter.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span>{chapter.unit}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#c9a24a]">~{chapter.avgQuestions} Qs/yr</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[11px] font-mono ${
                      chapter.weightage === 'Very High'
                        ? 'text-[#e0231c]'
                        : chapter.weightage === 'High'
                        ? 'text-[#c9a24a]'
                        : 'text-[#78837c]'
                    }`}
                  >
                    {chapter.weightage}
                  </span>

                  <button
                    onClick={() => onIncrementRevision(chapter.id)}
                    title="Add Revision Count"
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs border border-[#dfe7e0]/15 hover:border-[#dfe7e0]/40 text-[#aab4ad] hover:text-[#dfe7e0] transition"
                  >
                    <RotateCw size={11} />
                    <span>R: {chapter.revisionCount}</span>
                  </button>
                </div>
              </div>

              {/* Subtopics Accordion */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#dfe7e0]/10 flex flex-col gap-2 text-xs">
                  <div className="text-[#aab4ad] font-medium flex items-center gap-1">
                    <BookOpen size={12} /> Key Subtopics & NTA Focus Areas:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                    {chapter.subtopics.map((sub, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[#dfe7e0]">
                        <span className="text-[#e0231c] mt-0.5">▪</span>
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
