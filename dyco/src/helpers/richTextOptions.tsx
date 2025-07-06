import React from 'react';
import {
  BLOCKS,
  INLINES,
  Node,
  MARKS,
} from '@contentful/rich-text-types';
import { richTextTableOptions } from './richTextTableOptions';

export const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (children: React.ReactNode) => {
      return <b className="text-body-16 mt-1 mb-2">{children}</b>;
    },
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-16 mt-1 mb-2">{children}</p>;
    },
    [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => {
      return (
        <h2 className="mt-12 mb-7 text-title-5 md:text-title-4 lg:text-title-3">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => {
      return <h3 className="mt-10 mb-5 text-title-5">{children}</h3>;
    },
    [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => {
      return <ul className="list-disc pl-4 mb-4">{children}</ul>;
    },
    [BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => {
      return <ol className="list-decimal pl-4 mb-4">{children}</ol>;
    },
    [BLOCKS.LIST_ITEM]: (node: Node, children: React.ReactNode) => {
      return <li>{children}</li>;
    },
    [INLINES.HYPERLINK]: (
      { data }: { data: any },
      children: React.ReactNode,
    ) => {
      const { uri } = data || {};
      return (
        <a className="hover:underline" href={uri}>
          {children}
        </a>
      );
    },
    ...richTextTableOptions.renderNode,
  },
};
