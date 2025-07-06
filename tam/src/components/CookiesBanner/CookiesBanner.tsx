import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import React, { FC } from 'react';
import Button from '../Button/Button';

interface Props {
  onAccept?: () => void;
  onReject?: () => void;
}

const CookiesBanner: FC<Props> = ({ onAccept, onReject }) => {
  const { t } = useTranslation();

  return (
    <div className="pt-5 pb-10 px-4 md:py-8 md:px-8 lg:px-16 rounded-tr bg-[#141414]">
      <h3 className="text-white font-bold text-title-5">
        {t('cookiesBanner.title')}
      </h3>
      <p className="text-white text-body-16 mt-2.5">
        {t('cookiesBanner.desc')}
        &nbsp;
        <Link
          className="underline lowercase"
          to="/privacy-policy"
          dangerouslySetInnerHTML={{ __html: t('cookiesBanner.privacyPolicy') }}
        />
      </p>

      <div className="mt-16 flex justify-end space-x-8">
        <div className="flex flex-col w-36">
          <Button kind="secondary" onClick={onReject}>
            {t('common.reject')}
          </Button>
        </div>

        <div className="flex flex-col w-36">
          <Button kind="primary" onClick={onAccept}>
            {t('common.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookiesBanner;
