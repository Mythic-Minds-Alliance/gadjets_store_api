import { IMiddleware } from '../interfaces/middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify/lib/annotation/inject';
import { TYPES } from '../types/types';
import { injectable } from 'inversify';
import { IUsersRepository } from '../interfaces/users.repository.interface';

@injectable()
export class AuthGuard implements IMiddleware {
  private usersRepository: IUsersRepository;

  constructor(
    @inject(TYPES.UsersRepository) usersRepository: IUsersRepository,
  ) {
    this.usersRepository = usersRepository;
  }
  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (req.user) {
      const userId = await this.usersRepository.find(req.user);
      const userRoleId = await this.usersRepository.getRoleId(
        Number(userId?.dataValues.id),
      );
      const userRole = await this.usersRepository.getRole(Number(userRoleId));
      console.log('user role: ', userRole);
      if (userRole !== 'admin') {
        res.status(403).send('Insufficient permissions');
      }
      return next();
    }
    res.status(401).send({ error: 'Authorization failed!' });
  }
}
