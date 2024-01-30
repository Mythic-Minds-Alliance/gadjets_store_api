import { ShoppingCartsModel } from '../models/shoppingCarts.model';

export interface IShoppingCartService {
  createCart(userId: number): Promise<ShoppingCartsModel>;
  addToCart(
    userId: number,
    productId: number,
    quantity: number,
    color: string,
    capacity: string,
  ): Promise<void>;
  getCart(userId: number): Promise<ShoppingCartsModel | null>;
  removeFromCart(
    userId: number,
    productId: number,
    color: string,
    capacity: string,
  ): Promise<void>;
}
