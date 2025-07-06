import React from 'react';
import { ProductProps } from '../../interfaces/products.interface';
import Product from './Product';

interface ProductCardsProps {
  products: ProductProps[];
  slug: string;
  subcategoryName?: string | null;
  categoryName?: string | null;
}

const ProductCards = ({
  products,
  slug,
  subcategoryName,
  categoryName,
}: ProductCardsProps) => (
  <div className="flex flex-col w-full">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0 max-w-[926px]">
      {products.map(({ name, slug: slugProduct, subcategory, gallery }) => (
        <Product
          link={
            subcategoryName && categoryName
              ? `/${slug}/${categoryName}/${subcategoryName}/${subcategory.slug}/${slugProduct}`
              : `/${slug}/${subcategory.category[0].slug}/${subcategory.slug}/${slugProduct}`
          }
          name={name}
          gallery={gallery}
          slug={slugProduct}
        />
      ))}
    </div>
  </div>
);

export default ProductCards;
