"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./CellAction";
import { ROLE } from "@prisma/client";

export type ParticipantColumn = {
  id: string;
  idNumber: string;
  name: string;
  role: ROLE;
  email: string | null;
  phone: string | null;
  year: string;
  department: string;
  course: string;
  createdAt: string;
};

export const columns: ColumnDef<ParticipantColumn>[] = [
  {
    accessorKey: "idNumber",
    header: "ID number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email address",
  },
  {
    accessorKey: "phone",
    header: "Phone number",
  },
  {
    accessorKey: "course",
    header: "Course",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
