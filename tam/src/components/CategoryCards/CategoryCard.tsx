import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import categoryImage from '../../assets/img/all-products-category.png';
import { ImageProps } from '../../interfaces/products.interface';

interface CategoryCardprops {
  name: string;
  slug: string;
  image?: ImageProps;
}

const CategoryCard = ({ name, slug, image }: CategoryCardprops) => (
  <Link to={slug} key={name} className="max-w-[292px] flex flex-col">
    {image ? (
      <GatsbyImage
        objectFit="contain"
        objectPosition="50% 50%"
        image={image.gatsbyImageData}
        alt={name}
        className="h-[200px] object-contain"
      />
    ) : (
      <img src={categoryImage} alt={name} className="h-[200px] object-contain" />
    )}
    <h4 className="text-subtitle-16 lg:text-subtitle-18  p-4 lg:px-0 font-bold">{name}</h4>
  </Link>
);

export default CategoryCard;
