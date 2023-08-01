import prisma from '@/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = body;
    console.log(token);

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return new NextResponse('Invalid token', { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error(error, 'EMAIL-VERIFY_ERROR');
    return new NextResponse('Internal server error', { status: 500 });
  }
}
