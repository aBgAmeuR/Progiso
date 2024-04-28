'use client';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

type TSignInButtonProps = {
  text?: string;
};

export const SignInButton = ({ text = 'Sign in' }: TSignInButtonProps) => {
  const handleClick = () => {
    signIn('github', {
      callbackUrl: `${window.location.origin}/projects`,
    });
  };

  return <Button onClick={handleClick}>{text}</Button>;
};
