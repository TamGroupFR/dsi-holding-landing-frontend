import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { PageProps, graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import Layout from '../components/Layout/Layout';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { CategoriesProps } from '../interfaces/category.interface';
import { DownloadProps } from '../interfaces/download.interface';
import { FooterProps } from '../interfaces/footer.interfaces';
import { NavigationProps } from '../interfaces/navigation.interface';
import { RichText } from '../types/pages';

const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children) => {
      return <p className="text-body-16 mt-2 mb-8">{children}</p>;
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 className="mt-12 mb-7 text-title-5 md:text-title-4 lg:text-title-3">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return <h3 className="mt-10 mb-5 text-title-5">{children}</h3>;
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul className="list-disc pl-4 mb-8">{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return <li className="reset-child">{children}</li>;
    },
    [INLINES.HYPERLINK]: ({ data }: { data: any }, children) => {
      const { uri } = data || {};
      return (
        <a className="hover:underline" href={uri}>
          {children}
        </a>
      );
    },
  },
};

interface DocumentPageData {
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
  navigation: NavigationProps;
  footer: FooterProps;
  contentfulPolicyPage: {
    title: string;
    content: RichText;
  };
  contentfulPolicyDownloadSection: {
    title: string;
    links: {
      name: string;
      url: string;
    }[];
  };
}

const DocumentPage = ({ data }: PageProps<DocumentPageData>) => {
  const {
    contentfulPolicyPage,
    contentfulPolicyDownloadSection,
    categories: { nodes },
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
  } = data;
  const { title, content } = contentfulPolicyPage;
  const { title: downloadSectionTitle, links } = contentfulPolicyDownloadSection;
  const downloads = downloadsNodes;

  return (
    <Layout
      darkNavbar
      allowBack
      backLink="/"
      tabTitle={title}
      navigation={navigation}
      categories={nodes}
      footer={footer}
      downloads={downloads}
    >
      <div className="pt-28 md:pt-36 md:-mt-2">
        <main className="container grid-layout py-24">
          <div className="col-span-4 md:col-span-6 lg:col-span-8 md:col-start-2 lg:col-start-3">
            <article>
              <SectionTitle>{title}</SectionTitle>

              <div className="mt-5 md:mt-10 lg:mt-16">{renderRichText(content, richTextOptions)}</div>
            </article>

            <div className="mt-10 md:mt-12 lg:mt-16">
              <div className="hidden md:block">
                <SectionTitle besideIcon>{downloadSectionTitle}</SectionTitle>
              </div>

              <div className="md:hidden">
                <SectionTitle>{downloadSectionTitle}</SectionTitle>
              </div>

              <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 mt-8">
                {links.map(({ name, url }: any) => (
                  <a
                    className="flex items-center text-body-16 md:text-body-18 lg:text-body-20 font-medium text-blue hover:underline"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    key={name}
                  >
                    {name}
                    <RiArrowRightLine className="ml-2.5" />
                  </a>
                ))}
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
    contentfulPolicyPage(node_locale: { eq: $language }, slug: { eq: $slug }) {
      title
      content {
        raw
      }
    }

    contentfulPolicyDownloadSection(node_locale: { eq: $language }) {
      title
      links {
        name
        url
      }
    }
  }
`;
