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

export interface CompanyProps extends EurocodeProps, CertificatesProps {
  title: string;
  banner: {
    url: string;
  };
  historyTitle: string;
  historySection: HistorySectionProps[];
  aboutTitle: string;
  aboutDescription: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  aboutDescriptionSecondary: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  images: ImageProps[];
  visionSections: {
    title: string;
    subtitle: string;
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  }[];
  seo?: Seo;
}

export interface CompanyDataProps extends LayoutProps {
  company: CompanyProps;
  productPage: { nodes: { slug: string; title: string }[] };
  contact: ContactProps;
  homepage: GlobalSeoData;
}
