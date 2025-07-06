import { CategoriesProps } from '../interfaces/category.interface';

export const findObjectBySubsubcategoryName = (categories: CategoriesProps[], subsubcategoryName: string) => {
  const foundObject = categories
    .flatMap((category) => {
      return category.subcategories.map((subcategory) => ({
        category: category.slug,
        subcategory: subcategory.slug,
      }));
    })
    .find((obj) => obj.subcategory);

  return foundObject;
};
