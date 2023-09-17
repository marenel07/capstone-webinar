import PageLayout from '@/components/PageLayout';
import { format } from 'date-fns';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/components/HomePage';
import getRegisteredWebinar from '@/actions/getRegisteredWebinar';
import getPostedWebinars from '@/actions/getPostedWebinars';
import RegisteredWebinarPage from '@/components/RegisteredWebinarPage';

const UserRegisteredWebinarPage = async () => {
  const initialData = await getRegisteredWebinar();

  const formattedData = initialData?.map((item) => ({
    ...item,
    date: format(item.createdAt, 'MMMM dd, yyyy'),
  }));

  return (
    <div className='bg-slate-100 min-h-screen'>
      <PageLayout>
        <div className='lg:pt-[107px]'>
          <RegisteredWebinarPage initialData={formattedData} />
        </div>
      </PageLayout>
      <ScrollToTop />
    </div>
  );
};

export default UserRegisteredWebinarPage;
