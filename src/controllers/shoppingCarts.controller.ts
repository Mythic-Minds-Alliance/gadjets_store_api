import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { IShoppingCartService } from '../interfaces/shoppingCart.interface';
import { TYPES } from '../types/types';
import jwt from 'jsonwebtoken';
import { IConfigService } from '../interfaces/config.service.interface';
import { IShoppingCartController } from '../interfaces/shoppingCart.controller.interface';
import { BaseController } from './base.controller';

@injectable()
export class ShoppingCartController
  extends BaseController
  implements IShoppingCartController
{
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ShoppingCartService)
    private shoppingCartService: IShoppingCartService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/createCart',
        method: 'post',
        func: this.createCart,
      },
      {
        path: '/addToCart',
        method: 'post',
        func: this.addToCart,
      },
      {
        path: '/getCart',
        method: 'get',
        func: this.getCart,
      },
      {
        path: '/removeFromCart',
        method: 'delete',
        func: this.removeFromCart,
      },
    ]);
  }

  async createCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);
      console.log(userId);

      const shoppingCart = await this.shoppingCartService.createCart(userId);

      res.status(201).json(shoppingCart);
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    await Promise.all(
      [
        body(
          'productId',
          'Product ID is required and must be a number',
        ).isNumeric(),
        body(
          'quantity',
          'Quantity is required and must be a number',
        ).isNumeric(),
        body('color', 'Color is required and must be a string').isString(),
        body(
          'capacity',
          'Capacity is required and must be a string',
        ).isString(),
      ].map((validation) => validation.run(req)),
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId: number = this.getUserIdFromToken(req);
      console.log(userId);
      const { productId, quantity, color, capacity } = req.body;

      await this.shoppingCartService.addToCart(
        userId,
        productId,
        quantity,
        color,
        capacity,
      );

      res.status(204).send();
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);
      const { productId, color, capacity } = req.body;

      await this.shoppingCartService.removeFromCart(
        userId,
        productId,
        color,
        capacity,
      );

      res.status(204).send();
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId: number = this.getUserIdFromToken(req);

      const shoppingCart = await this.shoppingCartService.getCart(userId);

      if (!shoppingCart) {
        res.status(404).json({ error: 'Shopping cart not found' });
        return;
      }

      res.status(200).json(shoppingCart);
    } catch (error) {
      this.loggerService.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  private getUserIdFromToken(req: Request): number {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Authorization token not provided');
    }

    const decodedToken: any = jwt.verify(
      token,
      this.configService.get('SECRET') || process.env.SECRET || '',
    );

    console.log(decodedToken);

    return decodedToken.id;
  }
}
