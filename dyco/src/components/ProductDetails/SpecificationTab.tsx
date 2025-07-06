import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  ProductProps,
  ProductPageProps,
} from '../../interfaces/products.interface';
import { richTextOptions } from '../../helpers/richTextOptions';
import Header from '../Header/Header';
import ProductCards from '../ProductCards/ProductCards';
import SlideshowGallery from '../SlideshowGallery/SlideshowGallery';
import Downloads from '../Downloads/Downloads';

const SpecificationTab = ({
  product,
  productPage,
}: {
  product: ProductProps;
  productPage: ProductPageProps;
}) => {
  const { specification, downloads } = product;

  return (
    <>
      {specification?.mainDescription && (
        <section className="lg:px-0 lg:container mb-6">
          {renderRichText(specification.mainDescription, richTextOptions)}
        </section>
      )}
      {specification?.photos && (
        <section className="lg:px-0 lg:container mb-6">
          {specification.photos.length === 1 ? (
            <GatsbyImage
              className="block max-w-md mx-auto"
              image={specification.photos[0].gatsbyImageData}
              alt={specification.photos[0].title}
            />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              {specification.photos.map((photo) => (
                <div
                  key={photo.title}
                  className="w-full flex justify-center items-center"
                >
                  <GatsbyImage
                    image={photo.gatsbyImageData}
                    alt={photo.title}
                    class="w-full"
                    objectFit="contain"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      {specification?.accessories
        && specification.accessories.map(({ title, photos }) => {
          if (title && photos.length) {
            return (
              <section key={title} className="lg:px-0 lg:container mb-8">
                <Header title={title} icon />
                <div className="flex flex-wrap justify-center gap-8 md:justify-start">
                  {photos.map((photo) => (
                    <GatsbyImage
                      key={photo.title}
                      className="h-[140px] hx-2"
                      objectFit="contain"
                      image={photo.gatsbyImageData}
                      alt={photo.title}
                    />
                  ))}
                </div>
              </section>
            );
          }
          return null;
        })}
      {specification?.description
        && specification.description.map(
          ({
            title, description, photos, descriptionSecondary,
          }) => (
            <section key={title} className="lg:px-0 lg:container mb-6">
              {title && <Header title={title} icon />}
              {description && renderRichText(description, richTextOptions)}
              {photos && photos.length === 1 ? (
                <GatsbyImage
                  className="block mx-auto max-w-max mb-8"
                  image={photos[0].gatsbyImageData}
                  alt={photos[0].title}
                />
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {photos?.map((photo) => (
                    <div key={photo.title} className="mx-auto">
                      <GatsbyImage
                        image={photo.gatsbyImageData}
                        alt={photo.title}
                      />
                    </div>
                  ))}
                </div>
              )}
              {descriptionSecondary
                && renderRichText(descriptionSecondary, richTextOptions)}
            </section>
          ),
        )}
      {specification?.mainGallery && (
        <section className="lg:px-0 lg:container mb-6">
          <SlideshowGallery gallery={specification.mainGallery} />
        </section>
      )}
      {downloads && downloads.length > 0 && (
        <section
          className="lg:px-0 lg:container flex mt-16 w-full"
          id={productPage.buttonDownload}
        >
          <Downloads
            downloads={downloads}
            title={productPage.buttonDownloads}
            button={productPage.buttonDownload}
            fourCols
          />
        </section>
      )}
      {specification?.similarProducts && (
        <section className="lg:px-0 lg:container mt-16">
          <Header title={productPage.similarProductsTitle} icon />
          <ProductCards
            products={specification.similarProducts}
            slug={productPage.slug}
          />
        </section>
      )}
    </>
  );
};

export default SpecificationTab;
