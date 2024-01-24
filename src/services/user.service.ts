import { injectable } from 'inversify/lib/annotation/injectable';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/user.interface';
import { TYPES } from '../types/types';
import { IConfigService } from '../interfaces/config.service.interface';
import { inject } from 'inversify';

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    // console.log(salt);
    await newUser.setPassword(password, Number(salt));
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
