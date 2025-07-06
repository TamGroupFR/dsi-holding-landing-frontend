import React, { FC } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import BrandTile from '../../components/BrandTile/BrandTile';
import { getBrandDetailsBySlug } from '../../utils/band-utils';

export interface Brand {
    logo: {
      file: {
        url: string;
      };
      title: string
    };
    brandUrl: string;
    productType: string;
    readMoreButtonText: string;
  }
interface Props {
  brands: Brand[];
}

const ProductsRangeSection: FC<Props> = ({ brands }) => {
  const { t } = useTranslation();

  return (
    <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-5 md:mt-10 lg:mt-12">
      <div className="flex items-stretch justify-center flex-wrap -m-2.5 md:-m-3 lg:-m-4">
        {brands.map(({
          logo: { file, title }, productType, brandUrl, readMoreButtonText,
        }) => (
          <div
            key={productType}
            className="w-1/2 lg:flex-1 p-2.5 md:p-3 lg:p-4"
          >
            <BrandTile
              brandUrl={brandUrl}
              name={productType}
              title={title}
              img={file.url}
              buttonText={readMoreButtonText}
              paddingClassName="py-8 px-4 md:px-12 lg:px-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsRangeSection;
