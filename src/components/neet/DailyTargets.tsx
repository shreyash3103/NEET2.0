import React, { useState } from 'react';
import { Plus, Check, Trash2, Calendar, Target, Flame } from 'lucide-react';
import { DailyTarget, Subject } from './types';

interface DailyTargetsProps {
  targets: DailyTarget[];
  onAddTarget: (target: Omit<DailyTarget, 'id' | 'createdAt' | 'completed'>) => void;
  onToggleTarget: (id: string) => void;
  onDeleteTarget: (id: string) => void;
}

export const DailyTargets: React.FC<DailyTargetsProps> = ({
  targets,
  onAddTarget,
  onToggleTarget,
  onDeleteTarget
}) => {
  const [filter, setFilter] = useState<'All' | Subject>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New target form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [chapter, setChapter] = useState('');
  const [targetQuestions, setTargetQuestions] = useState(30);
  const [targetMinutes, setTargetMinutes] = useState(60);
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTarget({
      title: title.trim(),
      subject,
      chapter: chapter.trim() || 'General Practice',
      targetQuestions: Number(targetQuestions) || 0,
      completedQuestions: 0,
      targetMinutes: Number(targetMinutes) || 0,
      completedMinutes: 0,
      priority
    });

    setTitle('');
    setChapter('');
    setShowAddForm(false);
  };

  const filteredTargets = filter === 'All' ? targets : targets.filter((t) => t.subject === filter);

  const completedCount = targets.filter((t) => t.completed).length;
  const totalCount = targets.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 text-[#dfe7e0]">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dfe7e0]/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium tracking-tight text-[#dfe7e0]">Daily Action Targets</h2>
            <span className="text-xs text-[#c9a24a] flex items-center gap-1 font-mono">
              <Flame size={14} className="text-[#e0231c]" />
              {completedCount} / {totalCount} Completed
            </span>
          </div>
          <p className="text-xs text-[#aab4ad] mt-0.5">
            Set deliberate, quantifiable NEET 2027 tasks · Real checklists with question & duration tracking
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-[#e0231c] text-white hover:bg-[#e0231c]/90 rounded transition shadow-sm"
        >
          <Plus size={15} />
          {showAddForm ? 'Close Form' : 'Add New Target'}
        </button>
      </div>

      {/* Progress Track */}
      <div className="p-4 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
        <div className="flex items-center justify-between text-xs text-[#aab4ad] mb-2">
          <span>Today's Execution Progress</span>
          <span className="font-mono text-[#dfe7e0]">{progressPercent}%</span>
        </div>
        <div className="w-full bg-[#05070a] h-2 rounded-full overflow-hidden border border-[#dfe7e0]/10">
          <div
            className="bg-[#e0231c] h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Target Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/20 flex flex-col gap-4 transition"
        >
          <div className="text-sm font-medium text-[#dfe7e0] border-b border-[#dfe7e0]/10 pb-2">
            Define Daily Milestone
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#aab4ad]">Target Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Solve 35 PYQs on Rotational Motion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#aab4ad]">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] focus:outline-none focus:border-[#e0231c]"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Botany">Botany</option>
                <option value="Zoology">Zoology</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-[#aab4ad]">Chapter / Topic</label>
              <input
                type="text"
                placeholder="e.g. Centre of Mass & Torque"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#aab4ad]">Target Questions</label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={targetQuestions}
                  onChange={(e) => setTargetQuestions(Number(e.target.value))}
                  className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] focus:outline-none focus:border-[#e0231c]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#aab4ad]">Planned Duration (min)</label>
                <input
                  type="number"
                  min="10"
                  max="360"
                  step="5"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(Number(e.target.value))}
                  className="bg-[#05070a] border border-[#dfe7e0]/15 rounded px-3 py-1.5 text-xs text-[#dfe7e0] focus:outline-none focus:border-[#e0231c]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#aab4ad]">Priority:</span>
              {(['High', 'Medium', 'Low'] as const).map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`px-2.5 py-1 text-xs rounded transition ${
                    priority === p
                      ? p === 'High'
                        ? 'bg-[#e0231c] text-white'
                        : p === 'Medium'
                        ? 'bg-[#c9a24a] text-[#05070a] font-medium'
                        : 'bg-[#dfe7e0]/20 text-[#dfe7e0]'
                      : 'border border-[#dfe7e0]/15 text-[#aab4ad] hover:text-[#dfe7e0]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
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
                Save Target
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#0a0e12] rounded-lg border border-[#dfe7e0]/10 overflow-x-auto">
        {(['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'] as const).map((subj) => (
          <button
            key={subj}
            onClick={() => setFilter(subj)}
            className={`px-3 py-1.5 text-xs rounded transition whitespace-nowrap ${
              filter === subj
                ? 'bg-[#dfe7e0]/15 text-[#dfe7e0] font-medium'
                : 'text-[#aab4ad] hover:text-[#dfe7e0]'
            }`}
          >
            {subj}
          </button>
        ))}
      </div>

      {/* Target Items List */}
      {filteredTargets.length === 0 ? (
        <div className="p-8 text-center rounded-lg bg-[#0a0e12] border border-[#dfe7e0]/10">
          <Target className="mx-auto text-[#78837c] mb-2" size={28} />
          <h3 className="text-sm font-medium text-[#dfe7e0]">No targets set for {filter}</h3>
          <p className="text-xs text-[#aab4ad] mt-1">
            Click &ldquo;Add New Target&rdquo; above to set your specific questions or chapter goals for today.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredTargets.map((target) => (
            <div
              key={target.id}
              className={`p-3.5 rounded-lg border transition flex items-center justify-between gap-4 ${
                target.completed
                  ? 'bg-[#0a0e12]/60 border-[#dfe7e0]/10 opacity-70'
                  : 'bg-[#0a0e12] border-[#dfe7e0]/15 hover:border-[#dfe7e0]/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => onToggleTarget(target.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                    target.completed
                      ? 'bg-[#e0231c] border-[#e0231c] text-white'
                      : 'border-[#dfe7e0]/30 hover:border-[#e0231c]'
                  }`}
                >
                  {target.completed && <Check size={14} />}
                </button>

                <div className="min-w-0">
                  <div className={`text-sm font-medium truncate ${target.completed ? 'line-through text-[#78837c]' : 'text-[#dfe7e0]'}`}>
                    {target.title}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#aab4ad] mt-0.5 flex-wrap">
                    <span className="text-[#e0231c]">{target.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>{target.chapter}</span>
                    {target.targetQuestions > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{target.targetQuestions} Qs</span>
                      </>
                    )}
                    {target.targetMinutes > 0 && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{target.targetMinutes} min</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[11px] font-mono ${target.priority === 'High' ? 'text-[#e0231c]' : target.priority === 'Medium' ? 'text-[#c9a24a]' : 'text-[#78837c]'}`}>
                  {target.priority}
                </span>

                <button
                  onClick={() => onDeleteTarget(target.id)}
                  title="Delete target"
                  className="p-1.5 rounded text-[#78837c] hover:text-[#e0231c] hover:bg-[#e0231c]/10 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
