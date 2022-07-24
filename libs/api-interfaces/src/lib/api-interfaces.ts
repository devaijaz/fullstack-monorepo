export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  username: string;
  password: string;
  email: string;
  fullname: string;
  role: UserRole;
}

export type UserBean = Pick<User, 'email' | 'fullname' | 'username' | 'role'>;
