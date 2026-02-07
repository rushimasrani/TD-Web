import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { ShieldCheck, Loader2, Check } from 'lucide-react';

interface SmartCaptchaProps {
  onVerify: (token: string | null) => void;
  size?: 'normal' | 'compact';
}

export interface SmartCaptchaHandle {
  reset: () => void;
}

export const SmartCaptcha = forwardRef<SmartCaptchaHandle, SmartCaptchaProps>(({ onVerify, size = 'normal' }, ref) => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

  useImperativeHandle(ref, () => ({
    reset: () => {
      setStatus('idle');
      onVerify(null);
    }
  }));

  const handleVerify = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    setStatus('verifying');
    
    // Simulate network latency and verification logic
    // In a real app, this could call a backend endpoint
    setTimeout(() => {
      setStatus('verified');
      onVerify(`verified-human-token-${Date.now()}`);
    }, 1500);
  };

  const isCompact = size === 'compact';

  return (
    <div 
      className={`relative group bg-slate-50 border border-slate-300 rounded-md shadow-sm flex items-center justify-between transition-all select-none hover:bg-white ${
        isCompact ? 'p-3 w-full flex-col gap-3' : 'px-4 py-3 w-full max-w-[300px] h-[74px]'
      }`}
    >
      <div className={`flex items-center ${isCompact ? 'w-full justify-between' : 'gap-3'}`}>
        <div className="flex items-center gap-3">
            <button
            onClick={handleVerify}
            disabled={status !== 'idle'}
            className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
                status === 'idle' 
                ? 'border-slate-400 bg-white hover:border-brand-500' 
                : 'border-transparent'
            }`}
            aria-label="Click to verify you are human"
            >
            {status === 'idle' && <div className="w-full h-full" />}
            {status === 'verifying' && <Loader2 size={28} className="text-brand-600 animate-spin" />}
            {status === 'verified' && <Check size={20} className="text-green-600" strokeWidth={3} />}
            </button>
            
            <span className={`text-sm font-medium text-slate-700 ${status === 'verified' ? 'text-green-700' : ''}`}>
            {status === 'verified' ? 'Success!' : 'I am human'}
            </span>
        </div>

        {isCompact && status === 'verified' && (
             <ShieldCheck size={16} className="text-brand-200" />
        )}
      </div>

      <div className={`flex flex-col items-end ${isCompact ? 'w-full border-t border-slate-100 pt-2 flex-row justify-between items-center' : ''}`}>
        <div className="flex items-center gap-1 opacity-50">
           <ShieldCheck size={18} className="text-brand-600" />
           <span className="text-[10px] font-bold text-slate-600">SecureCheck</span>
        </div>
        <span className="text-[9px] text-slate-400">Privacy - Terms</span>
      </div>

      {/* Interactive Flash Effect on Hover for idle state */}
      {status === 'idle' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      )}
    </div>
  );
});

SmartCaptcha.displayName = "SmartCaptcha";