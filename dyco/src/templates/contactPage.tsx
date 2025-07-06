import { graphql, PageProps } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';
import ContactSection from '../components/ContactSection/ContactSection';
import Layout from '../components/Layout/Layout';
import { getRegion } from '../helpers/getRegion';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { ContactDataProps } from '../interfaces/contact.interface';
import { PageSeoData } from '../interfaces/seo.interface';

const Contact = ({ data }: PageProps<ContactDataProps>) => {
  const {
    navigation,
    navigationMobile,
    contact,
    regions,
    footer,
    homepage: globalSeoData,
  } = data;
  const { title: pageTitle, description, seo } = contact.nodes[0];
  const i18next = useI18next();
  const currentRegion = getRegion(regions, i18next.language);

  const pageData: PageSeoData = {
    title: pageTitle,
    description,
  };

  return (
    <Layout
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, seo, pageData)}
    >
      <div className="bg-navy pb-10 pt-24 md:py-16 lg:py-24">
        <ContactSection contact={contact.nodes[0]} regions={currentRegion[0]} />
      </div>
    </Layout>
  );
};

export default Contact;

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
        nip
        regon
        krs
        seedCapital
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
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
