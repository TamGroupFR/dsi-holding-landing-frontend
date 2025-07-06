import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';

import { EurocodeDataProps } from '../../../interfaces/eurocode.interface';

const EuroCodeProfiles = ({ profiles, productsLink }: Pick<EurocodeDataProps, 'profiles' | 'productsLink'>) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 mb-12">
      <div className="flex flex-col w-full">
        <h2 className="text-subtitle-18 font-bold text-black uppercase mb-8">
          {profiles.title}
        </h2>
        <div
          className="text-body-14 text-black mb-8 html-link"
          dangerouslySetInnerHTML={{
            __html: profiles.description.childMarkdownRemark.html,
          }}
        />
        <div className="flex flex-col md:flex-row gap-x-4">
          <div className="flex flex-col w-full md:w-1/2">
            <div className="w-full mb-4 md:px-4">
              <GatsbyImage
                image={profiles.joints.image.gatsbyImageData}
                alt={profiles.joints.title}
              />
            </div>
            <h3 className="text-subtitle-18 font-bold text-black uppercase mb-6 md:text-center">
              {profiles.joints.title}
            </h3>
            <div className="overflow-auto">
              <div className="flex flex-col md:max-w-[360px] mb-6 lg:mx-auto">
                <div className="bg-dark-navy text-white p-3.5 text-body-14 w-full ">
                  <p className="text-center">{profiles.joints.title}</p>
                </div>
                <div className="grid grid-rows-1 grid-cols-1">
                  {profiles.joints.products.map(
                    ({ name, slug, subcategory }) => (
                      <div
                        key={slug}
                        className="flex justify-center p-3.5 even:bg-light-gray"
                      >
                        <Link
                          to={`/${productsLink}/${subcategory.category[0].slug}/${subcategory.slug}/${slug}`}
                          className="text-body-12 font-semibold"
                        >
                          {name}
                        </Link>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <div className="w-full mb-4 md:px-4">
              <GatsbyImage
                image={profiles.channels.image.gatsbyImageData}
                alt={profiles.channels.title}
              />
            </div>
            <h3 className="text-subtitle-18 font-bold text-black uppercase mb-6 md:text-center">
              {profiles.channels.title}
            </h3>
            <div className="overflow-auto">
              <div className="flex flex-col md:max-w-[360px] w-full mb-6 lg:mx-auto">
                <div className="bg-dark-navy text-white p-3.5 text-body-14 w-full ">
                  <p className="text-center">{profiles.channels.title}</p>
                </div>
                <div className="grid grid-rows-1 grid-cols-1">
                  {profiles.channels.products.map(
                    ({ slug, subcategory, name }) => (
                      <div
                        key={slug}
                        className="flex justify-center p-3.5 even:bg-light-gray"
                      >
                        <Link
                          to={`/${productsLink}/${subcategory.category[0].slug}/${subcategory.slug}/${slug}`}
                          className="text-body-12 font-semibold"
                        >
                          {name}
                        </Link>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EuroCodeProfiles;
