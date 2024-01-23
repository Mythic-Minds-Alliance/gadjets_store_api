import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types/types';
import { IUserController } from '../interfaces/users.controller.interface';
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction): void {
    next(new HTTPError(401, 'authorization error', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction): void {
    this.ok(res, 'register');
  }
}
