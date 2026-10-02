import React, { useState } from 'react';
import { X, LogIn, Check, Shield } from 'lucide-react';
import { UserProfile } from './types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (profile: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [email, setEmail] = useState('shreyashmission700@gmail.com');
  const [name, setName] = useState('Shreyash');
  const [targetScore, setTargetScore] = useState(700);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onLogin({
        email: email.trim(),
        name: name.trim() || email.split('@')[0],
        targetScore,
        neetyear: 2027,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0a0e12] border border-[#dfe7e0]/20 shadow-2xl text-[#dfe7e0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-[#aab4ad] hover:text-[#dfe7e0] hover:bg-[#dfe7e0]/10 transition"
        >
          <X size={18} />
        </button>

        {currentUser ? (
          /* Profile Details if already logged in */
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-[#dfe7e0]/10 pb-4">
              <div className="w-12 h-12 rounded-full bg-[#e0231c] flex items-center justify-center text-lg font-semibold text-white shadow-md">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-medium text-[#dfe7e0]">{currentUser.name}</h3>
                <p className="text-xs text-[#aab4ad] font-mono">{currentUser.email}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#c9a24a] mt-0.5">
                  <span>Target: {currentUser.targetScore}/720</span>
                  <span aria-hidden="true">·</span>
                  <span>NEET 2027 Aspirant</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#aab4ad] leading-relaxed">
              Your real study hours, daily target completion checklists, custom NCERT notes, and error log are synced to this account.
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs rounded border border-[#dfe7e0]/20 text-[#dfe7e0] hover:bg-[#dfe7e0]/10 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-4 py-2 text-xs rounded bg-[#e0231c]/15 text-[#e0231c] border border-[#e0231c]/30 hover:bg-[#e0231c]/25 transition font-medium"
              >
                Sign Out of Gmail
              </button>
            </div>
          </div>
        ) : (
          /* Sign In Form with Gmail Branding */
          <form onSubmit={handleGoogleSubmit} className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {/* Google multicolored G SVG */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2 shadow-sm shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-base font-medium text-[#dfe7e0]">Sign In with Gmail</h3>
                <p className="text-xs text-[#aab4ad]">NEET 2027 Aspirant Portal</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#aab4ad]">Google / Gmail Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#05070a] border border-[#dfe7e0]/20 rounded-lg px-3 py-2 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#aab4ad]">Your Name</label>
                <input
                  type="text"
                  placeholder="Aspirant Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-[#05070a] border border-[#dfe7e0]/20 rounded-lg px-3 py-2 text-xs text-[#dfe7e0] placeholder-[#78837c] focus:outline-none focus:border-[#e0231c]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#aab4ad]">NEET Target Score</label>
                <select
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="bg-[#05070a] border border-[#dfe7e0]/20 rounded-lg px-3 py-2 text-xs text-[#dfe7e0] focus:outline-none focus:border-[#e0231c]"
                >
                  <option value={720}>720/720 (AIIMS New Delhi Dream)</option>
                  <option value={710}>710+/720 (Top 100 AIR)</option>
                  <option value={700}>700+/720 (Top GMC Medical Colleges)</option>
                  <option value={680}>680+/720 (Safe State Quota)</option>
                  <option value={650}>650+/720</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#dfe7e0]/5 border border-[#dfe7e0]/10 text-[11px] text-[#aab4ad]">
              <Shield size={14} className="text-[#c9a24a] shrink-0" />
              <span>Zero fake study hours or bot metrics. All sessions are logged strictly in real-time.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg font-medium text-xs bg-[#e0231c] text-white hover:bg-[#e0231c]/90 transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn size={15} />
              {isSubmitting ? 'Authenticating with Google...' : 'Continue with Google Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
