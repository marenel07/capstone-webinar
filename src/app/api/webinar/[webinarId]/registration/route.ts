import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { name, email, number, age, address, occupation, company } = body;

    const { searchParams } = new URL(req.url);

    const webinarId = searchParams.get('webinarId');

    if (!webinarId) {
      return new NextResponse('Webinar id is required', { status: 400 });
    }

    if (
      !name ||
      !email ||
      !number ||
      !age ||
      !address ||
      !occupation ||
      !company
    ) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const webinar = await prisma.webinar.update({
      where: {
        id: webinarId,
      },
      data: {
        participants: {
          create: [
            {
              userId: user.id,
              name,
              email,
              number,
              age,
              address,
              occupation,
              company,
            },
          ],
        },
      },
    });

    return NextResponse.json(webinar);
  } catch (error) {
    console.log('[WWEBINAR_REGISTRATION_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
