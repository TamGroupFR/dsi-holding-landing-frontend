import React from 'react';
import { BLOCKS, Node } from '@contentful/rich-text-types';

export const options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => {
      return <h2 className="text-subtitle-18 md:text-header-27 mb-2 font-bold">{children}</h2>;
    },
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-subtitle-16 mb-6 md:mb-5 lg:mb-8">{children}</p>;
    },
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
        <th className="bg-dark-navy text-white p-3.5 text-subtitle-16 font-normal max-w-[170px] header-cell">
          {children}
        </th>
      );
    },
    [BLOCKS.TABLE_CELL]: (node: Node, children: React.ReactNode) => {
      return <th className="px-3.5 py-2.5 text-subtitle-16 font-normal max-w-[170px] cell">{children}</th>;
    },
  },
};
