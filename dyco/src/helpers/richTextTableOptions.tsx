import React from 'react';
import { BLOCKS, Node } from '@contentful/rich-text-types';

export const richTextTableOptions = {
  renderNode: {
    [BLOCKS.TABLE]: (node: Node, children: React.ReactNode) => {
      return (
        <div className="overflow-auto mb-8 lg:mb-12">
          <table className="table">{children}</table>
        </div>
      );
    },
    [BLOCKS.TABLE_ROW]: (node: Node, children: React.ReactNode) => {
      return <tr className="even:bg-white odd:bg-light-gray text-subtitle-16">{children}</tr>;
    },
    [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: React.ReactNode) => {
      return (
        <th className="bg-dark-navy text-white p-3.5 text-subtitle-14 font-normal header-cell max-w-min text-wrap">
          {children}
        </th>
      );
    },
    [BLOCKS.TABLE_CELL]: (node: Node, children: React.ReactNode) => {
      return <th className="px-3.5 py-2.5 text-subtitle-14 font-normal cell max-w-min text-wrap">{children}</th>;
    },
  },
};
