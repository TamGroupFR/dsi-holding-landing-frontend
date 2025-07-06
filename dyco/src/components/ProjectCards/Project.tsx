import React from 'react';
import { Link } from 'gatsby';
import {
  BLOCKS,
  Node,
  MARKS,
} from '@contentful/rich-text-types';
import {
  renderRichText,
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { richTextOptions } from '../../helpers/richTextOptions';

const projectRichTextOptions = {
  ...richTextOptions,
  renderMark: {
    [MARKS.BOLD]: (children: React.ReactNode) => {
      return <b className="text-body-16 mb-1">{children}</b>;
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-16 mb-1">{children}</p>;
    },
  },
};

interface ProjectProps {
  link: string;
  title: string;
  mainTitle?: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  image?: IGatsbyImageData;
}

const Project = ({
  link,
  title,
  mainTitle,
  image,
}: ProjectProps) => {
  return (
    <Link to={link} className="flex flex-col group">
      <div className="p-2 h-[150px] lg:h-[260px] border-t border-r border-l border-color-100 rounded-t">
        {image && (
          <GatsbyImage
            image={image}
            alt={title}
            className="w-full object-contain  h-full"
            objectFit="contain"
            objectPosition="50% 50%"
          />
        )}
      </div>
      <div
        className="min-h-[75px] p-2 lg:px-4 bg-dark-navy text-white border-b border-r border-l border-dark-navy rounded-b group-hover:bg-primary group-hover:border-primary"
      >
        { mainTitle ? (
          <span>
            {renderRichText(mainTitle, projectRichTextOptions)}
          </span>
        ) : (
          <span>{title}</span>
        )}
      </div>
    </Link>
  );
};

export default Project;
