import {Request, Response} from 'express';
import {getProductsOnPage} from '../data/products';
import {Product} from '../types/product';

export function getProducts(req: Request, res: Response) {
  const pageNumber: number = parseInt(req.query.page as string) || 1;
  const pageSize: number = parseInt(req.query.size as string) || 10;

  const productsOnPage: Product[] = getProductsOnPage(pageNumber, pageSize);
  res.send(productsOnPage);
}
