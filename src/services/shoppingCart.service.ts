import { injectable, inject } from 'inversify';
import { ILogger } from '../interfaces/logger.interface';
import { ShoppingCartsModel } from '../models/shoppingCarts.model';
import { ProductModel } from '../models/product.model';
import { CartItemModel } from '../models/cartItem.model';
import { TYPES } from '../types/types';
import { IShoppingCartService } from '../interfaces/shoppingCart.interface';
import { NextFunction } from 'express';
import { SequelizeService } from './sequelize.service';
import { Filter } from '../types/filter.type';
import { ProductResult } from '../interfaces/productResult.interface';

@injectable()
export class ShoppingCartService implements IShoppingCartService {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.SequelizeService) private sequelizeService: SequelizeService,
  ) {}

  async createCart(userId: number, total: number): Promise<ShoppingCartsModel> {
    const existingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (existingCart) {
      return existingCart;
    }

    this.loggerService.log(userId);

    const newCart = await ShoppingCartsModel.create({
      userId,
      total: 0,
    });

    return newCart;
  }

  async getUniqueProduct(filter: Filter): Promise<ProductResult> {
    try {
      const product = await this.sequelizeService.getProductsByProps(
        filter,
        1,
        0,
      );

      if (!product || product.length === 0) {
        throw new Error('No product found with the given parameters.');
      }

      return product[0];
    } catch (err) {
      throw new Error('Product was not found!');
    }
  }

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
    color: string,
    capacity: string,
  ): Promise<void> {
    let shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
    });

    if (!shoppingCart) {
      shoppingCart = await ShoppingCartsModel.create({ userId, total: 0 });
    }

    const filter: Filter = {
      productId: productId,
      color: color,
      capacity: capacity,
    };

    try {
      const product = await this.getUniqueProduct(filter);

      if (!product) {
        throw new Error('Product not found.');
      }

      console.log('Product found:', product);

      const [cartItem, created] = await CartItemModel.findOrCreate({
        where: {
          shopping_cart_id: shoppingCart?.id,
          product_id: product.id,
          productName: product.name,
          price: product.price,
          color: color,
          capacity: capacity,
          image: product.images?.[0],
        },
        defaults: {
          quantity,
        },
      });

      if (!created) {
        await cartItem.update({ quantity: cartItem.quantity + quantity });
      }

      await shoppingCart?.update({
        total: shoppingCart!.total + Number(product.price),
      });

      console.log('CartItem created:', cartItem);
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }

  async removeFromCart(
    userId: number,
    productId: number,
    color: string,
    capacity: string,
  ): Promise<void> {
    try {
      const shoppingCart = await ShoppingCartsModel.findOne({
        where: { userId },
      });

      if (!shoppingCart) {
        throw new Error('Shopping cart not found.');
      }

      const filter: Filter = {
        productId: productId,
        color: color,
        capacity: capacity,
      };

      const product = await this.getUniqueProduct(filter);

      if (!product) {
        throw new Error('Product not found.');
      }

      const cartItem = await CartItemModel.findOne({
        where: {
          shopping_cart_id: shoppingCart.id,
          product_id: product.id,
          color: color,
          capacity: capacity,
        },
      });

      if (!cartItem) {
        throw new Error('Product not found in cart.');
      }

      cartItem.quantity -= 1;

      if (cartItem.quantity === 0) {
        await cartItem.destroy();
      } else {
        await cartItem.save();
      }

      if (shoppingCart.total - product.price >= 0) {
        shoppingCart.total -= product.price;
        await shoppingCart.save();
      }
    } catch (error) {
      console.error('Error in removeFromCart:', error);
      throw error;
    }
  }

  async getCart(userId: number): Promise<ShoppingCartsModel | null> {
    const shoppingCart = await ShoppingCartsModel.findOne({
      where: { userId },
      include: [
        {
          model: CartItemModel,
        },
      ],
    });

    return shoppingCart || null;
  }

  async deleteCartItem(cartItemId: number): Promise<void> {
    const cartItem = await CartItemModel.findByPk(cartItemId);

    if (!cartItem) {
      throw new Error('Product not found in cart.');
    }

    const filter: Filter = {
      productId: cartItem.product_id,
      color: cartItem.color,
      capacity: cartItem.capacity,
    };
    const product = await this.getUniqueProduct(filter);
    const totalCost = product.price * cartItem.quantity;

    const shoppingCart = await ShoppingCartsModel.findByPk(
      cartItem.shopping_cart_id,
    );

    shoppingCart!.total -= totalCost;

    await shoppingCart?.save();

    await cartItem.destroy();
  }
}
