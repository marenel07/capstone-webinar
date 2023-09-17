'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { DataTable } from './DataTable';

import { ParticipantColumn, columns } from './Columns';

interface ProductClientProps {
  data: ParticipantColumn[];
}

export const ParticipantTable: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <DataTable columns={columns} data={data} searchKey='name' />
    </>
  );
};
