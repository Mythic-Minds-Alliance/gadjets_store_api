import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../interfaces/common/config.service.interface';
import { IUsersRepository } from '../interfaces/users/users.repository.interface';
import { IUserService } from '../interfaces/users/user.service.interface';
import { TYPES } from '../types/types';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
  find: jest.fn(),
  create: jest.fn(),
  getRoleId: jest.fn(),
  getRole: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  container
    .bind<IConfigService>(TYPES.ConfigService)
    .toConstantValue(ConfigServiceMock);
  container
    .bind<IUsersRepository>(TYPES.UsersRepository)
    .toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  userService = container.get<IUserService>(TYPES.UserService);
});

describe('User service', () => {
  it('createUser', async () => {
    configService.get = jest.fn().mockResolvedValueOnce('1');
    usersRepository.create = jest.fn().mockImplementationOnce((user: User) => {
      return {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        id: 1,
      };
    });
    const createdUser = await userService.createUser({
      email: 'ihormail@mate.ua',
      password: '111',
      firstName: 'ihor',
      lastName: 'karpyn',
    });
    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual('1');
  });
});
