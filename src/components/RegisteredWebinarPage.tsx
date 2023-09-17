import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Webinar } from '@/types/types';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import WebinarItemHomePage from './WebinarItemHomePage';
import WebinarItemRegistered from './WebinarItemRegistered';

interface WebinarListsProps {
  initialData: Webinar[] | null | undefined;
}

const RegisteredWebinarPage = ({ initialData }: WebinarListsProps) => {
  return (
    <div className='p-6 flex flex-col gap-6'>
      <Suspense fallback={<div>Loading... </div>}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {initialData?.map((item) => (
            <WebinarItemRegistered key={item.id} data={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default RegisteredWebinarPage;
