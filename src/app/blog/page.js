import prisma from '../../utils/prisma';
import Blog from '../../components/Blog';
import { addBlog } from '../../actions/blog';
// export const dynamic = 'force-dynamic';

export default async function page() {
  const blogs = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className=' p-2 md:p-5'>
      <h1 className='text-3xl font-bold'>Blogs</h1>
      <form
        action={addBlog}
        className='flex flex-col gap-2 border rounded p-2 my-2 shadow text-black'
      >
        <h3 className='font-semibold text-white'>Create a new post!</h3>
        <input
          type='text'
          placeholder='title'
          name='title'
          className='rounded px-2 py-1'
        />
        <input
          type='text'
          placeholder='content'
          name='content'
          className='rounded px-2 py-1'
        />
        <button type='submit' className='bg-white py-1 rounded'>
          Create
        </button>
      </form>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {blogs.map((blog, index) => (
          <Blog key={index} {...blog} />
        ))}
      </div>
    </main>
  );
}
