import { FavouriteModel } from '../models/favourites.model';

export interface IFavouriteService {
  getAllFavourites(userId: number): Promise<FavouriteModel[]>;
  addToFavourites(
    userId: number,
    productId: number,
    color: string,
    capacity: string,
  ): Promise<void>;
  deleteFavourite(favId: number): Promise<void>;
}
