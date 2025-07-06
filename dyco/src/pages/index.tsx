import { graphql, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import arrow from '../assets/icon/arrow-right.svg';
import bullet from '../assets/icon/bullet.svg';
import logo from '../assets/img/logo-dywidag-white.svg';
import Button from '../components/Button/Button';
import ContactSection from '../components/ContactSection/ContactSection';
import Layout from '../components/Layout/Layout';
import ProductsBanner from '../components/ProductsBanner/ProductsBanner';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { getRegion } from '../helpers/getRegion';
import { HomepageProps } from '../interfaces/homepage.interface';

const IndexPage = ({ data }: PageProps<HomepageProps>) => {
  const {
    navigation,
    navigationMobile,
    homepage,
    contact,
    regions,
    footer,
    productPage: { nodes: productPageNodes }
  } = data;
  const {
    heroBanner,
    aboutSection,
    increaseSection,
    structureSection,
    uniqueSection,
    everywhereSection,
    seo,
  } = homepage.nodes[0];
  const productPage = productPageNodes[0];
  const i18next = useI18next();
  const currentRegion = getRegion(regions, i18next.language);

  return (
    <Layout
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={seo}
    >
      <header className="pt-24 md:pt-56 pb-44 md:pb-56 bg-section-hero bg-no-repeat bg-cover bg-center relative">
        <div className="absolute inset-0 w-full h-full bg-dark-navy bg-opacity-40 -z-10" />
        <video
          className="absolute inset-0 w-full h-full object-cover object-center -z-20"
          autoPlay
          muted
          loop
          tabIndex={-1}
          controls={false}
          src={heroBanner.video.url}
          playsInline
        />
        <div className="container grid-layout">
          <div className="col-span-4 md:col-span-6 lg:col-span-10 md:col-start-2">
            <div className="flex flex-col md:items-start text-white">
              <h1 className="text-title-4 md:text-title-1 lg:text-title-hero font-black filter drop-shadow-heroTitle">
                {heroBanner.title}
              </h1>
              <p className="mt-2 md:mt-8 mb-8 md:mb-12 text-body-14 md:text-body-18 font-medium">
                {heroBanner.description.description}
              </p>
              <Button
                isExternal
                paddingClass="px-4 md:px-20 lg:px-32"
                linkTo={`mailto:${heroBanner.button.url}`}
              >
                {heroBanner.button.name}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="mt-10 md:mt-14 lg:mt-24 mb-10 md:mb-12 lg:mb-20">
        <div className="container grid-layout">
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <div className="grid-layout place-items-center">
              <div className="col-span-4 md:col-span-4 lg:col-span-5">
                <div className="overflow-hidden -mt-14 -mb-6">
                  <img className="w-96 scale-150" src={logo} alt="Dywidag" />
                </div>
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 lg:-ml-8">
                <div className="flex flex-col items-center md:items-start space-y-5">
                  <div
                    className="text-body-16 md:text-body-18 lg:text-body-20 text-center md:text-left html-link"
                    dangerouslySetInnerHTML={{
                      __html: aboutSection.description.childMarkdownRemark.html
                    }}
                  />
                  <Link
                    to={`/${aboutSection.button.url}`}
                    className="hidden lg:flex items-center text-primary font-bold text-body-20 hover:underline"
                  >
                    {aboutSection.button.name}
                    <img className="ml-2.5 mt-1" src={arrow} alt="Arrow icon" />
                  </Link>
                  <div className="lg:hidden">
                    <Button
                      kind="secondary"
                      linkTo={`/${aboutSection.button.url}`}
                    >
                      {aboutSection.button.name}
                      <img
                        className="ml-2.5 mt-1"
                        src={arrow}
                        alt="Arrow icon"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-10 md:mb-14 lg:mb-28">
        <div className="container grid-layout">
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col gap-y-5 md:gap-y-10 lg:gap-y-12">
            {aboutSection.aboutItems.map((item: any) => (
              <div className="grid-layout items-start" key={item.title}>
                <div className="col-span-4 lg:col-start-2 flex items-center space-x-3 md:space-x-6">
                  <img
                    className="flex-shrink-0 w-6 h-6"
                    src={bullet}
                    alt="bullet icon"
                  />
                  <p className="text-subtitle-24 font-bold">{item.title}</p>
                </div>
                <div className="col-span-4 lg:col-span-6 lg:-ml-8 mt-5 md:mt-0 lg:col-start-7">
                  <div
                    className="text-body-16 md:text-body-18 html-link"
                    dangerouslySetInnerHTML={{
                      __html: item.description.childMarkdownRemark.html
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="grid-layout items-start lg:-mt-10">
              <div className="col-span-4 lg:col-start-2 flex items-center space-x-3 md:space-x-6" />
              <div className="col-span-4 lg:col-span-6 lg:-ml-8 mt-5 lg:mt-2.5 lg:col-start-7">
                <div className="flex flex-col items-center md:items-start">
                  <div>
                    <Button
                      kind="secondary"
                      linkTo={`/${aboutSection.buttonFind.url}`}
                      className="text-center"
                    >
                      {aboutSection.buttonFind.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-primary text-white py-10">
        <div className="container flex flex-col gap-y-5">
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center">
              <p className="text-title-4 md:title-3 lg:text-title-2 font-bold text-center md:text-left w-full">
                {increaseSection.title}
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center">
            <div
              className="subtitle-16 md:text-subtitle-18 lg:text-subtitle-24 text-center
                md:text-left w-full text-center html-link brands"
              dangerouslySetInnerHTML={{
                __html: increaseSection.description.childMarkdownRemark.html
              }}
            />
          </div>
        </div>
      </section>
      {productPage.productsRender.length ? (
        <ProductsBanner
          className="hidden md:block"
          productsRender={productPage.productsRender}
          renderImage={productPage.renderImage}
          productsPageSlug={productPage.slug}
          fullPageWidth
        />
      ) : null}

      <section className="my-10 md:my-14 lg:my-28">
        <div className="container">
          <div className="flex flex-col items-center w-full">
            <SectionTitle>{structureSection.title}</SectionTitle>
            <div
              className="text-center text-body-16 lg:text-body-18 mt-2.5 md:mt-5 max-w-[700px] html-link"
              dangerouslySetInnerHTML={{
                __html: structureSection.description.childMarkdownRemark.html
              }}
            />
            <div className="mt-5 md:mt-8">
              <Button
                isExternal
                paddingClass="px-4 md:px-20 lg:px-32"
                linkTo={`/${structureSection.button.url}`}
              >
                {structureSection.button.name}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-navy text-white pb-6">
        <div className="container flex flex-col pt-10 md:pt-14 lg:pt-24 mb-10 md:mb-14 lg:mb-24">
          <div className="flex flex-col items-center">
            <SectionTitle>{uniqueSection.title}</SectionTitle>
          </div>
          <div className="md:mx-6 lg:mx-0 mt-5 md:mt-8 lg:mt-10">
            <div className="flex flex-col lg:flex-row flex-wrap gap-5 md:gap-8 justify-center">
              {uniqueSection.uniqueItems.map((item: any) => (
                <div
                  className="w-full lg:w-1/3 lg:max-w-[375px] text-center"
                  key={item.title}
                >
                  <h3 className="text-subtitle-20 md:text-subtitle-24 font-bold">
                    {item.title}
                  </h3>
                  <div
                    className="text-body-16 md:text-body-20 mt-2.5 html-link"
                    dangerouslySetInnerHTML={{
                      __html: item.description.childMarkdownRemark.html
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 md:my-14 lg:my-28">
        <div className="container grid-layout items-center">
          <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-8 md:order-2">
            <div className="flex flex-col items-center">
              <SectionTitle>{everywhereSection.title}</SectionTitle>
              <div
                className="text-center text-body-16 lg:text-body-18 mt-2.5 md:mt-5 html-link"
                dangerouslySetInnerHTML={{
                  __html: everywhereSection.description.childMarkdownRemark.html
                }}
              />
            </div>
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-6 md:order-1 md:pr-10 lg:pr-0 lg:-mr-8 mt-5 md:mt-0">
            <div className="flex flex-col">
              <div className="flex">
                {everywhereSection.images && everywhereSection.images[0] && (
                  <div
                    className="hidden md:block rounded overflow-hidden h-28 md:h-36 lg:h-96 md:w-1/3 lg:w-auto md:mr-5
                      lg:mr-8"
                  >
                    <GatsbyImage
                      className="w-full h-full object-cover object-center"
                      image={everywhereSection.images[0].gatsbyImageData}
                      alt={everywhereSection.images[0].title}
                    />
                  </div>
                )}
                {everywhereSection.images && everywhereSection.images[1] && (
                  <div className="rounded overflow-hidden h-28 md:h-36 lg:h-56 w-full md:w-2/3 lg:w-auto">
                    <GatsbyImage
                      className="w-full h-full object-cover object-center"
                      image={everywhereSection.images[1].gatsbyImageData}
                      alt={everywhereSection.images[1].title}
                    />
                  </div>
                )}
              </div>
              <div className="flex mt-5 lg:-mt-32">
                {everywhereSection.images && everywhereSection.images[2] && (
                  <div
                    className="rounded overflow-hidden flex-1 md:flex-auto h-28 md:h-36 lg:h-56 md:w-2/3 lg:w-auto
                      mr-5 lg:mr-8 lg:mt-auto"
                  >
                    <GatsbyImage
                      className="w-full h-full object-cover object-center"
                      image={everywhereSection.images[2].gatsbyImageData}
                      alt={everywhereSection.images[2].title}
                    />
                  </div>
                )}
                {everywhereSection.images && everywhereSection.images[3] && (
                  <div className="rounded overflow-hidden flex-1 md:flex-auto h-28 md:h-36 lg:h-96 md:w-1/3 lg:w-auto">
                    <GatsbyImage
                      className="w-full h-full object-cover object-center"
                      image={everywhereSection.images[3].gatsbyImageData}
                      alt={everywhereSection.images[3].title}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactSection contact={contact.nodes[0]} regions={currentRegion[0]} />
      <div className="hidden">{`Build: ${(process.env.GITHUB_SHA ?? '').slice(0, 5)}`}</div>
    </Layout>
  );
};

export default IndexPage;

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
        heroBanner {
          title
          description {
            description
          }
          video {
            url
          }
          button {
            name
            url
          }
        }
        aboutSection {
          description {
            childMarkdownRemark {
              html
            }
          }
          button {
            url
            name
          }
          buttonFind {
            name
            url
          }
          aboutItems {
            title
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
        increaseSection {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
        }
        structureSection {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          button {
            url
            name
          }
        }
        uniqueSection {
          title
          uniqueItems {
            title
            description {
              childMarkdownRemark {
                html
              }
            }
          }
        }
        everywhereSection {
          title
          description {
            childMarkdownRemark {
              html
            }
          }
          images {
            title
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    productPage: allContentfulProductPage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        slug
        renderImage {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        productsRender {
          name
          labelRender
          slug
          subcategory {
            slug
            category {
              slug
            }
          }
        }
      }
    }
    regions: allContentfulRegionSection(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        variant
        description {
          description
        }
        regions {
          name
          phone
          mobilePhone
          email
          countries
        }
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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
