import Link from 'next/link';
import React from 'react';
import Blog from '../../../components/Blog';
import prisma from '../../../utils/prisma';

async function page({ params }) {
  const id = (await params).id;
  const blog = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: { author: true },
  });

  return (
    <main>
      <Link href='/blog' className='text-center block p-2'>
        Back
      </Link>
      <div className=' block mx-auto w-[90%] md:w-[50%] p-2 md:p-5'>
        <Blog {...blog} full />
      </div>
    </main>
  );
}

export default page;
