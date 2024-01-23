import { ProductModel } from './product.model';

import { UserModel, UsersRolesModel } from './users.roles.model';
import { RoleModel } from './user.model';
import { CategoryModel } from './category.model';
import { ColorModel } from './colors.model';
import { ProductsColors } from './products_colors';
import { ImageModel } from './image.model';
import { CapacityModel } from './capacity.model';
import { ProductsCapacities } from './products_capacities.model';
import { CellModel } from './cell.model';
import { ProductsCells } from './products_cells.model';
import { ShoppingCartsModel } from './shoppingCarts.model';
import { CartItemModel } from './cartItem.model';
import { FavouriteModel } from './favourites.model';
import { OrderModel } from './orders.model';
import { OrderItemsModel } from './orderItems.model';

export const models = [
  RoleModel,
  UserModel,
  UsersRolesModel,
  CategoryModel,
  ProductModel,
  ColorModel,
  ProductsColors,
  ImageModel,
  CapacityModel,
  ProductsCapacities,
  CellModel,
  ProductsCells,
  ShoppingCartsModel,
  CartItemModel,
  FavouriteModel,
  OrderModel,
  OrderItemsModel,
];

module.exports = models;
