import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { IShoppingCartService } from '../interfaces/shoppingCart.interface';
import { TYPES } from '../types/types';
import { ShoppingCartsModel } from '../models/shoppingCarts.model';
import { CartItemModel } from '../models/cartItem.model';

@injectable()
export class ShoppingCartController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.ShoppingCartService)
    private shoppingCartService: IShoppingCartService,
  ) {}

  async addToCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.jwt.id;
      const { productId, quantity } = req.body;
      await this.shoppingCartService.addToCart(userId, productId, quantity);
      res.status(200).send({ message: 'Product added to cart successfully.' });
    } catch (error) {
      this.loggerService.error('Error adding to cart:', error);
      next(error);
    }
  }

  async getCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.jwt.id;
      const cart = await this.shoppingCartService.getCart(userId);
      res.status(200).send(cart);
    } catch (error) {
      this.loggerService.error('Error getting cart:', error);
      next(error);
    }
  }

  async removeFromCart(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const userId = res.locals.jwt.id;
      const { productId } = req.body;
      const shoppingCart = await ShoppingCartsModel.findOne({
        where: { userId },
      });

      if (!shoppingCart) {
        res.status(404).send({ message: 'Shopping cart not found.' });
      }

      const cartItem = await CartItemModel.findOne({
        where: {
          shopping_cart_id: shoppingCart?.id,
          product_id: productId,
        },
      });

      if (!cartItem) {
        res.status(404).send({ message: 'Product not found in cart.' });
      }

      await cartItem?.destroy();
      res
        .status(200)
        .send({ message: 'Product removed from cart successfully.' });
    } catch (error) {
      this.loggerService.error('Error removing from cart:', error);
      next(error);
    }
  }
}
