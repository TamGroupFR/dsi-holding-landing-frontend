import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { LayoutProps } from './layout.interface';
import { ImageProps } from './products.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface ProjectPageProps {
  title: string;
  slug: string;
  projects: ProjectProps[];
  seo?: Seo;
}

export interface ProjectProps {
  title: string;
  slug: string;
  localization?: string;
  images?: ImageProps[];
  desc?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  mainTitle?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  seo?: Seo;
}

export interface ProjectsPageProps extends LayoutProps {
  projectPage: { nodes: ProjectPageProps[] };
  homepage: GlobalSeoData;
}

export interface SingleProjectPageProps extends LayoutProps {
  project: { nodes: ProjectProps[] };
  homepage: GlobalSeoData;
}
