import { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text';

export interface Image {
  url: string;
  title: string;
}

export type RichText = RenderRichTextData<ContentfulRichTextGatsbyReference>;
