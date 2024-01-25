import { inject, injectable } from 'inversify';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { UserModel } from '../models/user.model';
import { User } from '../entities/user.entity';
import { TYPES } from '../types/types';
import { SequelizeService } from '../services/sequelize.service';

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
  ) {}

  async create({ email, password, name }: User): Promise<UserModel> {
    console.log(email, password, name);
    return UserModel.create({
      email,
      password,
      firstName: name,
      lastName: name,
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return UserModel.findOne({
      where: {
        email,
      },
    });
  }
}
