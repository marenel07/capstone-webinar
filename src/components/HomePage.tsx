import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Webinar } from '@/types/types';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import WebinarItemHomePage from './WebinarItemHomePage';

interface WebinarListsProps {
  initialData: Webinar[] | null | undefined;
}

const HomePage: React.FC<WebinarListsProps> = ({ initialData }) => {
  return (
    <div className='p-6 flex flex-col gap-6'>
      <Suspense fallback={<div>Loading... </div>}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {initialData?.map((item) => (
            <WebinarItemHomePage key={item.id} data={item} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};

export default HomePage;
