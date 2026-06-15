import type { AuthRole } from '../types/role-user.type';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole[];
  emailValidated: boolean;
}
