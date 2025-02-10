import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { SECRET } from './utils/secrets';

export default async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*'],
};
