import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { CategoriesProps } from './category.interface';
import { DownloadProps } from './download.interface';
import { LayoutProps } from './layout.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface LinkProps {
  name: string;
  slug?: string;
  url: string;
}

export interface ButtonIconProps {
  name: string;
  icon: string;
}

export interface ImageProps {
  gatsbyImageData: IGatsbyImageData;
  title: string;
}

export interface SubcategoryProps {
  name: string;
  slug: string;
  category: LinkProps[];
}

export interface SpecificationProps {
  accessories?: {
    title: string;
    photos: ImageProps[];
  }[];
  mainDescription?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  photos?: ImageProps[];
  description?: {
    title?: string;
    description?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    photos?: ImageProps[];
    descriptionSecondary?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  }[];
  mainGallery?: ImageProps[];
  similarProducts?: similarProductsProps[];
}

export interface InstructionsProps {
  mainDescription?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  steps?: StepsProps[];
}

export interface StepsProps {
  name?: string;
  description?: {
    description?: string;
  };
  image?: ImageProps;
}

export interface ProductProps {
  slug: string;
  name: string;
  subcategory: SubcategoryProps;
  gallery: {
    images: ImageProps[];
  };
  specification: SpecificationProps;
  instructions: InstructionsProps;
  downloads?: DownloadProps[];
}

export interface ProductRenderProps {
  name: string;
  labelRender?: string;
  slug: string;
  subcategory: {
    slug: string;
    category: {
      slug: string;
    }[]
  }
}

export interface similarProductsProps {
  name: string;
  slug: string;
  gallery: {
    images: ImageProps[];
  };
  specification: {
    mainGallery: ImageProps[];
  };
  subcategory: SubcategoryProps;
}

export interface ProductPageProps {
  productTabs: { name: string }[];
  slug: string;
  title: string;
  url: string;
  similarProductsTitle: string;
  buttonDownload: string;
  buttonDownloads: string;
  buttonBackToTop: string;
  selectRange: string;
  buttonShowAll: string;
  buttonBack: string;
  productsIndex: {
    name: string;
    url: string;
  };
  renderImage: ImageProps;
  productsRender: ProductRenderProps[];
  seo?: Seo;
}

export interface AllProductsPageProps extends LayoutProps {
  categories: { nodes: CategoriesProps[] };
  products: { nodes: ProductProps[] };
  productPage: { nodes: ProductPageProps[] };
  homepage: GlobalSeoData;
}
