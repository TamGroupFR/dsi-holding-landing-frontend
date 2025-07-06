import React, { FC } from 'react';
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import ExternalLink from '../../utils/ExternalLink/ExternalLink';
import { FooterProps } from '../../interfaces/footer.interface';

interface Props {
  siteMetadata?: any;
  footer: FooterProps;
}

const Footer: FC<Props> = ({ siteMetadata, footer }) => {
  const i18next = useI18next();
  const { t } = useTranslation();

  const {
    links,
    allRights,
    company,
    contact,
    email,
    language,
    phone,
    socialLinks,
    termsLinks,
  } = footer.nodes[0];

  return (
    <footer className="bg-navy text-white pt-10 md:pt-20 lg:pt-16 pb-10 lg:pb-11">
      <div className="container">
        <div className="grid-layout gap-y-10 md:gap-y-14 md:gap-x-1 lg:gap-x-5">
          <div className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-2">
            <Link to="/">
              <img src="/img/logo-dywidag-white.png" alt={siteMetadata.title} />
            </Link>
          </div>
          <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{company}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              {links.map(({ name, url }) => (
                <li key={name}>
                  <Link to={`/${url}`} className="hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{language}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              {i18next.languages.map((lng: string) => (
                <li key={lng}>
                  <Link
                    to="/"
                    className="block text-body-14 font-medium hover:text-primary"
                    language={lng}
                  >
                    {t(`languages.${lng}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2">
            <p className="text-subtitle-16 font-bold">{contact}</p>
            <ul className="grid gap-3.5 mt-6 text-body-14 font-medium whitespace-nowrap">
              <li>
                {email.name}{' '}
                <a
                  className="hover:underline text-primary"
                  href={`mailto:${email.url}`}
                >
                  <span className="text-primary">{email.url}</span>
                </a>
              </li>

              <li>
                {phone.name}{' '}
                <a className="hover:underline" href={`tel:${phone.url}`}>
                  {phone.url}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid-layout">
              <div className="col-span-4 md:col-span-3 lg:col-span-4 mt-14 md:mt-0 order-2 md:order-1">
                <p className="text-body-12">{allRights}</p>
              </div>
              <div className="col-span-4 md:col-span-5 lg:col-span-8 order-1 md:order-2">
                <div className="grid gap-x-4 lg:gap-x-8 gap-y-5 md:grid-flow-col md:auto-cols-max text-body-12">
                  {termsLinks.map(({ url, title }) => (
                    <a
                      href={url}
                      key={title}
                      download={title}
                      target="blank"
                      className="hover:underline"
                    >
                      {title}
                    </a>
                  ))}
                  {socialLinks.map(({ name, url }) => (
                    <ExternalLink
                      target="_blank"
                      className="hover:underline"
                      href={url}
                      key={name}
                    >
                      {name}
                    </ExternalLink>
                  ))}
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
