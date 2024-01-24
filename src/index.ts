import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/logger.interface';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './services/logger.service';
import { UserController } from './controllers/users.controller';
import { TYPES } from './types/types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ProductController } from './controllers/products.controller';
import { PhoneController } from './controllers/phones.controller';
import { SequelizeService } from './services/sequelize.service';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<ProductController>(TYPES.ProductController).to(ProductController);
  bind<PhoneController>(TYPES.PhoneController).to(PhoneController);
  bind<SequelizeService>(TYPES.SequelizeService).to(SequelizeService);
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
