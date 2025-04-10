import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { sessionOptions } from './helpers/auth/session';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  try {
    const session = await getIronSession(req, res, sessionOptions);

    const { token } = session;
    if (token) {
      let headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const authRequestResult = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/account`, {
        headers,
      });

      if (authRequestResult.status === 200 || authRequestResult.status === 201) {
        const result = await authRequestResult.json();

        session.user = result;
        await session.save();

        return res;
      }
      session.destroy();
    }
  } catch (error) {
    console.error('Session error:', error);
  }
  return res;
};
