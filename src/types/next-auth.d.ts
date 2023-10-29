import { ROLE } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import "next-auth/jwt";

type UserId = string;
type IdNumber = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    idNumber: IdNumber;
    role: ROLE;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      idNumber: string;
      role: string;
    };
  }

  interface User {
    id: UserId;
    idNumber: IdNumber;
    role: ROLE;
  }
}

declare module "";

//user types from session
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   image: string;
//   role: ROLE;
// };
