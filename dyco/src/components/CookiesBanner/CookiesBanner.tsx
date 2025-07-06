import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
  renderRichText
} from 'gatsby-source-contentful/rich-text';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import React, { FC } from 'react';
import Button from '../Button/Button';

interface Props {
  description: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  buttonLabel: string;
  linkLabel: string;
  slug: string;
  onAccept?: () => void;
}

const richTextOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
      const { data: { uri } } = node;
      return (
        <a
          href={uri}
          className="underline italic hover:no-underline"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-16 mb-2">{children}</p>;
    },
  },
};

const CookiesBanner: FC<Props> = ({ description, buttonLabel, linkLabel, slug, onAccept }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-5 pb-10 px-4 md:py-8 md:px-8 lg:px-16 bg-primary text-white">
      <div>{renderRichText(description, richTextOptions)}</div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex align-center">
          <Link
            className="underline italic hover:no-underline"
            to={`/${slug}`}
          >
            {linkLabel}
          </Link>
        </div>
        <div>
          <Button kind="quaternary" onClick={onAccept}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
