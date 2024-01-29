import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { IUserController } from '../interfaces/users.controller.interface';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserRegisterDto } from '../dto/user-register.dto';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../interfaces/config.service.interface';
import { IUserService } from '../interfaces/user.service.interface';
import { AuthGuard } from '../middlewares/auth.guard';
import { IUsersRepository } from '../interfaces/users.repository.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/info',
        method: 'get',
        func: this.info,
        middlewares: [new AuthGuard(usersRepository)],
      },
    ]);
  }

  async login(
    { body }: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(body);
    if (!result) {
      return next(new HTTPError(401, 'authorization error', 'login'));
    }
    console.log('Login...');
    const jwt = await this.signJWT(
      body.email,
      this.configService.get('SECRET') || process.env.SECRET || '',
    );
    this.ok(res, { jwt });
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);
    if (!result) {
      return next(new HTTPError(422, 'this user already exist'));
    }
    this.ok(res, { email: result.email, id: result.id });
  }

  async info(
    { user }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log('Auth', 'Validating token');
    const userInfo = await this.userService.getUserInfo(user);
    this.ok(res, { email: userInfo?.email, id: userInfo?.id });
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
