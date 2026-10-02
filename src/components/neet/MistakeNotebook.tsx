import React, { useState } from 'react';
import { Plus, AlertOctagon, Trash2, CheckCircle2 } from 'lucide-react';
import { MistakeLog, Subject } from './types';

interface MistakeNotebookProps {
  logs: MistakeLog[];
  onAddLog: (log: Omit<MistakeLog, 'id' | 'date'>) => void;
  onDeleteLog: (id: string) => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  logs,
  onAddLog,
  onDeleteLog
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<'All' | Subject>('All');

  // Form states
  const [questionRef, setQuestionRef] = useState('');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [topic, setTopic] = useState('');
  const [mistakeType, setMistakeType] = useState<MistakeLog['mistakeType']>('Conceptual Gap');
  const [myWrongAnswer, setMyWrongAnswer] = useState('');
  const [correctConcept, setCorrectConcept] = useState('');
  const [actionItem, setActionItem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionRef.trim() || !correctConcept.trim()) return;

    onAddLog({
      questionRef: questionRef.trim(),
      subject,
      topic: topic.trim() || 'Mock Test Question',
      mistakeType,
      myWrongAnswer: myWrongAnswer.trim(),
      correctConcept: correctConcept.trim(),
      actionItem: actionItem.trim() || 'Revise formula and solve 5 similar questions'
    });

    setQuestionRef('');
    setTopic('');
    setMyWrongAnswer('');
    setCorrectConcept('');
    setActionItem('');
    setShowAddForm(false);
  };

  const filteredLogs = selectedSubject === 'All' ? logs : logs.filter((l) => l.subject === selectedSubject);

  return (
    <div className="flex flex-col gap-6 text-[#dfe7e0]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">Mistake Notebook (Error Log)</h2>
            <span className="text-xs text-[#c9a24a] font-mono">
              {logs.length} Recorded Weaknesses
            </span>
          </div>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Log errors from full-syllabus mocks and PYQs · The secret weapon for converting -1s into +4s
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-[#e0231c] text-white hover:bg-[#e0231c]/90 rounded transition shadow-sm"
        >
          <Plus size={14} /> Log New Mistake
        </button>
      </div>

      {/* Subject Filter */}
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

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/20 flex flex-col gap-3.5 transition"
        >
          <div className="text-sm font-medium text-[#dfe7e0] border-b border-[#dfe7e0]/10 pb-2">
            Document Exam Mistake
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Botany">Botany</option>
                <option value="Zoology">Zoology</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Mistake Nature</label>
              <select
                value={mistakeType}
                onChange={(e) => setMistakeType(e.target.value as MistakeLog['mistakeType'])}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              >
                <option value="Conceptual Gap">Conceptual Gap</option>
                <option value="Calculation Error">Calculation Error</option>
                <option value="Misread Question">Misread Question (NOT/INCORRECT)</option>
                <option value="Formula Forgotten">Formula Forgotten</option>
                <option value="Time Pressure">Time Pressure / Rushed</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Chapter / Topic</label>
              <input
                type="text"
                placeholder="e.g. Wave Optics (YDSE)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-2.5 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#aab4ad]">Question Reference / Summary *</label>
            <input
              type="text"
              required
              placeholder="e.g. Ratio of fringe widths when immersed in water"
              value={questionRef}
              onChange={(e) => setQuestionRef(e.target.value)}
              className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">What I Thought / Marked</label>
              <textarea
                rows={2}
                placeholder="e.g. Assumed fringe width increases in water because wavelength increases..."
                value={myWrongAnswer}
                onChange={(e) => setMyWrongAnswer(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-[#aab4ad]">Correct Concept &amp; Formula *</label>
              <textarea
                required
                rows={2}
                placeholder="e.g. λ_med = λ_air / μ, so fringe width β decreases: β' = β / μ."
                value={correctConcept}
                onChange={(e) => setCorrectConcept(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-[#aab4ad]">Actionable Takeaway for Next Mock</label>
            <input
              type="text"
              placeholder="e.g. Always write out formula β = λD/d before rushing the answer."
              value={actionItem}
              onChange={(e) => setActionItem(e.target.value)}
              className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-[#aab4ad] hover:text-[#dfe7e0]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-[#e0231c] text-white rounded hover:bg-[#e0231c]/90 transition"
            >
              Add To Error Log
            </button>
          </div>
        </form>
      )}

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
          <AlertOctagon className="mx-auto text-[#78837c] mb-2" size={28} />
          <h3 className="text-sm font-medium text-[#dfe7e0]">No errors logged yet</h3>
          <p className="text-xs text-[#aab4ad] mt-1">
            Every error logged and reviewed prevents a 5-mark swing on exam day. Add any mistake from your recent practice.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-[#0a0e12] border border-[#dfe7e0]/15 flex flex-col gap-2.5 transition hover:border-[#dfe7e0]/30"
            >
              <div className="flex items-center justify-between text-xs text-[#aab4ad] border-b border-[#dfe7e0]/10 pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[#e0231c] font-medium">{log.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#dfe7e0] font-medium">{log.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#c9a24a] font-mono text-[11px]">{log.mistakeType}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#78837c]">{log.date}</span>
                  <button
                    onClick={() => onDeleteLog(log.id)}
                    className="p-1 text-[#78837c] hover:text-[#e0231c] transition"
                    title="Delete mistake"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="text-sm text-[#dfe7e0] font-medium">
                {log.questionRef}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#05070a]/70 p-3 rounded-lg border border-[#dfe7e0]/5">
                <div>
                  <div className="text-[11px] text-[#e0231c] font-semibold mb-1">My Wrong Approach:</div>
                  <div className="text-[#aab4ad] leading-relaxed">{log.myWrongAnswer || 'None specified'}</div>
                </div>
                <div>
                  <div className="text-[11px] text-emerald-400 font-semibold mb-1">Correct Concept &amp; Rule:</div>
                  <div className="text-[#dfe7e0] leading-relaxed">{log.correctConcept}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#c9a24a] pt-1">
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-[#dfe7e0]">Action Plan:</strong> {log.actionItem}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
