import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { CategoriesProps } from '../../interfaces/category.interface';
import imageCategory from '../../assets/img/all-products-category.png';

interface AllProductsProps {
  categories: CategoriesProps[];
  button: string;
  mainLink: string;
}

const AllProducts = ({ categories, button, mainLink }: AllProductsProps) => {
  return (
    <div className="flex flex-col w-full max-w-[604px] lg:max-w-[926px]">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-y-14 mx-auto md:mx-0">
        {categories.map(({ name, slug, subcategories, image }) => (
          <div key={name} className="flex flex-col h-full justify-between max-w-[292px]">
            <div>
              {image ? (
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={name}
                  objectFit="contain"
                  objectPosition="50% 50%"
                  className="max-h-[200px] object-contain"
                />
              ) : (
                <img src={imageCategory} alt={name} className="max-h-[200px] object-contain" />
              )}
              <div className="flex justify-between flex-col">
                <h4 className="text-subtitle-16 lg:text-subtitle-18 font-bold py-3.5 lg:py-4 px-4 lg:px-2">{name}</h4>
                {subcategories.map(({ name: subcategoryName, slug: subcategorySlug }) => (
                  <div className="border-t py-2.5 lg:py-4" key={subcategoryName}>
                    <Link
                      to={`/${mainLink}/${slug}/${subcategorySlug}`}
                      className="text-subtitle-14 lg:text-subtitle-16 px-4 lg:px-2 block"
                    >
                      {subcategoryName}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to={slug}
              className="text-blue-500 border border-blue-500 text-sm py-3 px-4 font-bold rounded mt-4 lg:mt-6 text-center"
            >
              {button}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
