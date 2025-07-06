import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { eurocodeTableOptions } from '../../../helpers/eurocodeTableOptions';
import { EurocodeDataProps } from '../../../interfaces/eurocode.interface';

const EuroCodeCapacity = ({ capacity }: Pick<EurocodeDataProps, 'capacity'>) => {
  return (
    <div className="flex flex-col w-full lg:w-1/2">
      <h2 className="text-subtitle-18 font-bold text-black uppercase mb-8">
        {capacity.title}
      </h2>
      {capacity.description && (
      <div className="w-full">
        {renderRichText(capacity.description, eurocodeTableOptions)}
      </div>
      )}
    </div>
  );
};
export default EuroCodeCapacity;
