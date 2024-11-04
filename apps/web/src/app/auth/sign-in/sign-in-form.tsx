'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import Image from 'next/image';
import { AlertTriangle, Loader2 } from 'lucide-react';

import gitHubLogo from '@/assets/github-icon.svg';
import { signInWithEmailAndPassword } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useFormState } from '@/hooks/use-form-state';
import { useRouter } from 'next/navigation';

export function SingInForm() {
  const router = useRouter();
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => router.push('/')
  );

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {success === false && message && (
        <Alert variant='destructive'>
          <AlertTriangle className='size-4' />
          <AlertTitle>Sign in failed</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className='space-y-1'>
        <Label htmlFor='email'>E-mail</Label>
        <Input type='text' name='email' id='email' />

        {errors?.email && (
          <p className='text-xs font-medium text-red-500 dark:text-red-400'>
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' name='password' id='password' />

        {errors?.password && (
          <p className='text-xs font-medium text-red-500 dark:text-red-400'>
            {errors.password[0]}
          </p>
        )}

        <Link
          href='/auth/forgot-password'
          className='text-xs font-medium text-foreground hover:underline'
        >
          Forget your password?
        </Link>
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? (
          <Loader2 className='size-2 animate-spin' />
        ) : (
          'Sign in with email'
        )}
      </Button>

      <Button variant='link' className='w-full' size='sm' asChild>
        <Link href='/auth/sign-up'>Create new account</Link>
      </Button>

      <Separator />

      <Button type='button' variant='outline' className='w-full'>
        <Image src={gitHubLogo} className='mr-2 size-4 dark:invert' alt='' />
        Sign in with GitHub
      </Button>
    </form>
  );
}
