import { ProductModel } from './products/product.model';

import { UserModel, UsersRolesModel } from './users/users.roles.model';
import { RoleModel } from './users/user.model';
import { CategoryModel } from './productDetails/category.model';
import { ColorModel } from './productDetails/colors.model';
import { ImageModel } from './productDetails/image.model';
import { CapacityModel } from './productDetails/capacity.model';
import { CellModel } from './productDetails/cell.model';
import { ProductsCells } from './products/products_cells.model';
import { ShoppingCartsModel } from './shoppingCart/shoppingCarts.model';
import { CartItemModel } from './shoppingCart/cartItem.model';
import { FavouriteModel } from './favourites/favourites.model';
import { OrderModel } from './orders/orders.model';
import { OrderItemsModel } from './orders/orderItems.model';

export const models = [
  RoleModel,
  UserModel,
  UsersRolesModel,
  CategoryModel,
  ProductModel,
  ColorModel,
  ImageModel,
  CapacityModel,
  CellModel,
  ProductsCells,
  ShoppingCartsModel,
  CartItemModel,
  FavouriteModel,
  OrderModel,
  OrderItemsModel,
];

module.exports = models;

export { UsersRolesModel, RoleModel };
