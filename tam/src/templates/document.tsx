import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Redirect } from '@gatsbyjs/reach-router';
import { RiArrowRightLine } from 'react-icons/ri';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Layout from '../components/Layout/Layout';
import SectionTitle from '../components/SectionTitle/SectionTitle';

const DocumentPage = ({ data }: PageProps) => {
  const {
    document,
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
    categories: { nodes },
  } = data as any;
  const { t } = useTranslation();
  const categories = nodes;
  const downloads = downloadsNodes;

  if (!document) {
    return <Redirect to="/" />;
  }

  return (
    <Layout
      darkNavbar
      allowBack
      backLink="/"
      tabTitle={document.frontmatter.title}
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
    >
      <div className="pt-28 md:pt-36 md:-mt-2">
        <main className="container grid-layout py-24">
          <div className="col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
            <article>
              <SectionTitle>{document.frontmatter.title}</SectionTitle>

              <div className="mt-5 md:mt-10 lg:mt-16" dangerouslySetInnerHTML={{ __html: document.html }} />
            </article>

            <div className="mt-10 md:mt-12 lg:mt-16">
              <div className="hidden md:block">
                <SectionTitle besideIcon>{t('common.downloads')}</SectionTitle>
              </div>

              <div className="md:hidden">
                <SectionTitle>{t('common.downloads')}</SectionTitle>
              </div>

              <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 mt-8">
                <a
                  className="flex items-center text-body-16 md:text-body-18 lg:text-body-20 font-medium text-blue hover:underline"
                  href={document.frontmatter.downloadDataProtectionFile}
                  target="_blank"
                  rel="noreferrer"
                >
                  {document.frontmatter.downloadDataProtectionName}
                  <RiArrowRightLine className="ml-2.5" />
                </a>

                <a
                  className="flex items-center text-body-16 md:text-body-18 lg:text-body-20 font-medium text-blue hover:underline"
                  href={document.frontmatter.downloadTrackingPolicyFile}
                  target="_blank"
                  rel="noreferrer"
                >
                  {document.frontmatter.downloadTrackingPolicyName}
                  <RiArrowRightLine className="ml-2.5" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default DocumentPage;

export const query = graphql`
  query ($language: String!, $slug: String!) {
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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    document: markdownRemark(frontmatter: { slug: { eq: $slug }, lang: { eq: $language } }) {
      frontmatter {
        slug
        title
        downloadDataProtectionFile
        downloadDataProtectionName
        downloadTrackingPolicyFile
        downloadTrackingPolicyName
      }
      html
    }
  }
`;
