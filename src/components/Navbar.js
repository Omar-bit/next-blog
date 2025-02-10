'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DropDown from '../components/DropDown';
import Image from 'next/image';
import { CiLogout } from 'react-icons/ci';

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Blog',
    path: '/blog',
  },
];
export default function Navbar() {
  const path = usePathname();
  const { status, data: auth } = useSession();

  if (path === '/') {
    return null;
  }
  return (
    <nav className='flex items-center justify-around gap-4 px-2 py-4 text-white border-b-2 border-gray-200'>
      <h1 className='text-2xl '>Next Blog</h1>
      <ul className='flex items-center justify-around gap-4'>
        {routes.map((route, index) => (
          <li
            className={`${
              path === route.path && 'underline underline-offset-2'
            } cursor-pointer  rounded-md    transition-all duration-300`}
            key={index}
          >
            <Link href={route.path} className='  p-2'>
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
      {status === 'authenticated' && (
        <div>
          <DropDown
            header={
              <div className='flex items-center gap-2  cursor-pointer'>
                <Image
                  src={auth.user.photo}
                  alt={auth.user.email}
                  width={50}
                  height={50}
                  className='rounded-full aspect-square shadow-md'
                />
                <span className=' text-sm'>{auth.user.name}</span>
              </div>
            }
          >
            <div>
              <button
                onClick={() => signOut()}
                className='flex items-center gap-2 p-2 bg-black text-white rounded-md w-full'
              >
                Sign out <CiLogout />{' '}
              </button>
            </div>
          </DropDown>
        </div>
      )}
    </nav>
  );
}
