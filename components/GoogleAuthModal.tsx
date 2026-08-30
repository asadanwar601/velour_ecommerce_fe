'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store';
import { AUTH_CONFIG } from '@/lib/config';
import { GoogleIcon, CloseIcon } from './Icons';
import { GoogleAccountPickerStep, GoogleAccount } from './auth/GoogleAccountPickerStep';
import { GoogleMfaChallengeStep } from './auth/GoogleMfaChallengeStep';

const PRECONFIGURED_ACCOUNTS: readonly GoogleAccount[] = AUTH_CONFIG.preconfiguredAccounts;

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export default function GoogleAuthModal({ isOpen, onClose, redirectTo }: GoogleAuthModalProps) {
  const { googleLogin } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<'SELECT_ACCOUNT' | 'MFA_CHALLENGE'>('SELECT_ACCOUNT');
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);
  const [activeMfaMethod, setActiveMfaMethod] = useState<'TOTP' | 'PHONE_SMS' | 'PHONE_PROMPT'>('TOTP');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [mfaCode, setMfaCode] = useState('749210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const finalizeGoogleAuth = async (
    email: string,
    displayName: string,
    avatarUrl: string,
    googleId: string,
  ) => {
    setIsProcessing(true);
    setErrorMsg('');
    try {
      await googleLogin({
        email,
        displayName,
        avatarUrl,
        googleId,
        idToken: `simulated_google_id_token_${Date.now()}`,
      });
      onClose();
      if (redirectTo) router.push(redirectTo);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Authentication failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectAccount = (account: GoogleAccount) => {
    setSelectedAccount(account);
    setErrorMsg('');

    if (account.mfaType === 'NONE') {
      finalizeGoogleAuth(account.email, account.name, account.avatar, account.id);
    } else {
      setActiveMfaMethod(account.mfaType as 'TOTP' | 'PHONE_SMS' | 'PHONE_PROMPT');
      setStep('MFA_CHALLENGE');
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;
    finalizeGoogleAuth(selectedAccount.email, selectedAccount.name, selectedAccount.avatar, selectedAccount.id);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) {
      setErrorMsg('Please enter a valid Google email.');
      return;
    }
    const email = customEmail.trim().toLowerCase();
    const name = customName.trim() || email.split('@')[0];
    const avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
    const id = `goog_${Date.now()}`;
    const newAcc: GoogleAccount = { id, name, email, avatar, mfaType: 'TOTP' };
    setSelectedAccount(newAcc);
    setActiveMfaMethod('TOTP');
    setStep('MFA_CHALLENGE');
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-[#16130f]/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white border border-sand-200 rounded-sm shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <CloseIcon size={20} />
        </button>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center">
            <GoogleIcon size={24} />
          </div>
          <h2 className="font-serif text-2xl text-neutral-900">Sign in with Google</h2>
          <p className="text-xs text-neutral-500">Fast, passwordless atelier authentication</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm text-left">
            {errorMsg}
          </div>
        )}

        {isProcessing ? (
          <div className="py-8 space-y-3">
            <div className="w-8 h-8 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-neutral-600 font-medium">Securing session with VELOUR...</p>
          </div>
        ) : step === 'SELECT_ACCOUNT' ? (
          <GoogleAccountPickerStep
            accounts={PRECONFIGURED_ACCOUNTS}
            onSelectAccount={handleSelectAccount}
            showCustomForm={showCustomForm}
            onToggleCustomForm={setShowCustomForm}
            customEmail={customEmail}
            onCustomEmailChange={setCustomEmail}
            customName={customName}
            onCustomNameChange={setCustomName}
            onCustomSubmit={handleCustomSubmit}
          />
        ) : (
          <GoogleMfaChallengeStep
            selectedAccount={selectedAccount!}
            activeMfaMethod={activeMfaMethod}
            onMfaMethodChange={setActiveMfaMethod}
            mfaCode={mfaCode}
            onMfaCodeChange={setMfaCode}
            onSubmit={handleMfaSubmit}
            onBack={() => setStep('SELECT_ACCOUNT')}
          />
        )}
      </div>
    </div>
  );
}
