import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

export default async function page() {
  const session = await getServerSession();
  console.log('session', session);

  return <div>page</div>;
}
