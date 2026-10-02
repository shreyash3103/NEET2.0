import React from 'react';
import { X, LogIn, LogOut, Shield } from 'lucide-react';
import { UserProfile } from './types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  authError: string | null;
  authBusy: boolean;
  onGoogleSignIn: () => Promise<void>;
  onLogout: () => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  authError,
  authBusy,
  onGoogleSignIn,
  onLogout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0a0e12] border border-[#dfe7e0]/20 shadow-2xl text-[#dfe7e0]">
        <button
          onClick={onClose}
          aria-label="Close sign-in window"
          className="absolute right-4 top-4 p-1.5 rounded-full text-[#aab4ad] hover:text-[#dfe7e0] hover:bg-[#dfe7e0]/10 transition"
        >
          <X size={18} />
        </button>

        {currentUser ? (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-[#dfe7e0]/10 pb-4">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="" className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#e0231c] flex items-center justify-center text-lg font-semibold text-white">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-base font-medium">{currentUser.name}</h3>
                <p className="text-xs text-[#aab4ad] font-mono truncate">{currentUser.email}</p>
                <p className="text-[11px] text-[#c9a24a] mt-0.5">NEET {currentUser.neetyear} Aspirant</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#dfe7e0]/5 border border-[#dfe7e0]/10 text-xs text-[#aab4ad]">
              <Shield size={15} className="text-[#c9a24a] shrink-0" />
              <span>Signed in with Google. Your sign-in is available on this device; sign in on each device you use.</span>
            </div>

            {authError && <p role="alert" className="text-sm text-red-400">{authError}</p>}
            <div className="flex justify-between pt-1">
              <button onClick={onClose} className="px-4 py-2 text-xs rounded border border-[#dfe7e0]/20 hover:bg-[#dfe7e0]/10">Close</button>
              <button
                onClick={() => void onLogout()}
                disabled={authBusy}
                className="flex items-center gap-2 px-4 py-2 text-xs rounded bg-[#e0231c]/15 text-[#e0231c] border border-[#e0231c]/30 hover:bg-[#e0231c]/25 disabled:opacity-50"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-base font-medium">Student sign in</h3>
              <p className="text-xs text-[#aab4ad] mt-1">Use your own Google account to sign in to the NEET study hub.</p>
            </div>

            {authError && <p role="alert" className="text-sm text-red-400">{authError}</p>}

            <button
              onClick={() => void onGoogleSignIn()}
              disabled={authBusy}
              className="w-full py-3 rounded-lg font-medium text-sm bg-white text-gray-800 hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <LogIn size={17} />
              {authBusy ? 'Opening Google sign-in…' : 'Continue with Google'}
            </button>

            <p className="text-[11px] text-[#aab4ad] leading-relaxed">Each student should sign in with their own Google account. Study progress is currently saved in that browser and does not sync between devices.</p>
          </div>
        )}
      </div>
    </div>
  );
};
