import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { ContactProps } from './contact.interface';
import { EurocodeProps } from './eurocode.interface';
import { LayoutProps } from './layout.interface';
import { ImageProps } from './products.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface HistorySectionProps {
  title: string;
  description: { description: string };
}

export interface CertificatesItemProps {
  type?: string;
  symbol: ImageProps;
  product?: {
    name: string;
    slug: string;
    subcategory: {
      slug: string;
      category: {
        slug: string;
      }[];
    };
  };
  name: string;
  file?: {
    url: string;
    title: string;
  };
}

export interface CertificatesProps {
  approvalItems: {
    image: ImageProps;
    description: { childMarkdownRemark: { html: string } };
  }[];
  approvalTitle: string;
  productionTitle?: string;
  productionItems?: {
    description: {
      childMarkdownRemark: { html: string };
    };
    title: string;
  }[];
  certificatesTitle?: string;
  certificateColumnsTitle?: string[];
  certificatesItems?: CertificatesItemProps[];
  productsLink?: string;
}

export interface ManageCookiesProps {
  title: string;
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  allowOptionTitle: string;
  allowOptionDescription: string;
  blockOptionTitle: string;
  blockOptionDescription: string;
  saveButtonLabel: string;
  seo?: Seo;
}

export type CookieSelection = 'allow' | 'block';

export interface ManageCookiesDataProps extends LayoutProps {
  manageCookies: ManageCookiesProps;
  productPage: { nodes: { slug: string; title: string }[] };
  contact: ContactProps;
  homepage: GlobalSeoData;
}
