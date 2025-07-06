import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import BrandTile from '../components/BrandTile/BrandTile';
import Layout from '../components/Layout/Layout';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import { Brand } from '../sections/ProductsRangeSection/ProductsRangeSection';
import { RichText } from '../types/pages';
import { NavigationProps } from '../interfaces/navigation.interface';
import { CategoriesProps } from '../interfaces/category.interface';
import { FooterProps } from '../interfaces/footer.interfaces';
import { DownloadProps } from '../interfaces/download.interface';
import MediaRenderer from '../components/MediaRenderer/MediaRenderer';

const whoAreWeSectionTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <p className="text-body-16 text-center lg:text-left md:text-body-18 lg:text-body-20 text-blue font-medium">
        {text}
      </p>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-body-16 text-center lg:text-left md:text-body-18 lg:text-body-20">{children}</p>
    ),
  },
};

interface ContentfulAboutPage {
  whoAreWeSectionTitle: string;
  whoAreWeText: RichText;
  logo: {
    file: {
      url: string;
      contentType: string;
    };
    title: string;
  };
  brandsSectionTitle: string;
  brandsText: RichText;
  brandsList: Brand[];
  missionSectionTitle: string;
  missionSectionSubtitle: string;
  missionText: RichText;
  visionSectionTitle: string;
  visionSectionSubtitle: string;
  visionText: RichText;
}

interface AboutPageData {
  footer: FooterProps;
  contentfulAboutPage: ContentfulAboutPage;
  navigation: NavigationProps;
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
}

const AboutPage = ({ data }: PageProps<AboutPageData>) => {
  const {
    contentfulAboutPage,
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
    categories: { nodes },
  } = data;
  const { t } = useTranslation();
  const categories = nodes;
  const downloads = downloadsNodes;

  const {
    whoAreWeSectionTitle,
    whoAreWeText,
    logo,
    brandsSectionTitle,
    brandsList,
    brandsText,
    missionSectionTitle,
    missionSectionSubtitle,
    missionText,
    visionSectionTitle,
    visionSectionSubtitle,
    visionText,
  } = contentfulAboutPage;

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle={t('common.aboutUs')}
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
      darkNavbar
    >
      <div className="pb-10 pt-36 md:pb-16 md:pt-44 lg:pb-24 lg:pt-44">
        <section className="container grid-layout">
          <div className="flex items-center col-span-4 lg:col-span-4 md:col-start-3 lg:col-start-auto px-6 lg:px-0 lg:pl-6 order-1 lg:order-2">
            <MediaRenderer
              file={logo.file}
              alt={logo.title}
              fallbackMediaPath="/img/logo-tam-black.svg"
              loop
              className="w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-2 md:-mx-6 lg:mx-0 mt-10 md:mt-16 lg:mt-0 order-2 lg:order-1">
            <div className="hidden lg:block">
              <SectionTitle besideIcon>{whoAreWeSectionTitle}</SectionTitle>
            </div>

            <div className="lg:hidden">
              <SectionTitle>{whoAreWeSectionTitle}</SectionTitle>
            </div>

            <div className="flex flex-col space-y-2.5 md:space-y-5 mt-2.5 md:mt-5">
              {renderRichText(whoAreWeText, whoAreWeSectionTextOptions)}
            </div>
          </div>
        </section>

        <section className="container grid-layout mt-10 md:mt-16 lg:mt-24">
          <div className="flex items-center col-span-4 md:col-span-6 md:col-start-2 md:-mx-6 lg:mx-0">
            <div>
              <div className="hidden lg:block">
                <SectionTitle besideIcon>{brandsSectionTitle}</SectionTitle>
              </div>

              <div className="lg:hidden">
                <SectionTitle>{brandsSectionTitle}</SectionTitle>
              </div>

              <div className="text-body-16 text-center lg:text-left md:text-body-18 lg:text-body-20 mt-2.5 md:mt-5">
                {renderRichText(brandsText)}
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-6 lg:col-span-4 md:col-start-2 lg:pl-14 mt-5 md:mt-10 lg:mt-0">
            <div className="flex items-center justify-center flex-wrap -m-2 md:-m-7 lg:-m-2">
              {brandsList.map(({ logo: { file, title } }) => (
                <div key={title} className="w-1/2 md:w-1/3 lg:w-1/2 p-2 md:p-7 lg:p-2">
                  <BrandTile title={title} img={file.url} disableHoverExpand />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="py-10 md:py-14 lg:py-24 bg-dark-navy text-white">
        <section className="container grid-layout">
          <div className="col-span-4 md:col-span-6 lg:col-span-9 md:col-start-2 lg:col-start-2 md:-mx-6 lg:mx-0">
            <div className="hidden lg:block">
              <SectionTitle besideIcon textAlignClass="text-center lg:text-left">
                {missionSectionTitle}
              </SectionTitle>
              <p className="text-subtitle-18 md:text-subtitle-20 lg:text-subtitle-24 font-bold mt-5">
                {missionSectionSubtitle}
              </p>
            </div>

            <div className="lg:hidden">
              <SectionTitle>{t('about.numberOneTitle')}</SectionTitle>
              <p className="text-subtitle-18 md:text-subtitle-20 lg:text-subtitle-24 font-bold text-center mt-2.5 max-w-sm mx-auto">
                {missionSectionSubtitle}
              </p>
            </div>

            <div className="text-body-16 text-center lg:text-left md:text-body-18 lg:text-body-20 mt-5 lg:mt-8">
              {renderRichText(missionText)}
            </div>
          </div>
        </section>

        <section className="container grid-layout mt-10 md:mt-14 lg:mt-28">
          <div className="col-span-4 md:col-span-6 lg:col-span-9 md:col-start-2 lg:col-start-2 md:-mx-6 lg:mx-0">
            <div className="hidden lg:block">
              <SectionTitle besideIcon>{visionSectionTitle}</SectionTitle>
              <p className="text-subtitle-18 md:text-subtitle-20 lg:text-subtitle-24 font-bold mt-5">
                {visionSectionSubtitle}
              </p>
            </div>

            <div className="lg:hidden">
              <SectionTitle>{visionSectionTitle}</SectionTitle>
              <p className="text-subtitle-18 md:text-subtitle-20 lg:text-subtitle-24 font-bold text-center mt-2.5 max-w-sm mx-auto">
                {visionSectionSubtitle}
              </p>
            </div>

            <div className="flex flex-col space-y-2.5 md:space-y-5 mt-5 lg:mt-8 text-body-16 text-center lg:text-left md:text-body-18 lg:text-body-20">
              {renderRichText(visionText)}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }

    contentfulAboutPage(id: { eq: $id }, node_locale: { eq: $language }) {
      whoAreWeSectionTitle
      whoAreWeText {
        raw
      }
      logo {
        file {
          url
          contentType
        }
        title
      }
      brandsSectionTitle

      brandsText {
        raw
      }
      brandsList {
        logo {
          file {
            url
          }
          title
        }
      }
      missionSectionTitle
      missionSectionSubtitle
      missionText {
        raw
      }
      visionSectionTitle
      visionSectionSubtitle
      visionText {
        raw
      }
    }
  }
`;
