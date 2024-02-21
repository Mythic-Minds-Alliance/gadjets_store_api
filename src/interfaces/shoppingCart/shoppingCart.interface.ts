import { ShoppingCartsModel } from '../../models/shoppingCart/shoppingCarts.model';

export interface IShoppingCartService {
  createCart(userId: number, total: number): Promise<ShoppingCartsModel>;
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
  deleteCartItem(cartItemId: number): Promise<void>;
  removeAllCarts(userId: number): Promise<void>;
}
