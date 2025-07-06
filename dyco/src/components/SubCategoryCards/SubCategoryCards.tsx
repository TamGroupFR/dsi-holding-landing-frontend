import React from 'react';
import { SubcategoryProps } from '../../interfaces/category.interface';
import LinkCard from '../LinkCard/LinkCard';

interface SubCategoryCardsProps {
  subCategories: SubcategoryProps[];
  url: string;
}

const SubCategoryCards = ({
  subCategories, url,
}: SubCategoryCardsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0 max-w-[926px]">
    {subCategories.map(({
      name, slug, image,
    }) => {
      return (
        <LinkCard
          key={name}
          name={name}
          link={`${url}/${slug}`}
          image={image?.gatsbyImageData}
        />
      );
    })}
  </div>
);

export default SubCategoryCards;
