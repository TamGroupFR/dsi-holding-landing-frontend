import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { ButtonIconProps, ImageProps } from '../../interfaces/products.interface';
import BreadcrumbsProducts, { BreadcrumbsProps } from '../BreadcrumbsProducts/BreadcrumbsProducts';
import Header from '../Header/Header';

interface ProductNavProps extends BreadcrumbsProps {
  isMobile: boolean;
  slug: string;
  buttonBack: ButtonIconProps;
  isProducts: boolean;
  isActiveSubcategory: boolean;
  name?: string;
  icon?: ImageProps;
}

const ProductNav = ({
  isMobile,
  slug,
  links,
  homeLink,
  allProducts,
  productIndex,
  product,
  setCategoryName,
  setSubcategoryName,
  setSubsubcategoryName,
  buttonBack,
  isProducts,
  isActiveSubcategory,
  name,
  icon,
}: ProductNavProps) => {
  const handleClick = () => {
    if (isProducts) {
      setCategoryName(null);
      setSubcategoryName(null);
      setSubsubcategoryName(null);
    }
  };
  return (
    <>
      {isMobile && isActiveSubcategory && (
        <Link to={`/${slug}`} className="flex items-center font-bold text-subtitle-14 mb-4" onClick={handleClick}>
          <GatsbyImage image={buttonBack.icon.gatsbyImageData} alt={buttonBack.name} className="mr-1 w-[24px]" />
          {buttonBack.name}
        </Link>
      )}
      {isMobile && !isActiveSubcategory && icon && name && <Header title={name} icon={icon} />}
      <div className="scale-x-0 scale-y-0 h-0 w-0 md:scale-x-100  md:scale-y-100 md:h-auto md:w-auto">
        <BreadcrumbsProducts
          links={links}
          homeLink={homeLink}
          allProducts={allProducts}
          productIndex={productIndex}
          slug={slug}
          setCategoryName={setCategoryName}
          setSubcategoryName={setSubcategoryName}
          product={product}
          setSubsubcategoryName={setSubsubcategoryName}
        />
      </div>
    </>
  );
};

export default ProductNav;
