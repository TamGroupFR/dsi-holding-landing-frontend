import { CategoriesProps } from './category.interface';
import { DownloadProps } from './download.interface';
import { FooterProps } from './footer.interfaces';
import { NavigationProps } from './navigation.interface';
import { BannerProps, ImageProps, ProductProps, ProductsPageProps } from './products.interface';

export enum SearchVariant {
  category = 'category',
  product = 'product',
  catalog = 'catalog',
}

export interface SearchPageProps {
  title: string;
  slug: string;
  sortResults: string;
  searchResults: string;
  resultsFound: string;
  products: string;
  downloads: string;
  banner: BannerProps;
  icon: ImageProps;
  download: {
    name: string;
  };
  filter: string[];
  categories: string;
  buttonViewMore: {
    name: string;
  };
}

export interface DataSearchProps {
  navigation: NavigationProps;
  footer: FooterProps;
  searchPage: SearchPageProps;
  productsPage: ProductsPageProps;
  products: {
    nodes: ProductProps[];
  };
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
}
