import { injectable, inject } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { ShoppingCartsModel } from '../models/shoppingCarts.model';
import { ProductModel } from '../models/product.model';
import { CartItemModel } from '../models/cartItem.model';
import { TYPES } from '../types/types';
import { IShoppingCartService } from '../interfaces/shoppingCart.interface';

@injectable()
export class ShoppingCartService implements IShoppingCartService {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {}

  async createCart(userId: number): Promise<ShoppingCartsModel> {
    const existingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (existingCart) {
      return existingCart;
    }

    const newCart = await ShoppingCartsModel.create({
      userId,
    });

    return newCart;
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<void> {
    const shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (!shoppingCart) {
      await this.createCart(userId);
    }

    const [cartItem, created] = await CartItemModel.findOrCreate({
      where: {
        shopping_cart_id: shoppingCart?.id,
        product_id: productId,
      },
      defaults: {
        quantity,
      },
    });

    if (!created) {
      await cartItem.update({ quantity });
    }
  }

  async getCart(userId: number): Promise<ShoppingCartsModel | null> {
    const shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
      include: [
        {
          model: CartItemModel,
          include: [ProductModel],
        },
      ],
    });

    return shoppingCart || null;
  }
}
