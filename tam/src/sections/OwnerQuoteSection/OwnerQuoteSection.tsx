import React, { FC } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const OwnerQuoteSection: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="container grid-layout lg:place-items-center">
      <div className="col-span-4 md:col-span-3 lg:col-span-5 md:col-start-2 lg:col-start-2 order-2 md:order-1 text-center md:text-left md:-mx-6 lg:mx-0 mt-2.5 md:mt-0">
        <div className="flex flex-col items-center lg:items-stretch">
          <div className="flex flex-col-reverse md:flex-col items-start mb-5 md:mb-6 lg:mb-10">
            <h2 className="text-subtitle-18 md:text-title-4 lg:text-title-3 font-medium mt-5 md:mt-0 md:mb-6 lg:mb-10">
              {t('homepage.owner.title')}
            </h2>
            <img src="/img/quote.svg" alt="" />
          </div>

          <div className="">
            <p className="text-body-16 lg:text-body-20">
              {t('homepage.owner.desc')}
            </p>

            <p className="hidden md:block mt-4 lg:mt-10 text-body-16 font-medium">
              {t('homepage.owner.sign')}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 lg:col-span-4 md:col-start-6 lg:col-start-8 order-1 md:order-2 md:-mx-6 lg:mx-0">
        <div className="flex flex-col items-center md:mt-12 lg:mt-0">
          <img
            className="w-28 md:w-52 lg:w-96 h-28 md:h-52 lg:h-96 rounded-full md:rounded flex-shrink-0"
            src="/img/owner.png"
            alt={t('homepage.owner.sign')}
          />
          <p className="md:hidden mt-5 text-body-14 font-medium">
            {t('homepage.owner.sign')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OwnerQuoteSection;
