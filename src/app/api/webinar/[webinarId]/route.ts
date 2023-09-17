import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { webinarId: string } }
) {
  try {
    const body = await req.json();
    const { title, description, speaker, imageUrl, time, date } = body;

    if (!title || !description || !speaker || !imageUrl || !time || !date) {
      return new NextResponse('All fields are required', { status: 400 });
    }

    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const webinar = await prisma.webinar.update({
      where: {
        id: params.webinarId,
        authorId: user.id,
      },
      data: {
        title,
        description,
        speaker,
        imageUrl,
        time,
        date,
      },
    });

    return NextResponse.json(webinar);
  } catch (error) {
    console.log('[WWEBINAR_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
