import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { EurocodeDataProps } from '../../../interfaces/eurocode.interface';
import { eurocodeTableOptions } from '../../../helpers/eurocodeTableOptions';

const EuroCodeContact = ({ contactArea }: Pick<EurocodeDataProps, 'contactArea'>) => {
  return (
    <>
      <h2 className="text-subtitle-18 font-bold text-black uppercase mb-8">
        {contactArea.title}
      </h2>
      <div
        className="text-body-14 text-black mb-8 html-link"
        dangerouslySetInnerHTML={{
          __html: contactArea.description.childMarkdownRemark.html,
        }}
      />
      <div className="flex flex-col w-full mb-12">
        {contactArea.types.map(({ title: name, description }) => (
          <div
            key={name}
            className="flex flex-col md:flex-row text-body-14 w-full mb-3"
          >
            <p className="uppercase font-bold w-full md:w-1/4 md:max-w-[160px] mb-2 md:mb-0 md:text-right">
              {name}
            </p>
            <div
              className="font-medium w-full md:w-3/4 md:ml-4 html-link"
              dangerouslySetInnerHTML={{
                __html: description.childMarkdownRemark.html,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 mb-12">
        <div className="flex flex-col w-full lg:w-1/2">
          <div className="w-full mb-4 md:px-4">
            <GatsbyImage
              image={contactArea.image.gatsbyImageData}
              alt={contactArea.title}
            />
          </div>
          {contactArea.imageDescription && (
            <div className="w-full">
              {renderRichText(contactArea.imageDescription, eurocodeTableOptions)}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full lg:w-1/2">
          {contactArea.table && (
            <div className="w-full">
              {renderRichText(contactArea.table, eurocodeTableOptions)}
            </div>
          )}
          {contactArea.tableDescription && (
            <div className="w-full">
              {renderRichText(contactArea.tableDescription, eurocodeTableOptions)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EuroCodeContact;
