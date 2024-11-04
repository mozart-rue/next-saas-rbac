import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

import Image from 'next/image';

import gitHubLogo from '@/assets/github-icon.svg';

export default function SignUpPage() {
  return (
    <form action='' className='space-y-4'>
      <div className='space-y-1'>
        <Label htmlFor='email'>Name</Label>
        <Input type='text' name='name' id='name' />
      </div>

      <div className='space-y-1'>
        <Label htmlFor='email'>E-mail</Label>
        <Input type='email' name='email' id='email' />
      </div>

      <div className='space-y-1'>
        <Label htmlFor='password'>Password</Label>
        <Input type='password' name='password' id='password' />
      </div>

      <div className='space-y-1'>
        <Label htmlFor='password_confirmation'>Confirm your password</Label>
        <Input
          type='password'
          name='password_confirmation'
          id='password_confirmation'
        />
      </div>

      <Button type='submit' className='w-full'>
        Create account
      </Button>

      <Button variant='link' className='w-full' size='sm' asChild>
        <Link href='/auth/sign-in'>Already have an account? Sign in</Link>
      </Button>

      <Separator />

      <Button type='button' variant='outline' className='w-full'>
        <Image src={gitHubLogo} className='mr-2 size-4 dark:invert' alt='' />
        Sign up with GitHub
      </Button>
    </form>
  );
}
