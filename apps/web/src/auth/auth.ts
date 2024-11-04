import { getProfile } from '@/http/get-profile';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function isAuthenticated(): Promise<boolean> {
  const cks = await cookies();
  return !!cks.get('token')?.value;
}

export async function auth() {
  const cks = await cookies();
  const token = cks.get('token')?.value;

  if (!token) {
    redirect('/auth/sign-in');
  }

  try {
    const { user } = await getProfile();

    return user;
  } catch (err) {}
  redirect('api/auth/sign-out');
}
