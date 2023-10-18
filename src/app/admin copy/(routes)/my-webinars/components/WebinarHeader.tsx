'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Heading from '@/components/Heading';
import { ActionTooltip } from '@/components/ActionTooltip';
import axios from 'axios';
import { Webinar } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface WebinarHeaderProps {
  webinarId: string;
  webinar: Webinar | null;
}

const WebinarHeader = ({ webinarId, webinar }: WebinarHeaderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onPost = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/webinar/${webinarId}/post`);

      toast({
        title: 'Your webinar has been posted.',
      });
      router.refresh();
    } catch (error) {
      toast({
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex justify-between items-start'>
      <Heading title='Manage Webinar' description='Manage your webinar here.' />
      <ActionTooltip
        label={webinar?.isPosted ? 'Posted to public' : 'Post to public'}
      >
        <Button disabled={loading} onClick={onPost} className='px-6'>
          {webinar?.isPosted ? 'Posted' : 'Post'}
        </Button>
      </ActionTooltip>
    </div>
  );
};

export default WebinarHeader;
