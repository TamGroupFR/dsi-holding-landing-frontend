import React, { FC } from 'react';
import HighlightedText from '../../components/HighlightedText/HighlightedText';

export interface ContentfulContactSection {
  title: string;
  titleHighlightedWord: string;
  email: string;
  phoneNumber: string;
}

interface ContactSectionProps {
  contactData: ContentfulContactSection;
}

const ContactSection: FC<ContactSectionProps> = ({ contactData }) => {
  const { email, phoneNumber, title, titleHighlightedWord } = contactData;

  return (
    <section className="bg-navy text-white py-10 md:py-12 lg:py-24 bg-section-contact-sm md:bg-section-contact-md lg:bg-section-contact-lg bg-no-repeat bg-cover bg-center">
      <div className="container grid-layout">
        <div className="col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-2 md:-mx-6 lg:mx-0">
          <h2 className="text-title-4 md:text-title-3 lg:text-title-1 font-black">
            <HighlightedText text={title} wordToHighlight={titleHighlightedWord} />
          </h2>
          <ul className="flex flex-col space-y-5 mt-5 md:mt-8 text-body-16 md:text-body-18 lg:text-body-20 font-bold">
            <li>
              <a className="hover:underline text-blue" href={`mailto:${email}`}>
                {email}
              </a>
            </li>

            <li>
              <a className="hover:underline" href={`tel:${phoneNumber}`}>
                {phoneNumber}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
