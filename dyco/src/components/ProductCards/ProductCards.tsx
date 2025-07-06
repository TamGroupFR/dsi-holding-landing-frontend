import React from 'react';
import { ProductProps, similarProductsProps } from '../../interfaces/products.interface';
import LinkCard from '../LinkCard/LinkCard';

interface ProductCardsProps {
  products: ProductProps[] | similarProductsProps[];
  slug: string;
}

const ProductCards = ({
  products, slug,
}: ProductCardsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0 max-w-[926px]">
    {products.map(({
      name, slug: slugProduct, subcategory, gallery, specification,
    }) => {
      const { mainGallery } = specification || {};
      const image = () => {
        if (gallery?.images?.length) {
          return gallery.images[0].gatsbyImageData;
        }
        if (mainGallery) {
          return mainGallery[0].gatsbyImageData;
        }
        return undefined;
      };
      return (
        <LinkCard
          key={name}
          link={`/${slug}/${subcategory.category[0].slug}/${subcategory.slug}/${slugProduct}`}
          name={name}
          image={image()}
        />
      );
    })}
  </div>
);

export default ProductCards;
