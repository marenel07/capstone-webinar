'use client';

import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { Zoom } from './ZoomImage';
import { Webinar } from '@/types/types';
import { Button } from './ui/button';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface WebinarItemHomePageProps {
  data: Webinar;
  className?: string;
}

const WebinarItemHomePage: React.FC<WebinarItemHomePageProps> = ({
  data,
  className,
}) => {
  const router = useRouter();

  return (
    <Card className={cn('flex flex-col min-h-fit overflow-hidden', className)}>
      <div className='flex relative'>
        <Zoom>
          <Image
            alt={data.title}
            src={data.imageUrl}
            className='object-cover w-[800px] h-[350px]'
            width={800}
            height={350}
          />
        </Zoom>
      </div>

      <div>
        <CardHeader>
          <CardTitle>
            <span className='text-lg font-semibold'>{data.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className='text-sm text-neutral-500'>{data.description}</p>

          <div className='flex flex-col items-start mt-4'>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-neutral-500'>When:</span>
              <span className='text-sm text-neutral-700'>
                {data.date} ({data.time})
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-neutral-500'>Speaker :</span>
              <span className='text-sm text-neutral-700'>{data.speaker}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex gap-8 group'>
            <Button
              onClick={() =>
                router.push(`/user/webinar/registration/${data.id}`)
              }
              className='flex items-center'
            >
              <span>Register Webinar</span>
              <MoveRight
                size={20}
                className='lg:block ml-1 group-hover:translate-x-2 repeat-infinite transition-transform duration-300 ease-in-out'
              />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItemHomePage;
