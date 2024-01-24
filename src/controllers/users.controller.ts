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
import { User } from '../entities/user.entity';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): void {
    console.log(req.body);
    next(new HTTPError(401, 'authorization error', 'login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newUser = new User(body.email, body.name);
    await newUser.setPassword(body.password);
    this.ok(res, 'register');
  }
}
