'use client';

import { DataTable } from './DataTable';

import { ParticipantColumn, columns } from './Columns';

interface ProductClientProps {
  data: ParticipantColumn[];
}

export const ParticipantTable: React.FC<ProductClientProps> = ({ data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} searchKey='name' />
    </>
  );
};
