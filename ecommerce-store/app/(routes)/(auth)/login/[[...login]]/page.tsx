'use client';
import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="mt-5 mb-5 flex justify-center">
      <SignIn afterSignOutUrl={'/'} fallbackRedirectUrl={'/'} />;
    </div>
  );
}
