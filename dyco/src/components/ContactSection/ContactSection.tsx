import React, { useRef } from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import RegionsWithMap from '../RegionsWithMap/RegionsWithMap';
import PartneringSection, {
  ContactProps
} from '../PartneringSection/PartneringSection';
import { RegionProps } from '../../interfaces/regions.interface';

interface ContactSectionProps {
  contact: ContactProps;
  regions: {
    title: string;
    variant: string;
    description?: {
      description: string;
    };
    regions: RegionProps[];
  };
}

const ContactSection = ({ contact, regions }: ContactSectionProps) => {
  const mapSectionRef = useRef<HTMLDivElement | null>(null);
  const { description, title, regions: regionsItems, variant } = regions;

  return (
    <div>
      <section className="bg-navy text-white pb-8">
        <div ref={mapSectionRef} className="container pt-10 md:pt-14">
          <div className="flex flex-col items-center text-center">
            <SectionTitle>{title}</SectionTitle>
            {description ? (
              <p className="text-center text-body-16 md:text-body-20 mt-2.5 md:mt-5">
                {description.description}
              </p>
            ) : null}
          </div>
        </div>
        <div
          className={`container grid-layout mt-2.5 md:mt-12 ${
            variant === 'DACH' ? 'md:min-h-[700px]' : 'md:min-h-[555px]'
          } lg:min-h-[555px]`}
        >
          <div className="col-span-4 md:col-span-6 lg:col-span-12 md:col-start-2 lg:col-start-1 md:-mx-6 lg:mx-0">
            <RegionsWithMap regions={regionsItems} variant={variant} />
          </div>
        </div>
      </section>
      <PartneringSection contact={contact} />
    </div>
  );
};

export default ContactSection;
