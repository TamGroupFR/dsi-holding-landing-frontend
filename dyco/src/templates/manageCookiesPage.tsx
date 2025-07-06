import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types';
import { PageProps, graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import ManageCookiesRadio from '../components/ManageCookiesRadio/ManageCookiesRadio';
import PartneringSection from '../components/PartneringSection/PartneringSection';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { ManageCookiesDataProps, CookieSelection } from '../interfaces/manageCookies.interface';
import { PageSeoData } from '../interfaces/seo.interface';

const richTextOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
      const { data: { uri } } = node;
      return (
        <a
          href={uri}
          className="hover:underline"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-16 mb-2">{children}</p>;
    },
    [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => {
      return (
        <h2 className="mt-6 mb-4 font-semibold text-lg md:text-body-20">
          {children}
        </h2>
      );
    },
  },
};

const ManageCookies = ({ data }: PageProps<ManageCookiesDataProps>) => {
  const [cookieConsent, updateCookieConsent] = useLocalStorage('dywidag-cookies-consent');
  const [enhancedCookieConsent, updateEnhancedCookieConsent] = useLocalStorage('dywidag-cookies-enhanced-consent');
  const [isPristine, setIsPristine] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [cookiesSelection, setCookiesSelection] = useState<CookieSelection | null>(null);
  const {
    manageCookies,
    navigation,
    navigationMobile,
    footer,
    contact,
    homepage: globalSeoData,
  } = data;

  const {
    title,
    description,
    allowOptionTitle,
    allowOptionDescription,
    blockOptionTitle,
    blockOptionDescription,
    saveButtonLabel,
    seo,
  } = manageCookies;

  const pageData: PageSeoData = {
    title,
  };

  const handleCookiesRadioClick = (name: CookieSelection) => {
    if (cookiesSelection === name) return;
    setIsPristine(false);
    setIsSaved(false);
    setCookiesSelection(name);
  };

  const handleSaveButtonClick = () => {
    setIsSaved(true);

    if (cookiesSelection === 'allow') {
      updateCookieConsent(true);
      updateEnhancedCookieConsent(true);
    } else {
      updateCookieConsent(true);
      updateEnhancedCookieConsent(false);
    }

    window.location.reload();
  };

  useEffect(() => {
    if (typeof enhancedCookieConsent !== 'boolean') return;
    if (enhancedCookieConsent) {
      setCookiesSelection('allow');
    } else {
      setCookiesSelection('block');
    }
  }, []);

  return (
    <Layout
      allowBack
      backLink="/"
      darkNavbar
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, seo, pageData)}
    >
      <div className="pb-6 px-4 md:px-6 pt-32 md:pt-36 lg:pt-40">
        <section className="flex lg:px-0 lg:container">
          <Breadcrumbs homeLink="home" />
        </section>
        <section className="container flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Header title={title} icon />
          </div>
        </section>
      </div>
      <div className="pb-10 md:pb-16 lg:pb-24">
        <section className="container">
          {renderRichText(description, richTextOptions)}
        </section>
      </div>
      <div className="pb-10 md:pb-16 lg:pb-24">
        <section className="container flex flex-col lg:flex-row gap-8">
          <ManageCookiesRadio
            title={allowOptionTitle}
            description={allowOptionDescription}
            onClick={() => handleCookiesRadioClick('allow')}
            isChecked={cookiesSelection === 'allow'}
          />
          <ManageCookiesRadio
            title={blockOptionTitle}
            description={blockOptionDescription}
            onClick={() => handleCookiesRadioClick('block')}
            isChecked={cookiesSelection === 'block'}
          />
        </section>
        {!isPristine && (
          <section className="container flex justify-end pt-8 px-8">
            <button
              className="relative bg-primary text-white py-2 px-6 overflow-hidden"
              type="button"
              onClick={handleSaveButtonClick}
            >
              {saveButtonLabel}
              <span
                className={`${isSaved ? 'opacity-1' : 'opacity-0'} transition duration-200 absolute bg-[#EFEFEF] w-24 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-green-500 p-9`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </svg>
              </span>
            </button>
          </section>
        )}
      </div>
      <PartneringSection contact={contact.nodes[0]} />
    </Layout>
  );
};

export default ManageCookies;

export const query = graphql`
  query ($language: String!) {
    navigation: allContentfulNavigation(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        links {
          name
          url
        }
        buttonHome
      }
    }
    contact: allContentfulContactSection(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        phone
        title
        subtitle
        slug
        email
        description
      }
    }
    navigationMobile: allContentfulNavigationMobile(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        links {
          name
          url
        }
        buttonContact {
          name
          url
        }
      }
    }
    footer: allContentfulFooter(filter: { node_locale: { eq: $language } }) {
      nodes {
        allRights
        company
        contact
        email {
          url
          name
        }
        language
        phone {
          url
          name
        }
        links {
          url
          name
        }
        socialLinks {
          url
          name
        }
        termsLinks {
          url
          title
        }
      }
    }
    manageCookies: contentfulManageCookiesPage(node_locale: { eq: $language }) {
      title
      allowOptionTitle
      allowOptionDescription
      blockOptionTitle
      blockOptionDescription
      description {
        raw
      }
      saveButtonLabel
      seo {
        title
        description
        image {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    productPage: allContentfulProductPage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        slug
      }
    }
    homepage: allContentfulHomepage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
