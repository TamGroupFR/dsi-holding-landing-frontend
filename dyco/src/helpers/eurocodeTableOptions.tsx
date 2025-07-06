import React from 'react';
import { BLOCKS, Node } from '@contentful/rich-text-types';

export const eurocodeTableOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-14 mb-4">{children}</p>;
    },
    [BLOCKS.TABLE]: (node: Node, children: React.ReactNode) => {
      return (
        <div className="overflow-auto mb-8 lg:mb-12">
          <table className="table table-eurocode">{children}</table>
        </div>
      );
    },
    [BLOCKS.TABLE_ROW]: (node: Node, children: React.ReactNode) => {
      return (
        <tr className="even:bg-white odd:bg-light-gray text-body-14">
          {children}
        </tr>
      );
    },
    [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: React.ReactNode) => {
      return (
        <th className="bg-dark-navy text-white p-3.5 text-body-14 font-normal header-cell max-w-min text-wrap">
          {children}
        </th>
      );
    },
    [BLOCKS.TABLE_CELL]: (node: Node, children: React.ReactNode) => {
      return (
        <th className="px-3.5 py-2.5 text-body-14 font-normal cell max-w-min text-wrap">
          {children}
        </th>
      );
    },
  },
};
