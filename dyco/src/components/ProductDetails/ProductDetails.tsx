import React, { useState } from 'react';
import {
  ProductProps,
  ProductPageProps,
} from '../../interfaces/products.interface';
import SpecificationTab from './SpecificationTab';
import InstructionsTab from './InstructionsTab';
import Header from '../Header/Header';
import { goToSection } from '../../helpers/goToSection';
import downloadWhite from '../../assets/icon/download-white.png';

interface ProductDetailsProps {
  product: ProductProps;
  productPage: ProductPageProps;
}

const ProductDetails = ({ product, productPage }: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const activeTabClasses = 'arrow-down bg-neutral-400';
  const showInstructionsTap =
    product.instructions &&
    Boolean(
      product.instructions.mainDescription || product.instructions.steps?.length
    );

  return (
    <div className="flex flex-col w-full">
      <section className="lg:px-0 lg:container flex justify-between flex-col sm:flex-row mb-6 sm:mb-0">
        <Header title={product.name} icon />
        {product.downloads?.length &&
          product.downloads?.length > 0 &&
          activeTab === 0 && (
            <button
              type="button"
              className="bg-dark-navy text-white text-body-12 lg:text-paragraph-14 px-2.5
              py-2 rounded h-[40px] flex gap-1 items-center sm:min-w-[100px] sm:ml-2"
              onClick={goToSection(productPage.buttonDownload)}
            >
              <img src={downloadWhite} alt={productPage.buttonDownloads} />
              <span className="block">{productPage.buttonDownload}</span>
            </button>
          )}
      </section>
      <section className="lg:px-0 lg:container mb-6 flex justify-between flex-col sm:flex-row">
        {productPage.productTabs.map((tab, index) => {
          if (index === 1 && !showInstructionsTap) {
            return null;
          }
          return (
            <button
              type="button"
              key={tab.name}
              className={`flex-1 bg-dark-navy hover:bg-primary text-white p-2 ${
                activeTab === index ? activeTabClasses : ''
              }`}
              onClick={() => {
                setActiveTab(index);
              }}
            >
              <h2 className="text-center text-body-18">{tab.name}</h2>
            </button>
          );
        })}
      </section>
      {activeTab === 0 && (
        <SpecificationTab product={product} productPage={productPage} />
      )}
      {activeTab === 1 && (
        <InstructionsTab instructions={product.instructions} />
      )}
    </div>
  );
};

export default ProductDetails;
