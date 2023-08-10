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
import { Play, Settings2 } from 'lucide-react';

interface WebinarItemProps {
  data: Webinar;
  className?: string;
}

const WebinarItem: React.FC<WebinarItemProps> = ({ data, className }) => {
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
                {data.date} ({data.time} AM)
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-neutral-500'>Speaker :</span>
              <span className='text-sm text-neutral-700'>{data.speaker}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className='flex gap-8'>
            <Button variant='secondary'>
              <Settings2 size={20} className='hidden lg:block mr-2' />
              <span>Manage</span>
            </Button>
            <Button>
              <Play size={20} className='hidden lg:block mr-2' />
              <span>Start Session</span>
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default WebinarItem;
