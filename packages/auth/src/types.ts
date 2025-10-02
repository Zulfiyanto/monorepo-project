import { USER_ROLES, type UserRole } from "@repo/utils";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
}

export interface AuthSession {
  user: User;
  expires: string;
}

export const isAdmin = (user: User | null | undefined): boolean => {
  return user?.role === USER_ROLES.ADMIN;
};

export const isUser = (user: User | null | undefined): boolean => {
  return user?.role === USER_ROLES.USER;
};
