import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './controllers/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './interfaces/logger.interface';
import { TYPES } from './types/types';
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import dotenv from 'dotenv';
import cors from 'cors';
import { ProductController } from './controllers/products.controller';
import { PhoneController } from './controllers/phones.controller';
import { SequelizeService } from './services/sequelize.service';

dotenv.config();

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number | string | undefined;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ProductController)
    private productController: ProductController,
    @inject(TYPES.PhoneController)
    private phoneController: PhoneController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = process.env.port;
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  useMiddleware(): void {
    this.app.use(express.json());
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
    this.app.use('/', this.productController.router);
    this.app.use('/', this.phoneController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useStaticImg(): void {
    this.app.use(express.static('public'));
    this.app.use(express.static(__dirname + '/public'));
  }

  public async init(): Promise<void> {
    this.useCors();
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.useStaticImg();
    this.server = this.app.listen(this.port);
    this.logger.log(
      `Server started on ${process.env.SERVER_HOST}:${this.port}`,
    );
  }
}
