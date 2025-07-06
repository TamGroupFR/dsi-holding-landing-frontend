import { BLOCKS, INLINES, Node } from '@contentful/rich-text-types';
import { PageProps, graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';
import Certificates from '../components/Certificates/Certificates';
import EuroCode from '../components/EuroCode/EuroCode';
import Header from '../components/Header/Header';
import History from '../components/History/History';
import Layout from '../components/Layout/Layout';
import ParallaxHero from '../components/ParallaxHero/ParallaxHero';
import PartneringSection from '../components/PartneringSection/PartneringSection';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import SlideshowGallery from '../components/SlideshowGallery/SlideshowGallery';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { CompanyDataProps } from '../interfaces/company.interface';
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
      return <p className="text-body-14 mb-4">{children}</p>;
    },
  },
};

const Company = ({ data }: PageProps<CompanyDataProps>) => {
  const {
    company,
    navigation,
    navigationMobile,
    footer,
    productPage,
    contact,
    homepage: globalSeoData,
  } = data;

  const {
    contactArea,
    capacity,
    calculation,
    profiles,
    title,
    eurocodeTitle,
    historyTitle,
    historySection,
    aboutTitle,
    aboutDescription,
    aboutDescriptionSecondary,
    images,
    visionSections,
    approvalItems,
    approvalTitle,
    productionTitle,
    productionItems,
    certificatesTitle,
    certificateColumnsTitle,
    certificatesItems,
    banner,
    seo,
  } = company;

  const pageData: PageSeoData = {
    title,
  };

  const productsLink = productPage.nodes[0].slug;

  return (
    <Layout
      allowBack
      backLink="/"
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, seo, pageData)}
    >
      <ParallaxHero bgImage={banner.url} />
      <div className="pt-10 md:pt-16 lg:pt-24">
        <section className="container flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <Header title={aboutTitle} icon />
            {aboutDescription && (
              <div className="flex flex-col  mt-2.5 md:mt-5">
                {renderRichText(aboutDescription, richTextOptions)}
              </div>
            )}
          </div>
          <div className="flex items-center lg:w-2/3">
            <SlideshowGallery gallery={images} />
          </div>
        </section>
      </div>
      {aboutDescriptionSecondary && (
        <div className="pt-10 pb-10 md:pb-16 lg:pb-24">
          <section className="container flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col  mt-2.5 md:mt-5">
              {renderRichText(aboutDescriptionSecondary, richTextOptions)}
            </div>
          </section>
        </div>
      )}
      <div className="pb-10 md:pb-14 lg:pb-24 pt-5 md:pt-8 lg:pt-12 bg-dark-navy text-white">
        {visionSections.map(
          ({ title: titleSection, subtitle, description }) => (
            <section
              className="container flex flex-col mt-10 md:mt-14 lg:mt-24"
              key={title}
            >
              <div>
                <div className="hidden lg:block">
                  <SectionTitle besideIcon>{titleSection}</SectionTitle>
                  {subtitle && (
                    <p className="text-subtitle-18 font-bold mt-5">
                      {subtitle}
                    </p>
                  )}
                </div>
                <div className="lg:hidden">
                  <SectionTitle>{titleSection}</SectionTitle>
                  {subtitle && (
                    <p className="text-subtitle-18 font-bold text-center mt-2.5 mx-auto">
                      {subtitle}
                    </p>
                  )}
                </div>
                { description && (
                  <div className="mt-8">
                    {renderRichText(description, richTextOptions)}
                  </div>
                )}
              </div>
            </section>
          ),
        )}
      </div>
      <History
        sectionHeader={historyTitle}
        historySection={historySection}
      />
      <EuroCode
        productsLink={productsLink}
        eurocodeTitle={eurocodeTitle}
        contactArea={contactArea}
        capacity={capacity}
        calculation={calculation}
        profiles={profiles}
      />
      <Certificates
        approvalItems={approvalItems}
        approvalTitle={approvalTitle}
        productionTitle={productionTitle}
        productionItems={productionItems}
        certificatesTitle={certificatesTitle}
        certificateColumnsTitle={certificateColumnsTitle}
        certificatesItems={certificatesItems}
        productsLink={productsLink}
      />
      <PartneringSection contact={contact.nodes[0]} />
    </Layout>
  );
};

export default Company;

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
    company: contentfulCompanyPage(node_locale: { eq: $language }) {
      title
      banner {
        url
      }
      eurocodeTitle
      aboutTitle
      aboutDescription {
        raw
      }
      aboutDescriptionSecondary {
        raw
      }
      images {
        title
        gatsbyImageData(placeholder: BLURRED)
      }
      visionSections {
        subtitle
        title
        description {
          raw
        }
      }
      approvalItems {
        image {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        description {
          childMarkdownRemark {
            html
          }
        }
      }
      approvalTitle
      productionTitle
      productionItems {
        description {
          childMarkdownRemark {
            html
          }
        }
        title
      }
      certificatesTitle
      certificateColumnsTitle
      certificatesItems {
        type
        symbol {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        product {
          name
          slug
          subcategory {
            slug
            category {
              slug
            }
          }
        }
        name
        file {
          url
          title
        }
      }
      historyTitle
      historySection {
        title
        description {
          description
        }
      }
      contactArea {
        title
        description {
          childMarkdownRemark {
            html
          }
        }
        types {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
        image {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        imageDescription {
          raw
        }
        table {
          raw
        }
        tableDescription {
          raw
        }
      }
      capacity {
        title
        description {
          raw
        }
      }
      calculation {
        title
        description {
          raw
        }
        image {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        imageDescription {
          raw
        }
      }
      profiles {
        title
        description {
          childMarkdownRemark {
            html
          }
        }
        joints {
          title
          image {
            gatsbyImageData(placeholder: BLURRED)
            title
          }
          products {
            slug
            name
            subcategory {
              slug
              category {
                slug
              }
            }
          }
        }
        channels {
          title
          image {
            gatsbyImageData(placeholder: BLURRED)
            title
          }
          products {
            slug
            name
            subcategory {
              slug
              category {
                slug
              }
            }
          }
        }
      }
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
