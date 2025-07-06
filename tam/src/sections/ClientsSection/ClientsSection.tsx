import React, { FC } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { Image } from '../../types/pages';

interface ClientsSectionProps {
  clients: Image[];
}

const ClientsSection: FC<ClientsSectionProps> = ({ clients }) => {
  const { t } = useTranslation();

  return (
    <section className="container grid-layout">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-5 md:mt-10 lg:mt-12">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-6 md:gap-x-12 lg:gap-x-24 gap-y-5 md:gap-y-9 place-items-center">
          {clients.map(({ title, url }) => (
            <img src={url} alt={title} key={url + title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
