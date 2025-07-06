import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { ImageProps } from '../../interfaces/products.interface';

interface ProductProps {
  link: string;
  name: string;
  slug: string;
  gallery: {
    images: ImageProps[];
  };
}

const Product = ({ link, name, gallery, slug }: ProductProps) => {
  return (
    <Link to={link} key={slug} className="max-w-[292px] flex flex-col">
      <div className="p-4 h-[150px] lg:h-[310px] border-t border-r border-l border-color-100 rounded-t">
        {gallery?.images && (
          <GatsbyImage
            image={gallery?.images[0].gatsbyImageData}
            alt={name}
            className="w-full object-contain  h-full"
            objectFit="contain"
            objectPosition="50% 50%"
          />
        )}
      </div>
      <div
        className="text-subtitle-12 lg:text-subtitle-16 p-2 lg:px-4 bg-dark-navy text-white h-[52px] lg:h-[84px] 
        flex justify-center items-center border-b border-r border-l border-dark-navy rounded-b"
      >
        <span className="text-center truncate-lines-2">{name}</span>
      </div>
    </Link>
  );
};

export default Product;
