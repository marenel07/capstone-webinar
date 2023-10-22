"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Users = {
  idNumber: string;
  firstName: string;
  lastName: string;
  course: string;
  year: string;
  department: string;
};

interface UserAddTableProps {
  users: Users[];
}

const UserAddTable = ({ users }: UserAddTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID Number</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Year</TableHead>
          <TableHead>Department</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.idNumber}>
            <TableCell>{user.idNumber}</TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.course}</TableCell>
            <TableCell>{user.year}</TableCell>
            <TableCell>{user.department}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserAddTable;
