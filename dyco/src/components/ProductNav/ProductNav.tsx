import { Link } from 'gatsby';
import React from 'react';
import { ButtonIconProps } from '../../interfaces/products.interface';
import BreadcrumbsProducts, {
  BreadcrumbsProps,
} from '../BreadcrumbsProducts/BreadcrumbsProducts';
import Header from '../Header/Header';
import backArrow from '../../assets/icon/backArrow.svg';

interface ProductNavProps extends BreadcrumbsProps {
  isMobile: boolean;
  slug: string;
  buttonBack: string;
  isProducts: boolean;
  isActiveSubcategory: boolean;
  name?: string;
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
  setProductName,
  buttonBack,
  isProducts,
  isActiveSubcategory,
  name,
}: ProductNavProps) => {
  const handleClick = () => {
    if (isProducts) {
      setCategoryName(null);
      setSubcategoryName(null);
    }
  };
  return (
    <>
      {isMobile && isActiveSubcategory && (
        <Link
          to={`/${slug}`}
          className="flex items-center font-bold text-subtitle-14 mb-4"
          onClick={handleClick}
        >
          <img src={backArrow} alt={buttonBack} />
          {buttonBack}
        </Link>
      )}
      {isMobile && !isActiveSubcategory && name && <Header title={name} icon />}
      <div className="scale-x-0 scale-y-0 h-0 w-0 md:scale-x-100  md:scale-y-100 md:h-auto md:w-auto">
        <BreadcrumbsProducts
          links={links}
          homeLink={homeLink}
          allProducts={allProducts}
          productIndex={productIndex}
          slug={slug}
          setCategoryName={setCategoryName}
          setSubcategoryName={setSubcategoryName}
          setProductName={setProductName}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductNav;
