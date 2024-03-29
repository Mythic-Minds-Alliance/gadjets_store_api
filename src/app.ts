import 'reflect-metadata';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { ILogger } from './interfaces/common/logger.interface';
import { TYPES } from './types/types';
import { injectable, inject } from 'inversify';
import { ISequelize } from './interfaces/db/sequelize.interface';
import { IUserService } from './interfaces/users/user.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserController } from './controllers/users.controller';
import { ProductController } from './controllers/products.controller';
import { IConfigService } from './interfaces/common/config.service.interface';
import { AuthMiddleware } from './middlewares/auth.middleware';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { ShoppingCartController } from './controllers/shoppingCarts.controller';
import { IShoppingCartService } from './interfaces/shoppingCart/shoppingCart.interface';
import { FavouriteService } from './services/favourite.service';
import { FavouritesController } from './controllers/favourite.controller';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number | string | undefined;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: ISequelize,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ShoppingCartService)
    private shoppingCartService: IShoppingCartService,
    @inject(TYPES.FavouriteService)
    private favouriteService: FavouriteService,
    @inject(TYPES.FavouritesController)
    private favouriteController: FavouritesController,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ProductController)
    private productController: ProductController,
    @inject(TYPES.ShoppingCartController)
    private shpController: ShoppingCartController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    this.app = express();
    this.port = this.configService.get('PORT') || process.env.PORT;
    const authMiddleware = new AuthMiddleware(
      this.configService.get('SECRET') || process.env.SECRET || '',
    );
    this.app.use(authMiddleware.execute.bind(authMiddleware));
    this.configureMiddleware();
  }

  useCors(): void {
    this.app.use(
      cors({
        origin: this.configService.get('CLIENT_URL') || process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  configureMiddleware(): void {
    this.app.use(express.json());
    this.useCors();
    this.useRoutes();
    this.useExceptionFilters();
    this.useStaticImg();
    this.setupSwagger();
  }

  setupSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Gadjets Store API',
          version: '1.0.0',
        },
      },
      apis: [
        'src/users/users.controller.ts',
        'src/controllers/products.controller.ts',
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);

    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
    this.app.use('/products', this.productController.router);
    this.app.use('/shopping-cart', this.shpController.router);
    this.app.use('/favourites', this.favouriteController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  useStaticImg(): void {
    this.app.use(express.static('public'));
    this.app.use(express.static(__dirname + '/public'));
  }

  public async init(): Promise<void> {
    this.server = this.app.listen(this.port);
    this.logger.log(
      `Server started on ${this.configService.get('SERVER_HOST') || process.env.SERVER_HOST}:${this.port}`,
    );
  }
}
