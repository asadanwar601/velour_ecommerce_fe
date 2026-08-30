'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/store';
import { GoogleIcon } from '@/components/Icons';
import { CustomerEmailPasswordForm } from '@/components/auth/CustomerEmailPasswordForm';
import { CustomerOtpAuthForm } from '@/components/auth/CustomerOtpAuthForm';
import { AuthenticatedSessionCard } from '@/components/auth/AuthenticatedSessionCard';

type AuthMode = 'signin' | 'register' | 'otp';

function LoginFormContent() {
  const { user, isAuthenticated, login, signup, openGoogleModal, requestOtp, verifyOtp, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/account';

  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [otpIdentifier, setOtpIdentifier] = useState('');
  const [otpChannel, setOtpChannel] = useState<'EMAIL' | 'WHATSAPP'>('EMAIL');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const res = await login({ email, password });
        if (res.requiresVerification) {
          setOtpIdentifier(email);
          setOtpChannel('EMAIL');
          setOtpSent(true);
          setOtpMessage(res.message || 'Please enter the 6-digit code sent to your email.');
          setMode('otp');
          return;
        }
        setSuccessMessage('Welcome back to the Velour Atelier.');
      } else if (mode === 'register') {
        const res = await signup({ email, password, firstName, lastName, phone });
        if (res.requiresVerification) {
          setOtpIdentifier(email);
          setOtpChannel('EMAIL');
          setOtpSent(true);
          setOtpMessage(res.message || 'Please enter the 6-digit verification code sent to your email.');
          setMode('otp');
          return;
        }
        setSuccessMessage('Account created successfully. Welcome to Velour.');
      }
      if (redirectUrl && redirectUrl !== '/login') {
        setTimeout(() => router.push(redirectUrl), 400);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      const res = await requestOtp({ identifier: otpIdentifier, channel: otpChannel });
      setOtpSent(true);
      setOtpMessage(res.message);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to dispatch OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await verifyOtp({ identifier: otpIdentifier, code: otpCode, channel: otpChannel });
      if (redirectUrl && redirectUrl !== '/login') router.push(redirectUrl);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated && user) {
    return <AuthenticatedSessionCard user={user} onLogout={logout} />;
  }

  return (
    <div className="bg-white border border-sand-200 p-8 sm:p-10 rounded-sm shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold">Atelier Identification</span>
        <h1 className="font-serif text-3xl text-neutral-900">
          {mode === 'signin' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Security Verification'}
        </h1>
      </div>

      <button
        type="button"
        onClick={() => openGoogleModal(redirectUrl)}
        className="w-full py-3 px-4 bg-white border border-sand-300 hover:border-neutral-900 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
      >
        <GoogleIcon size={18} />
        <span>Continue with Google</span>
      </button>

      <div className="flex items-center gap-3 text-xs text-neutral-400 my-2">
        <div className="flex-1 h-px bg-sand-200" />
        <span className="uppercase tracking-widest text-[10px]">Or</span>
        <div className="flex-1 h-px bg-sand-200" />
      </div>

      {errorMessage && <div className="p-3 bg-red-50 text-red-700 text-xs rounded-sm">{errorMessage}</div>}
      {successMessage && <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-sm">{successMessage}</div>}

      {mode === 'otp' ? (
        <CustomerOtpAuthForm
          otpSent={otpSent}
          otpIdentifier={otpIdentifier}
          onIdentifierChange={setOtpIdentifier}
          otpChannel={otpChannel}
          onChannelChange={setOtpChannel}
          otpCode={otpCode}
          onCodeChange={setOtpCode}
          otpMessage={otpMessage}
          isSubmitting={isSubmitting}
          onRequestOtp={handleRequestOtp}
          onVerifyOtp={handleVerifyOtp}
          onReset={() => { setOtpSent(false); setOtpCode(''); }}
        />
      ) : (
        <CustomerEmailPasswordForm
          mode={mode}
          email={email}
          onEmailChange={setEmail}
          password={password}
          onPasswordChange={setPassword}
          firstName={firstName}
          onFirstNameChange={setFirstName}
          lastName={lastName}
          onLastNameChange={setLastName}
          phone={phone}
          onPhoneChange={setPhone}
          isSubmitting={isSubmitting}
          onSubmit={handlePasswordAuthSubmit}
        />
      )}

      <div className="pt-2 border-t border-sand-200 flex items-center justify-between text-xs text-neutral-500">
        {mode === 'signin' ? (
          <>
            <button onClick={() => setMode('register')} className="text-neutral-900 hover:underline cursor-pointer">
              Don't have an account? Register
            </button>
            <button onClick={() => setMode('otp')} className="text-gold-700 hover:underline cursor-pointer">
              Sign in via OTP
            </button>
          </>
        ) : (
          <button onClick={() => setMode('signin')} className="text-neutral-900 hover:underline mx-auto cursor-pointer">
            Already registered? Sign In
          </button>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] bg-sand-50/50 py-16 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Suspense fallback={<div className="text-center text-xs">Loading Atelier Portal...</div>}>
          <LoginFormContent />
        </Suspense>
      </div>
    </div>
  );
}
