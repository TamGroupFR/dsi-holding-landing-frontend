import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';

import { EurocodeDataProps } from '../../../interfaces/eurocode.interface';
import { eurocodeTableOptions } from '../../../helpers/eurocodeTableOptions';

const EuroCodeCalculation = ({ calculation }: Pick<EurocodeDataProps, 'calculation'>) => {
  return (
    <div className="flex flex-col w-full lg:w-1/2">
      <h2 className="text-subtitle-18 font-bold text-black uppercase mb-8">
        {calculation.title}
      </h2>
      {calculation.description && (
      <div className="w-full">
        {renderRichText(calculation.description, eurocodeTableOptions)}
      </div>
      )}
      <div className="w-full mb-4 md:px-4">
        <GatsbyImage
          image={calculation.image.gatsbyImageData}
          alt={calculation.title}
        />
      </div>
      {calculation.imageDescription && (
      <div className="w-full">
        {renderRichText(calculation.imageDescription, eurocodeTableOptions)}
      </div>
      )}
    </div>
  );
};

export default EuroCodeCalculation;
