'use client';
import { SignUp } from '@clerk/nextjs';

export default function CadastroPage() {
  return (
    <div className="mt-5 mb-5 flex justify-center">
      <SignUp fallbackRedirectUrl={'/'} afterSignOutUrl={'/'} />
    </div>
  );
}
