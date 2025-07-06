/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useTranslation, useI18next } from 'gatsby-plugin-react-i18next';
import React, { FC, useState } from 'react';
import Button from '../Button/Button';

const CatalogBanner: FC = () => {
  const { t } = useTranslation();
  const [backdrop, setBackdrop] = useState(true);
  const classes = backdrop ? 'fixed backdrop-blur-sm w-full h-screen z-10' : 'fixed w-full h-screen z-10 hidden';

  const handleClose = () => {
    setBackdrop(false);
  };
  return (
    <div className={classes}>
      <AnimatePresence>
        {backdrop && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed sm:max-w-1xl sm:max-h-0 sm:p-4 m-auto left-0 right-0 top-[10%] transform -translate-x-1/2 -translate-y-1/2
        w-full max-w-5xl z-10 sm:rounded-sm"
        >
          <div className="relative pt-5 pb-10 px-4 md:py-8 md:px-8 lg:px-16 rounded-md bg-[#141414]">

            <div onClick={handleClose} className="absolute right-[4%] top-[8%] sm:top-[2%] text-white cursor-pointer">
              &#x2715;
            </div>
            <h3 className="text-white font-bold text-title-5 sm:text-title-6 sm:mb-2">
              {t('common.new')}
            </h3>
            <div className="sm:mt-0 mt-16 flex justify-center space-x-8 sm:max-h-[355px]">
              <object width="100%" height="375" data="/downloads/catalogue-fr.pdf" type="application/pdf">
                <param name="view" value="fit" />
              </object>

            </div>
            <div className="mt-16 flex justify-center space-x-8">
              <div className="flex justify-center flex-col w-36">
                <a href="/downloads/catalogue-fr.pdf" target="_blank">
                  <Button kind="secondary">
                    {t('common.open')}
                  </Button>
                </a>
              </div>

              <div className="flex flex-col w-36">
                <a href="/downloads/catalogue-fr.pdf" download="TAM-catalogue-fr">
                  <Button kind="primary">
                    {t('common.download')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default CatalogBanner;
