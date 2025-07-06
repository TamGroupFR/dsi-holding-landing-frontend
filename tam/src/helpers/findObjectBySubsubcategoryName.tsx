import { CategoriesProps } from '../interfaces/category.interface';

export const findObjectBySubsubcategoryName = (categories: CategoriesProps[], subsubcategoryName: string) => {
  const foundObject = categories
    .flatMap((category) => {
      return category.subcategories.map((subcategory) => ({
        category: category.slug,
        subcategory: subcategory.slug,
        subsubcategory: subcategory.subcategories
          ? subcategory.subcategories.find((subsubcategory) => subsubcategory.name === subsubcategoryName)
          : undefined,
      }));
    })
    .find((obj) => obj.subsubcategory);

  return foundObject;
};
