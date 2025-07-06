import { DownloadProps } from './download.interface';
import { ImageProps } from './products.interface';

export interface SubcategoryProps {
  name: string;
  slug: string;
  image: ImageProps;
  downloads: DownloadProps[];
  subcategories: SubcategoryProps[];
}
export interface CategoriesProps {
  id: string;
  name: string;
  slug: string;
  sortOrder?: number;
  image: ImageProps;
  subcategories: SubcategoryProps[];
}
