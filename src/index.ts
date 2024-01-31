import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/logger.interface';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './services/logger.service';
import { UserController } from './controllers/users.controller';
import { TYPES } from './types/types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ProductController } from './controllers/products.controller';
import { SequelizeService } from './services/sequelize.service';
import { IUserController } from './interfaces/users.controller.interface';
import { IProductController } from './interfaces/products.controller.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserService } from './services/user.service';
import { ISequelize } from './interfaces/sequelize.interface';
import { IConfigService } from './interfaces/config.service.interface';
import { ConfigService } from './services/config.service';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { UsersRepository } from './repository/users.repository';
import { ShoppingCartController } from './controllers/shoppingCarts.controller';
import { IShoppingCartController } from './interfaces/shoppingCart.controller.interface';
import { IShoppingCartService } from './interfaces/shoppingCart.interface';
import { ShoppingCartService } from './services/shoppingCart.service';
import { FavouritesController } from './controllers/favourite.controller';
import { IFavouritesController } from './interfaces/favourite.controller.interface';
import { IFavouriteService } from './interfaces/favoutire.service.interface';
import { FavouriteService } from './services/favourite.service';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IFavouriteService>(TYPES.FavouriteService).to(FavouriteService);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IShoppingCartService>(TYPES.ShoppingCartService).to(ShoppingCartService);
  bind<IProductController>(TYPES.ProductController).to(ProductController);
  bind<IShoppingCartController>(TYPES.ShoppingCartController).to(
    ShoppingCartController,
  );
  bind<IFavouritesController>(TYPES.FavouritesController).to(
    FavouritesController,
  );
  bind<ISequelize>(TYPES.SequelizeService)
    .to(SequelizeService)
    .inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService)
    .to(ConfigService)
    .inSingletonScope();
  bind<IUsersRepository>(TYPES.UsersRepository)
    .to(UsersRepository)
    .inSingletonScope();
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
