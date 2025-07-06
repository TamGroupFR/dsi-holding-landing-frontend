import { ContactProps } from './contact.interface';
import { LayoutProps } from './layout.interface';
import { ImageProps, ProductRenderProps } from './products.interface';
import { RegionsProps } from './regions.interface';
import { Seo } from './seo.interface';

interface HomepageDataProps {
  nodes: {
    heroBanner: {
      title: string;
      description: {
        description: string;
      };
      video: {
        url: string;
      };
      button: {
        name: string;
        url: string;
      };
    };
    seo: Seo,
    aboutSection: {
      description: {
        childMarkdownRemark: { html: string };
      };
      button: {
        url: string;
        name: string;
      };
      buttonFind: {
        name: string;
        url: string;
      };
      aboutItems: {
        title: string;
        description: {
          description: string;
          childMarkdownRemark: { html: string };
        };
      }[];
    };
    increaseSection: {
      title: string;
      description: {
        childMarkdownRemark: { html: string };
      };
    };
    structureSection: {
      title: string;
      description: {
        description: string;
        childMarkdownRemark: { html: string };
      };
      button: {
        url: string;
        name: string;
      };
    };
    uniqueSection: {
      title: string;
      uniqueItems: {
        title: string;
        description: {
          childMarkdownRemark: { html: string };
        };
      }[];
    };
    everywhereSection: {
      title: string;
      description: {
        childMarkdownRemark: { html: string };
      };
      images: ImageProps[];
    };
  }[];
}

export interface productPageProps {
  slug: string;
  renderImage: ImageProps;
  productsRender: ProductRenderProps[];
}

export interface HomepageProps extends LayoutProps {
  contact: ContactProps;
  regions: RegionsProps;
  homepage: HomepageDataProps;
  productPage: { nodes: productPageProps[] };
}
