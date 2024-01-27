export interface ProductResult {
  id: number;
  name: string;
  capacity: string;
  color: string;
  colorsAvailable: string[];
  price: number;
  priceDiscount: number;
  brand: string;
  categoryId: number;
  description: string;
  resolution: string;
  screen: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  year: number;
  cells: string[] | null;
  images: string[] | null;
  capacitiesAvailable: string[];
}
