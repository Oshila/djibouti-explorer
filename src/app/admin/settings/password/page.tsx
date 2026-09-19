'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  LockClosedIcon, 
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [success, setSuccess] = useState(false);

  // ⭐ Password strength validation
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    return errors;
  };

  const passwordIssues = validatePassword(newPassword);
  const passwordsMatch = newPassword === confirmPassword && newPassword !== '';
  const isPasswordValid = passwordIssues.length === 0 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (passwordIssues.length > 0) {
      setError(`Password must contain: ${passwordIssues.join(', ')}`);
      return;
    }

    if (!passwordsMatch) {
      setError('New passwords do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return;
    }

    const user = auth.currentUser;
    if (!user || !user.email) {
      setError('You must be logged in to change your password');
      return;
    }

    setLoading(true);

    try {
      // ⭐ Re-authenticate user before changing password (security requirement)
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // ⭐ Update password
      await updatePassword(user, newPassword);

      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success('Password changed successfully!');

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin');
      }, 2000);

    } catch (err: any) {
      // ⭐ Generic error messages (no leaks)
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Current password is incorrect');
      } else if (err.code === 'auth/weak-password') {
        setError('New password is too weak');
      } else if (err.code === 'auth/requires-recent-login') {
        setError('Please log out and log in again, then try again');
      } else {
        setError('Failed to change password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/settings"
          className="p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 text-nearblack/60" />
        </Link>
        <div>
          <h1 className="text-3xl font-heading text-teal">Change Password</h1>
          <p className="text-nearblack/60">Update your admin account password</p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-olive/10 border border-olive/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircleIcon className="w-6 h-6 text-olive flex-shrink-0" />
          <div>
            <p className="font-medium text-olive">Password changed successfully!</p>
            <p className="text-sm text-olive/80">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-cream p-6 md:p-8">
        {/* Security Notice */}
        <div className="bg-teal/5 rounded-xl p-4 mb-6 border border-teal/10 flex items-start gap-3">
          <ShieldCheckIcon className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-teal">Security Requirements</p>
            <p className="text-xs text-nearblack/60 mt-1">
              For your security, you must enter your current password to set a new one.
              Your new password must contain:
            </p>
            <ul className="text-xs text-nearblack/60 mt-2 space-y-0.5 list-disc list-inside">
              <li>At least 8 characters</li>
              <li>One uppercase and one lowercase letter</li>
              <li>One number and one special character</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-2">
              Current Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nearblack/30" />
              <input
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/20"
                placeholder="Enter current password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-2">
              New Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nearblack/30" />
              <input
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-cream focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all outline-none bg-cream/20"
                placeholder="Enter new password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nearblack/40 hover:text-teal transition-colors"
                tabIndex={-1}
              >
                {showPasswords ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Password Strength Indicators */}
            {newPassword && (
              <div className="mt-3 space-y-1.5">
                {[
                  { label: 'At least 8 characters', valid: newPassword.length >= 8 },
                  { label: 'One uppercase letter', valid: /[A-Z]/.test(newPassword) },
                  { label: 'One lowercase letter', valid: /[a-z]/.test(newPassword) },
                  { label: 'One number', valid: /[0-9]/.test(newPassword) },
                  { label: 'One special character', valid: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      check.valid ? 'bg-olive' : 'bg-gray-200'
                    }`}>
                      {check.valid && <CheckCircleIcon className="w-3 h-3 text-white" />}
                    </div>
                    <span className={check.valid ? 'text-olive' : 'text-nearblack/40'}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-nearblack/70 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nearblack/30" />
              <input
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                className={`w-full pl-11 pr-11 py-3.5 rounded-xl border focus:ring-2 transition-all outline-none bg-cream/20 ${
                  confirmPassword && !passwordsMatch
                    ? 'border-terracotta focus:border-terracotta focus:ring-terracotta/20'
                    : 'border-cream focus:border-teal focus:ring-teal/20'
                }`}
                placeholder="Confirm new password"
                autoComplete="new-password"
                required
              />
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="mt-2 text-xs text-terracotta">Passwords do not match</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="bg-terracotta/10 border border-terracotta/20 rounded-xl p-3.5">
              <p className="text-sm text-terracotta text-center font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !isPasswordValid || !currentPassword || success}
            className="w-full bg-teal hover:bg-teal/90 text-white py-3.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Updating password...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-nearblack/40">
          After changing your password, you'll be redirected to the dashboard.
        </p>
      </div>
    </div>
  );
}