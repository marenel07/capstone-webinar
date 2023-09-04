import PageLayout from '@/components/PageLayout';
import { format } from 'date-fns';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/components/HomePage';
import getAllWebinars from '@/actions/getAllWebinars';

const WebinarsPage = async () => {
  const initialData = await getAllWebinars();

  const formattedData = initialData?.map((item) => ({
    ...item,
    date: format(item.createdAt, 'MMMM dd, yyyy'),
  }));

  return (
    <div className='bg-slate-100 min-h-screen'>
      <PageLayout>
        <div className='lg:pt-[107px]'>
          <HomePage initialData={formattedData} />
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default WebinarsPage;
