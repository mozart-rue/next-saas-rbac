import { isAuthenticated } from '@/auth/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = await isAuthenticated();
  if (isAuth) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <div className='w-full max-w-xs'>{children}</div>
    </div>
  );
}
