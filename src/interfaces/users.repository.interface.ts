import { User } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

export interface IUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
