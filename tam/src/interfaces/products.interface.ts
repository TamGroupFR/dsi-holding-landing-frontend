import { IGatsbyImageData } from 'gatsby-plugin-image';
import { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text';
import { CategoriesProps } from './category.interface';
import { DownloadProps } from './download.interface';
import { FooterProps } from './footer.interfaces';
import { NavigationProps } from './navigation.interface';

export interface LinkProps {
  name: string;
  slug?: string;
  url: string;
}

export interface ButtonIconProps {
  name: string;
  icon: { gatsbyImageData: IGatsbyImageData };
}

export interface SubcategoryProps {
  name: string;
  slug: string;
  downloads: DownloadProps[];
  image: ImageProps;
  category: LinkProps[];
}

export interface ImageProps {
  gatsbyImageData: IGatsbyImageData;
  title: string;
}
export interface ProductProps {
  slug: string;
  name: string;
  subcategory: SubcategoryProps;
  downloads: DownloadProps[];
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  gallery: {
    images: ImageProps[];
  };
  quickFds: string;
  video: {
    name: string;
    slug: string;
    link: string;
  };
  relatedProducts: ProductProps[];
  relatedSubcategory: SubcategoryProps[];
}

export interface BannerProps {
  url: string;
  title: string;
}

export interface ProductsPageProps {
  title: string;
  slug: string;
  url: string;
  buttonVideo: ButtonIconProps;
  buttonFds: ButtonIconProps;
  buttonDownload: ButtonIconProps;
  buttonDownloads: ButtonIconProps;
  selectRange: string;
  buttonShowAll: LinkProps;
  buttonShowMore: LinkProps;
  subtitles: string;
  banner: BannerProps;
  buttonSubcategories: {
    name: string;
  };
  buttonBackToTop: {
    name: string;
  };
  buttonBack: ButtonIconProps;
  productsIndex: LinkProps;
  homeLink: {
    name: string;
  };
  icon: ImageProps;
}

export interface DataProductsProps {
  navigation: NavigationProps;
  footer: FooterProps;
  productsPage: ProductsPageProps;
  products: {
    nodes: ProductProps[];
  };
  product: ProductProps;
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
}
