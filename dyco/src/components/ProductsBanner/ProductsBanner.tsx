import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  ImageProps,
  ProductRenderProps,
} from '../../interfaces/products.interface';
import ProductLink from './ProductLink';

interface ProductsBannerProps {
  productsRender: ProductRenderProps[];
  renderImage: ImageProps;
  productsPageSlug: string;
  className?: string;
  fullPageWidth?: boolean;
}

const ProductsBanner = ({
  productsRender,
  renderImage,
  productsPageSlug,
  className = '',
  fullPageWidth = false,
}: ProductsBannerProps) => {
  return (
    <div className={`relative w-fit my-0 mx-auto ${className}`}>
      <GatsbyImage
        image={renderImage.gatsbyImageData}
        alt={renderImage.title}
      />
      <ProductLink
        className="left-[10%] top-[53%]"
        product={productsRender[0]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[10%] top-[66%]"
        product={productsRender[1]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[13%] top-[69%]"
        product={productsRender[2]}
        productsPageSlug={productsPageSlug}
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[17%] top-[51%]"
        product={productsRender[3]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[22%] top-[46%]"
        product={productsRender[4]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[20%] top-[73%]"
        product={productsRender[5]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[24%] top-[81%]"
        product={productsRender[6]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[28%] top-[67%]"
        product={productsRender[7]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[30%] top-[57%]"
        product={productsRender[8]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[33%] top-[34%]"
        product={productsRender[9]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[34%] top-[40%]"
        product={productsRender[10]}
        productsPageSlug={productsPageSlug}
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[40%] top-[82%]"
        product={productsRender[11]}
        productsPageSlug={productsPageSlug}
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[36%] top-[66%]"
        product={productsRender[12]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[44%] top-[34%]"
        product={productsRender[13]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[49%] top-[76%]"
        product={productsRender[14]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[53%] top-[55%]"
        product={productsRender[15]}
        productsPageSlug={productsPageSlug}
        arrowPosition="left"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[54%] top-[47%]"
        product={productsRender[16]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[64%] top-[29%]"
        product={productsRender[17]}
        productsPageSlug={productsPageSlug}
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[69%] top-[26%]"
        product={productsRender[18]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[73%] top-[43%]"
        product={productsRender[19]}
        productsPageSlug={productsPageSlug}
        arrowPosition="bottom"
        fullPageWidth={fullPageWidth}
      />
      <ProductLink
        className="left-[88%] top-[48%]"
        product={productsRender[20]}
        productsPageSlug={productsPageSlug}
        fullPageWidth={fullPageWidth}
      />
    </div>
  );
};

export default ProductsBanner;
