'use server';

import { revalidatePath } from 'next/cache';
import prisma from '../utils/prisma';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function deleteBlog(id) {
  const session = await getServerSession(authOptions);
  id = parseInt(id);

  try {
    if (!id) {
      return 'No post found';
    }
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!blog) {
      return 'No post found';
    }
    if (session.user.id !== blog.authorId) {
      return 'You are not authorized to delete this post';
    }
    await prisma.post.delete({
      where: {
        id: id,
      },
    });
    revalidatePath('/blog');
    return 'Post deleted successfully';
  } catch (e) {
    console.log(e);
    return 'Error deleting post';
  }
}

export async function addBlog(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const session = await getServerSession(authOptions);
  const authorId = session.user.id;
  if (!title || !content) {
    return 'Please fill all fields';
  }
  try {
    await prisma.post.create({
      data: {
        title: title,
        content: content,
        authorId: authorId,
      },
    });
    revalidatePath('/blog');
    return 'Post added successfully';
  } catch (e) {
    console.log(e);
    return 'Error adding post';
  }
}
