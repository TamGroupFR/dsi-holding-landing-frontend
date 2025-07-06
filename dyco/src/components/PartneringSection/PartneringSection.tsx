import React from 'react';

export interface ContactProps {
  phone: string;
  title: string;
  subtitle: string;
  slug: string;
  email: string;
  description: string;
  nip: string;
  regon: string;
  krs: string;
  seedCapital: string;
}
export interface PartneringSectionProps {
  contact: ContactProps;
}

const PartneringSection = ({ contact }: PartneringSectionProps) => {
  const { subtitle, description, email, phone, nip, regon, krs, seedCapital } = contact;

  return (
    <section
      className="bg-navy text-white py-10 md:py-12 lg:py-24 bg-section-partnering-sm
      md:bg-section-partnering-md lg:bg-section-partnering-lg bg-no-repeat bg-cover bg-center"
    >
      <div className="container grid-layout">
        <div className="col-span-4 md:col-span-6 lg:col-span-10 md:col-start-2 lg:col-start-2 md:-mx-6 lg:mx-0">
          <h2 className="text-title-4 md:text-title-3 lg:text-title-1 font-black">
            {subtitle}
          </h2>
          <div className="text-body-14 md:text-body-18 lg:text-body-20 font-medium">
            <p className="mt-5">
              {description}
            </p>
            <p className="mt-3">
              {nip}
            </p>
            <p className="mt-3">
              {regon}
            </p>
            <p className="mt-3">
              {krs}
            </p>
            <p className="mt-3">
              {seedCapital}
            </p>
          </div>
          <ul className="flex flex-col space-y-5 mt-5 lg:mt-11 text-body-16 md:text-body-18 lg:text-body-20 font-bold">
            <li>
              <a
                className="text-primary hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </li>
            <li>
              <a className="hover:underline" href={`tel:${phone}`}>
                {phone}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PartneringSection;
