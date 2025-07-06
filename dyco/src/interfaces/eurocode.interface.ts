import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

interface ProfilesOptionsProps {
  title: string;
  image: { gatsbyImageData: IGatsbyImageData };
  products: {
    slug: string;
    name: string;
    subcategory: {
      slug: string;
      category: {
        slug: string;
      }[];
    };
  }[];
}

export interface EurocodeProps {
  eurocodeTitle: string;
  contactArea: {
    title: string;
    description: { childMarkdownRemark: { html: string } };
    types: {
      title: string;
      description: { childMarkdownRemark: { html: string } };
    }[];
    image: { gatsbyImageData: IGatsbyImageData };
    imageDescription: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    table: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    tableDescription: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  };
  capacity: {
    title: string;
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  };
  calculation: {
    title: string;
    description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
    image: { gatsbyImageData: IGatsbyImageData };
    imageDescription: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  };
  profiles: {
    title: string;
    description: { childMarkdownRemark: { html: string } };
    channels: ProfilesOptionsProps;
    joints: ProfilesOptionsProps;
  };
}

export interface EurocodeDataProps extends EurocodeProps {
  productsLink: string;
}
