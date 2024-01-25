import { injectable } from 'inversify/lib/annotation/injectable';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/user.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../interfaces/config.service.interface';
import { inject } from 'inversify';
import { IUsersRepository } from '../interfaces/users.repository.interface';
import { UserModel } from '../models/users.roles.model';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<UserModel | null> {
    console.log(email, name);
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    }
    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(
      existedUser.email,
      existedUser.password,
      existedUser.password,
    );

    return newUser.comparePassword(password);
  }
}
