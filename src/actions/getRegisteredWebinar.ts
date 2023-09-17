import { cache } from 'react';
import getCurrentUser from './getCurrentUser';
import prisma from '@/lib/prismadb';

const getRegisteredWebinar = cache(async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const webinars = await prisma.webinar.findMany({
      where: {
        participants: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (!webinars) {
      return null;
    }

    return webinars;
  } catch (error) {
    console.log('WEBINARS ERROR: ', error);
    return null;
  }
});

export default getRegisteredWebinar;
