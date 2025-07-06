import { ImageProps } from './products.interface';

export interface SubcategoryProps {
  name: string;
  slug: string;
  image?: ImageProps;
}

export interface CategoriesProps {
  name: string;
  slug: string;
  sortOrder?: number;
  subcategories: SubcategoryProps[];
}
