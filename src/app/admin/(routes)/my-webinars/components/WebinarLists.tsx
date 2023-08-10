import WebinarItem from '@/components/WebinarItem';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Webinar } from '@/types/types';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

interface WebinarListsProps {
  initialData: Webinar[] | null | undefined;
}

const WebinarLists: React.FC<WebinarListsProps> = ({ initialData }) => {
  return (
    <div className='p-6 flex flex-col gap-6'>
      <div className='flex items-center justify-end'>
        <Link
          href='/admin/my-webinars/create'
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'hover:bg-neutral-50'
          )}
        >
          <PlusCircle size={20} className='mr-2' />{' '}
          <span>Create new webinar</span>
        </Link>
      </div>
      <Suspense fallback={<div>Loading... </div>}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {initialData?.map((item) => (
            <WebinarItem key={item.id} data={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default WebinarLists;
