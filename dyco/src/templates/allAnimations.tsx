import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { AnimationsPageProps } from '../interfaces/animation.interface';
import { PageSeoData } from '../interfaces/seo.interface';

const Animations = ({ data }: PageProps<AnimationsPageProps>) => {
  const {
    navigation,
    navigationMobile,
    footer,
    animationsPage: { nodes: animationsPageNodes },
    homepage: globalSeoData,
  } = data;

  const { title, animations, seo } = animationsPageNodes[0];

  const pageData: PageSeoData = {
    title,
  };

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
      <div className="py-32">
        <section className="container">
          <Breadcrumbs homeLink="home" />
        </section>
        <section className="container">
          <Header title={title} icon />
        </section>
        <section className="container">
          {animations.length
            && animations.map(({ name, link }) => (
              <div className="mb-[84px]" key={name}>
                <h2 className="border-t border-light-gray text-title-5 py-[16px] bold">
                  {name}
                </h2>
                <div className="h-[200px] md:h-[450px] lg:h-[660px]">
                  <iframe
                    src={link}
                    title={name}
                    className="w-full h-full object-cover object-center"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
        </section>
      </div>
    </Layout>
  );
};

export default Animations;

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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    animationsPage: allContentfulAnimationsPage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        animations {
          name
          link
        }
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
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
      }
    }
  }
`;
