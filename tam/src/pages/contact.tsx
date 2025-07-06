import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import DepartmentsMap from '../components/DepartmentsMap/DepartmentsMap';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import { DataContactProps } from '../interfaces/contact.interface';

const Contact = ({ data }: PageProps<DataContactProps>) => {
  const {
    categories: { nodes },
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
    contact,
  } = data;
  const categories = nodes;
  const downloads = downloadsNodes;
  const { title, slug, departmentsList, departmentsMapLegendText, icon } = contact;

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle="contact"
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
      darkNavbar
    >
      <div className="bg-dark-navy pt-32 md:pt-36 lg:pt-40">
        <section className="flex lg:px-0 lg:container ml-4 md:ml-10">
          <Breadcrumbs homeLink={navigation.home} link={{ name: title, url: slug }} white />
        </section>
        <section className="flex lg:px-0 lg:container md:justify-center lg:justify-start ml-4 md:ml-0">
          <Header title={title} icon={icon} white />
        </section>
        <div className="md:container">
          <div className="bg-navy text-white overflow-hidden">
            <div className="col-span-4 md:col-span-8 lg:col-span-12">
              <DepartmentsMap departments={departmentsList} legendText={departmentsMapLegendText} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

export const query = graphql`
  query ($language: String!, $id: String) {
    navigation: contentfulNavigation(node_locale: { eq: $language }) {
      home
      types
      links {
        name
        url
      }
      mobileLinks {
        name
        url
      }
      seeAllResults {
        name
        url
      }
      searchProducts
      productsIndex {
        name
        url
      }
      noResults
      getInTouch {
        url
        name
      }
      allProducts {
        url
        name
      }
    }
    footer: contentfulFooter(node_locale: { eq: $language }) {
      call
      company
      companyLinks {
        name
        url
      }
      careersLink {
        name
        url
      }
      contact
      copyrights
      email
      languages
      termsLinks {
        name
        url
      }
    }
    categories: allContentfulCategory(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
        name
        slug
        sortOrder
        subcategories {
          slug
          name
          subcategories {
            name
            slug
          }
        }
      }
    }
    downloads: allContentfulDownload(filter: { node_locale: { eq: $language } }) {
      nodes {
        id
        title
        slug
        updatedAt
        file {
          size
          url
        }
        thumbnail {
          file {
            url
          }
        }
      }
    }
    contact: contentfulContactPage(node_locale: { eq: $language }) {
      title
      slug
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
      departmentsList {
        name
        addresLine1
        addresLine2
        phoneNumber
        email
      }
      departmentsMapLegendText
    }
    contactInfo: contentfulContactSection(id: { eq: $id }, node_locale: { eq: $language }) {
      title
      titleHighlightedWord
      email
      phoneNumber
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
