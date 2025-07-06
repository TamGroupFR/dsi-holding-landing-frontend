import { AnimatePresence, motion } from 'framer-motion';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React, { FC, useState } from 'react';
import Button from '../Button/Button';

const Banner: FC = () => {
  const i18next = useI18next();
  const { t } = useTranslation();
  const [backdrop, setBackdrop] = useState(true);
  const popupLink = `/img/Targi-${i18next.language}.png`;
  const classes = backdrop
    ? 'fixed backdrop-blur-sm w-full h-screen z-10'
    : 'fixed w-full h-screen z-10 hidden';

  const handleClose = () => {
    setBackdrop(false);
    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    if (document) {
      document.cookie = `${i18next.language}=1;${expires};`;
    }
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
            <div className="relative pt-5 pb-10 px-4 md:py-8 md:px-8 lg:px-16 rounded-md bg-navy">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-[4%] top-[8%] sm:top-[2%] text-white cursor-pointer"
              >
                &#x2715;
              </button>
              <div className="sm:mt-4 mt-16 mb-4 flex justify-center space-x-8 sm:max-h-[355px]">
                <img src={popupLink} alt="targi" />
              </div>
              <div className="flex justify-center w-44 m-auto">
                <Button onClick={handleClose} kind="primary">
                  {t('common.close')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Banner;
