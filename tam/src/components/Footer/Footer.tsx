import React from 'react';
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import ExternalLink from '../../utils/ExternalLink/ExternalLink';
import { FooterProps } from '../../interfaces/footer.interfaces';

interface Props {
  footer: FooterProps;
}

const Footer = ({ footer }: Props) => {
  const i18next = useI18next();
  const { t } = useTranslation();

  const {
    call,
    company,
    companyLinks,
    contact,
    copyrights,
    email,
    languages,
    termsLinks,
    careersLink
  } = footer;

  return (
    <footer className="bg-navy text-white pt-10 md:pt-20 lg:pt-16 pb-10 lg:pb-11">
      <div className="container">
        <div className="grid-layout gap-y-10 md:gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-2">
            <Link to="/">
              <img
                className="w-[62px] md:w-[114px]"
                src="/img/logo-tam.svg"
                alt="TAM"
              />
            </Link>
          </div>

          <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{company}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              {companyLinks.map(({ name, url }) => (
                <li key={name}>
                  <Link to={`/${url}`} className="block hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Use when second language will be ready */}
          {/* <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{languages}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              {i18next.languages.map((lng: string) => (
                <li key={lng}>
                  <Link
                    to={i18next.originalPath}
                    className="block text-body-14 font-medium hover:text-blue"
                    language={lng}
                  >
                    {t(`languages.${lng}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{contact}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              <li>
                {email}{' '}
                <a
                  className="hover:underline"
                  href={`mailto:bonjour@tamgroupe.fr`}
                >
                  <span className="text-blue">bonjour@tamgroupe.fr</span>
                </a>
              </li>

              <li>
                {call}{' '}
                <a
                  className="hover:underline"
                  href={`tel:(+33) 01 64 13 30 00`}
                >
                  (+33) 01 64 13 30 00
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid-layout">
              <div className="col-span-4 md:col-span-2 lg:col-span-4 mt-14 md:mt-0 order-2 md:order-1">
                <p className="text-body-12">{copyrights}</p>
              </div>
              <div className="col-span-4 md:col-span-6 lg:col-span-8 order-1 md:order-2">
                <div className="grid gap-x-8 md:gap-x-6 lg:gap-x-8 gap-y-5 md:grid-flow-col md:auto-cols-max text-body-12">
                  <a
                    className="hover:underline"
                    href={careersLink.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {careersLink.name}
                  </a>
                  {termsLinks.map(({ name, url }) => (
                    <Link className="hover:underline" to={`/${url}`} key={name}>
                      {name}
                    </Link>
                  ))}
                  <ExternalLink
                    href="https://www.linkedin.com/company/tam-groupe/"
                    target="_blank"
                    className="hover:underline"
                  >
                    LinkedIn
                  </ExternalLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
