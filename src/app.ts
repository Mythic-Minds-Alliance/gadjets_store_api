import express, { Express } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types/types';
import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import dotenv from 'dotenv';
import cors from 'cors';
import { ProductController } from './products/products.controller';
import { SequelizeService } from './services/sequelize/sequelize.service';
import bodyParser from 'body-parser';

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
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    this.app = express();
    this.port = process.env.port;
    this.configureMiddleware();
  }

  configureMiddleware(): void {
    this.app.use(bodyParser.json());

    this.useCors();
    this.useRoutes();
    this.useExceptionFilters();
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
    this.app.use('/', this.productController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.server = this.app.listen(this.port);
    this.logger.log(
      `Server started on ${process.env.SERVER_HOST}:${this.port}`,
    );
  }
}
