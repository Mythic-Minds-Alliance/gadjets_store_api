import { User } from '../entities/user.entity';
import { Role } from '../models/role.model';
import { UserModel } from '../models/user.model';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
  getUserRole: (userId: number) => Promise<Role | null>;
  getRoleId: (userId: number) => Promise<number | null>;
  getRole: (roleId: number) => Promise<string | null>;
}
