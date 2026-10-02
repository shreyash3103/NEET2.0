import React, { useState } from 'react';
import { Search, Bookmark, BookmarkCheck, Sparkles, BookOpen, AlertTriangle, Plus } from 'lucide-react';
import { NcertLine, Subject } from './types';

interface NcertHighlighterProps {
  lines: NcertLine[];
  onToggleBookmark: (id: string) => void;
  onAddLine?: (line: Omit<NcertLine, 'id'>) => void;
}

export const NcertHighlighter: React.FC<NcertHighlighterProps> = ({
  lines,
  onToggleBookmark,
  onAddLine
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'All' | Subject>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Bookmarked'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New quote form
  const [newSubject, setNewSubject] = useState<Subject>('Botany');
  const [newChapter, setNewChapter] = useState('');
  const [newPage, setNewPage] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newWhyNta, setNewWhyNta] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || !onAddLine) return;

    onAddLine({
      subject: newSubject,
      chapter: newChapter.trim() || 'General NCERT',
      pageOrSection: newPage.trim() || 'NCERT Textbook',
      quoteText: newQuote.trim(),
      highlightedPhrase: newHighlight.trim() || newQuote.slice(0, 30),
      whyNtaAsksThis: newWhyNta.trim() || 'High-yield assertion/reason topic',
      relatedPyqYear: 'NEET 2027 Prospect'
    });

    setNewQuote('');
    setNewHighlight('');
    setNewWhyNta('');
    setNewChapter('');
    setShowAddModal(false);
  };

  const filteredLines = lines.filter((line) => {
    const matchesSubject = selectedSubject === 'All' || line.subject === selectedSubject;
    const matchesTab = activeTab === 'All' || (activeTab === 'Bookmarked' && line.isBookmarked);
    const matchesSearch =
      line.quoteText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      line.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      line.whyNtaAsksThis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 text-[#dfe7e0]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">NCERT Golden Lines (High-Yield)</h2>
            <span className="text-xs text-[#c9a24a] font-mono">
              {filteredLines.length} Key Excerpts
            </span>
          </div>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Exact word-for-word NCERT sentences where NTA frames tricky Statements &amp; Assertion-Reasons
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#e0231c] text-white hover:bg-[#e0231c]/90 rounded transition shadow-sm"
          >
            <Plus size={14} /> Add Line
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 p-1 bg-[#0a0e12] rounded-lg border border-[#dfe7e0]/10 overflow-x-auto">
          {(['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3 py-1.5 text-xs rounded transition ${
                selectedSubject === s
                  ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium'
                  : 'text-[#aab4ad] hover:text-[#dfe7e0]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark tab */}
          <button
            onClick={() => setActiveTab(activeTab === 'All' ? 'Bookmarked' : 'All')}
            className={`px-3 py-1.5 rounded transition flex items-center gap-1.5 border ${
              activeTab === 'Bookmarked'
                ? 'border-[#c9a24a] text-[#c9a24a] bg-[#c9a24a]/10'
                : 'border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            <Bookmark size={13} />
            <span>Saved Only</span>
          </button>

          <div className="relative w-48 sm:w-60">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#78837c]" />
            <input
              type="text"
              placeholder="Search NCERT lines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0e12] border border-[#dfe7e0]/15 rounded pl-8 pr-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
            />
          </div>
        </div>
      </div>

      {/* Add Line Modal */}
      {showAddModal && (
        <form
          onSubmit={handleAddSubmit}
          className="p-5 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/20 flex flex-col gap-3.5 transition"
        >
          <div className="text-sm font-medium text-[#dfe7e0] border-b border-[#dfe7e0]/10 pb-2">
            Record High-Yield NCERT Sentence
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Subject</label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value as Subject)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Botany">Botany</option>
                <option value="Zoology">Zoology</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Chapter Name</label>
              <input
                type="text"
                placeholder="e.g. Chemical Bonding"
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">NCERT Page / Section</label>
              <input
                type="text"
                placeholder="e.g. Class 11, Page 112"
                value={newPage}
                onChange={(e) => setNewPage(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#aab4ad]">Exact NCERT Quote *</label>
            <textarea
              required
              rows={2}
              placeholder="Paste the word-for-word NCERT sentence..."
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Crucial Keywords / Phrase to Highlight</label>
              <input
                type="text"
                placeholder="e.g. diamagnetic, non-superimposable"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Why NTA Asks This / Trap</label>
              <input
                type="text"
                placeholder="e.g. Often inverted in Assertion-Reason options..."
                value={newWhyNta}
                onChange={(e) => setNewWhyNta(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-3 py-1.5 text-xs text-[#aab4ad] hover:text-[#dfe7e0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-[#e0231c] text-white rounded hover:bg-[#e0231c]/90 transition"
            >
              Save Excerpt
            </button>
          </div>
        </form>
      )}

      {/* Cards List */}
      <div className="flex flex-col gap-3">
        {filteredLines.map((line) => (
          <div
            key={line.id}
            className="p-4 rounded-xl bg-[#0a0e12] border border-[#dfe7e0]/15 flex flex-col gap-2.5 transition hover:border-[#dfe7e0]/30"
          >
            <div className="flex items-center justify-between text-xs text-[#aab4ad] border-b border-[#dfe7e0]/10 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#e0231c] font-medium">{line.subject}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#dfe7e0]">{line.chapter}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#78837c]">{line.pageOrSection}</span>
                {line.relatedPyqYear && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#c9a24a] font-mono text-[11px]">{line.relatedPyqYear}</span>
                  </>
                )}
              </div>

              <button
                onClick={() => onToggleBookmark(line.id)}
                className="p-1 text-[#aab4ad] hover:text-[#c9a24a] transition"
              >
                {line.isBookmarked ? (
                  <BookmarkCheck size={16} className="text-[#c9a24a]" />
                ) : (
                  <Bookmark size={16} />
                )}
              </button>
            </div>

            {/* Quote with highlight */}
            <div className="text-xs sm:text-sm text-[#dfe7e0] leading-relaxed italic pl-3 border-l-2 border-[#e0231c]">
              &ldquo;
              {line.quoteText}
              &rdquo;
            </div>

            {/* Highlighted Key Focus & NTA Trap */}
            <div className="mt-1 pt-2 border-t border-[#dfe7e0]/10 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-[#c9a24a] font-mono text-[11px]">
                <Sparkles size={12} className="text-[#e0231c]" />
                <span>Golden Keyword:</span>
                <span className="text-[#dfe7e0] font-sans font-medium">{line.highlightedPhrase}</span>
              </div>

              <div className="flex items-start gap-1.5 text-[#aab4ad] text-[11px]">
                <AlertTriangle size={12} className="text-[#c9a24a] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#dfe7e0]">NTA Trap Note:</strong> {line.whyNtaAsksThis}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
