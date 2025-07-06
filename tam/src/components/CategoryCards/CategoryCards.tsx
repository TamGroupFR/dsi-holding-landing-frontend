import React from 'react';
import { CategoriesProps, SubcategoryProps } from '../../interfaces/category.interface';
import CategoryCard from './CategoryCard';

interface CategoryCardsProps {
  categories: CategoriesProps | SubcategoryProps;
}

const CategoryCards = ({ categories }: CategoryCardsProps) => (
  <div className="flex flex-col w-full max-w-[604px] lg:max-w-[926px]">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mx-auto md:mx-0 ">
      {categories.subcategories.map(({ name, slug, image }) => (
        <CategoryCard name={name} slug={slug} image={image} />
      ))}
    </div>
  </div>
);

export default CategoryCards;
