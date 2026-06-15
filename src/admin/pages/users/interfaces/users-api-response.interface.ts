import type { AuthUser } from './auth-user.interface';

export interface UsersApiResponse {
  page: number;
  limit: number;
  total: number;
  next: string;
  previous: null;
  users: AuthUser[];
}
