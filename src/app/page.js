'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import homePage from './../../public/homePage.svg';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function Home() {
  const { data: auth, status } = useSession();

  return (
    <div className=' flex flex-col items-center pt-8  space-y-10'>
      <h1 className='text-2xl font-bold tracking-widest'>NEXT BLOG</h1>
      <main
        className='  flex flex-col  items-center justify-start md:flex-row gap-5 
  px-10 py-2 w-[80%]'
      >
        <div className=' w-1/2'>
          <Image
            src={homePage}
            alt='Blogging'
            width={400}
            height={200}
            className='w-full'
          />
        </div>
        <div className=' w-1/2 flex flex-col justify-center items-center gap-5'>
          <p className='text-lg leading-[2] tracking-widest w-[80%]'>
            Next blog is a blogging platform that let’s you express your
            opinions ,share news , post about any field you want and more so
            join us and feel free to blog anything
          </p>
          {status === 'authenticated' ? (
            <Link
              href='/blog'
              className=' flex items-center gap-1 border rounded-lg py-2 px-4 hover:bg-white hover:border-black hover:text-black transition-all duration-300'
            >
              Start Blogging
            </Link>
          ) : (
            <button
              onClick={() => signIn('google')}
              className=' flex items-center gap-1 border rounded-lg py-2 px-4 hover:bg-white hover:border-black hover:text-black transition-all duration-300'
            >
              Sign in with Google <FcGoogle className='size-7' />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
