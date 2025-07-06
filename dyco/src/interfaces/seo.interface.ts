import { IGatsbyImageData } from 'gatsby-plugin-image';

export interface Seo {
  title: string;
  description: string;
  image: IGatsbyImageData;
}

export interface PageSeoData {
  title?: string;
  description?: string;
  image?: IGatsbyImageData;
}

export interface GlobalSeoData {
  nodes: Array<{
    seo: Seo;
  }>;
}
