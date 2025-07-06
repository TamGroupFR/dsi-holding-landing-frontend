import { Link } from 'gatsby';
import React from 'react';
import { ProductRenderProps } from '../../interfaces/products.interface';

interface ProductLinkProps {
  product: ProductRenderProps;
  productsPageSlug: string;
  className?: string;
  arrowPosition?: 'top' | 'bottom' | 'left';
  fullPageWidth?: boolean;
}

const getUrl = (product: ProductRenderProps, productsPageSlug: string) => {
  if (!product?.subcategory?.category) return '';
  return `/${productsPageSlug}/${product.subcategory.category[0].slug}/${product.subcategory.slug}/${product.slug}`;
};

const ProductLink = ({
  product,
  productsPageSlug,
  className,
  arrowPosition = 'top',
  fullPageWidth = false,
} : ProductLinkProps) => {
  const url = getUrl(product, productsPageSlug);
  const fullWidthContainerClass = fullPageWidth ? 'lg:max-w-[150px]' : '';
  const fullWidthLabelClass = fullPageWidth ? 'lg:text-subtitle-12 lg:px-3' : '';

  const translate = (function () {
    switch (arrowPosition) {
      case 'top':
        return 'translate-x-[-50%] translate-y-[10px]';
      case 'bottom':
        return 'translate-x-[-50%] translate-y-[-150%]';
      case 'left':
        return 'translate-x-[10px] translate-y-[-50%]';
      default:
        return '';
    }
  }());

  if (!url) return null;

  return (
    <div className={`absolute max-w-[120px] group ${fullWidthContainerClass} ${className} ${translate}`}>
      {arrowPosition === 'top' && (
        <div className="absolute h-0 w-0 top-[-10px] left-[50%] translate-x-[-50%] border-x-8 border-x-transparent border-b-[10px] border-b-primary group-hover:border-b-primary">{' '}</div>
      )}
      {arrowPosition === 'bottom' && (
        <div className="absolute h-0 w-0 bottom-[-10px] left-[50%] translate-x-[-50%] border-x-8 border-x-transparent border-t-[10px] border-t-primary group-hover:border-t-primary">{' '}</div>
      )}
      {arrowPosition === 'left' && (
        <div className="absolute h-0 w-0 top-[50%] left-[-10px] translate-y-[-50%] border-y-8 border-y-transparent border-r-[10px] border-r-primary group-hover:border-r-primary">{' '}</div>
      )}
      <Link to={url} className={`text-subtitle-10 bg-primary bg-opacity-50 block group-hover:bg-primary text-white py-[2px] px-[2px] text-center ${fullWidthLabelClass}`} >
        {product.labelRender ? product.labelRender : product.name}
      </Link>
    </div>
  );
};

export default ProductLink;
