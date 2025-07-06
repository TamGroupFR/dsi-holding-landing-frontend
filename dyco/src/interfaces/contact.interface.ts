import { LayoutProps } from './layout.interface';
import { RegionsProps } from './regions.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface ContactProps {
  nodes: {
    phone: string;
    title: string;
    subtitle: string;
    slug: string;
    email: string;
    description: string;
    seo?: Seo;
    nip: string;
    regon: string;
    krs: string;
    seedCapital: string;
  }[];
}

export interface ContactDataProps extends LayoutProps {
  contact: ContactProps;
  regions: RegionsProps;
  homepage: GlobalSeoData;
}
