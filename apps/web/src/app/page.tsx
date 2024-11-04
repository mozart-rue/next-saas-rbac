import { auth } from '@/auth/auth';

export default async function Home() {
  const user = await auth();

  return <p>{user.name ?? 'Not found'}</p>;
}
