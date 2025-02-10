'use client';
import Image from 'next/image';
import defaultImage from '../../public/assets/defaultblog.png';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { MdDelete } from 'react-icons/md';
import { deleteBlog } from '../actions/blog';
import { useRouter } from 'next/navigation';
function Blog({ id, title, content, image, author, full = false }) {
  const { data: auth } = useSession();
  const router = useRouter();
  const blogContent = full ? content : content.substring(0, 20) + '...';
  return (
    <div
      onClick={() => !full && router.push(`/blog/${id}`)}
      className={` ${
        !full && 'cursor-pointer'
      } bg-white shadow-md p-2 rounded-lg text-black  overflow-hidden space-y-1`}
    >
      <header className=' flex items-center gap-3 bg-black text-white p-2 rounded justify-between '>
        <div className='flex items-center gap-2'>
          <Image
            src={author.photo}
            alt={author.name}
            width={50}
            height={50}
            className='rounded-full aspect-square'
          />{' '}
          <h3>{author.name}</h3>
        </div>
        {auth?.user?.id === author.id && (
          <MdDelete
            className='size-6 text-red-400 cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              deleteBlog(id);
            }}
          />
        )}
      </header>
      <h2>{title}</h2>
      <Image
        src={image ?? defaultImage}
        alt={content}
        width={500}
        height={300}
        className='w-full  object-cover rounded-lg'
      />
      <p>{blogContent}</p>
    </div>
  );
}

export default Blog;
