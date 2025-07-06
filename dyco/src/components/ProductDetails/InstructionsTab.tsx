import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';
import { InstructionsProps } from '../../interfaces/products.interface';
import { richTextOptions } from '../../helpers/richTextOptions';

const InstructionsTab = ({
  instructions
}: {
  instructions: InstructionsProps;
}) => {
  return (
    <>
      {instructions?.mainDescription && (
        <section className="lg:px-0 lg:container mb-6">
          {renderRichText(instructions.mainDescription, richTextOptions)}
        </section>
      )}
      {instructions.steps?.length && (
        <section
          className="lg:px-0 lg:container mb-6"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {instructions.steps.map((step) => (
              <div className="p-3 border-light-gray border rounded">
                <h3 className="text-body-18 font-bold border-b-2 border-light-gray mb-4">
                  {step.name}
                </h3>
                <p className="whitespace-pre-wrap mb-4">
                  {step.description?.description}
                </p>
                {step.image && (
                  <div className="w-full flex justify-center">
                    <GatsbyImage
                      image={step.image.gatsbyImageData}
                      alt={step.image.title}
                      class="w-full"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default InstructionsTab;
