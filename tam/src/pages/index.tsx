import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next';
import { RiArrowRightUpLine, RiArrowRightLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Layout from '../components/Layout/Layout';
import Button from '../components/Button/Button';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import heroBgVideo from '../assets/video/bg-hero.mp4';
import ClientsSection from '../sections/ClientsSection/ClientsSection';
import { TestimonialData } from '../sections/TestimonialsSection/TestimonialsSection';
import LottieScrollTrigger from '../utils/LottieScrollTrigger/LottieScrollTrigger';
import tamLogoAnimData from '../assets/lottie/logo-tam.json';
import { Image, RichText } from '../types/pages';
import { NavigationProps } from '../interfaces/navigation.interface';
import { CategoriesProps } from '../interfaces/category.interface';
import { FooterProps } from '../interfaces/footer.interfaces';
import { DownloadProps } from '../interfaces/download.interface';
import { LinkProps } from '../interfaces/products.interface';

const HeroTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => <span className="text-primary">{text}</span>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="inline lg:block">{children}</p>
    )
  }
};

interface ContentfulHomePage {
  heroTitle: RichText;
  heroSubtitle: string;
  heroButton: LinkProps;
  aboutUsText: {
    aboutUsText: string;
  };
  aboutUsButton: LinkProps;
  blueBannerLeftColumn: string;
  blueBannerRightColumn: RichText;
  everywhereSectionTitle: string;
  everywhereSectionText: RichText;
  everywhereSectionImages: {
    url: string;
    title: string;
  }[];
  uniqueSectionTitle: string;
  uniqueList: {
    title: string;
    description: {
      description: string;
    };
  }[];
  testimonialsSectionTitle: string;
  //testimonialsList: TestimonialData[];
  clientsSectionTitle: string;
  clientsLogos: Image[];
}

interface HomePageData {
  footer: FooterProps;
  contentfulHomePage: ContentfulHomePage;
  navigation: NavigationProps;
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
}

const IndexPage = ({ data }: PageProps<HomePageData>) => {
  const {
    contentfulHomePage,
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
    categories: { nodes }
  } = data;
  const categories = nodes;
  const downloads = downloadsNodes;
  const {
    heroTitle,
    heroSubtitle,
    heroButton,
    aboutUsText: { aboutUsText },
    aboutUsButton,
    blueBannerLeftColumn,
    blueBannerRightColumn,
    everywhereSectionTitle,
    everywhereSectionText,
    everywhereSectionImages,
    uniqueSectionTitle,
    uniqueList,
    testimonialsSectionTitle,
    //testimonialsList,
    clientsSectionTitle,
    clientsLogos
  } = contentfulHomePage;

  const [first, second, third, fourth] = everywhereSectionImages;

  return (
    <Layout
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
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
          src={heroBgVideo}
        />

        <div className="container grid-layout">
          <div className="col-span-4 md:col-span-6 lg:col-span-10 md:col-start-2">
            <div className="flex flex-col md:items-start text-white">
              <h1 className="text-title-5 md:text-title-4 lg:text-title-hero font-black filter drop-shadow-heroTitle max-w-4xl">
                {renderRichText(heroTitle, HeroTextOptions)}
              </h1>

              <p className="mt-2 md:mt-8 mb-8 md:mb-12 text-body-14 md:text-body-18 font-medium max-w-xl">
                {heroSubtitle}
              </p>

              <Button
                paddingClass="px-4 md:px-20 lg:px-32"
                linkTo={heroButton.url}
              >
                {heroButton.name}
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
                  <LottieScrollTrigger
                    animationData={tamLogoAnimData}
                    className="transform"
                  />
                </div>
              </div>

              <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-140px' }}
                  transition={{ type: 'tween', duration: 2.5 }}
                  className="flex flex-col items-center md:items-start space-y-5"
                >
                  <p className="text-body-16 md:text-body-18 lg:text-body-20 text-center md:text-left">
                    {aboutUsText}
                  </p>
                  <Link
                    className="hidden lg:inline-flex items-center text-body-20 font-bold text-blue hover:underline"
                    to={`/${aboutUsButton.url}`}
                  >
                    {aboutUsButton.name}
                    <RiArrowRightLine className="ml-2.5" />
                  </Link>
                  <div className="lg:hidden">
                    <Button kind="secondary" linkTo={`/${aboutUsButton.url}`}>
                      {aboutUsButton.name}
                      <RiArrowRightUpLine className="ml-2.5" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue text-white pt-10 md:pt-16 lg:pt-11 pb-12 md:pb-16 lg:pb-11 bg-rect-sm md:bg-rect-md lg:bg-rect-lg bg-no-repeat bg-right-bottom md:bg-left-bottom lg:bg-right-bottom">
        <div className="container grid-layout gap-y-5">
          <div className="flex flex-col items-center col-span-4 lg:col-span-5 lg:col-start-2">
            <div className="flex items-center h-full">
              <p className="text-title-4 lg:text-title-2 font-bold text-center md:text-left w-full">
                {blueBannerLeftColumn}
              </p>
            </div>
          </div>

          <div className="flex col-span-4 lg:col-span-5 lg:col-start-7">
            <div className="flex flex-col items-center space-y-5 md:space-y-8 text-body-16 md:text-body-18 lg:text-body-20 text-center md:text-left w-full">
              {renderRichText(blueBannerRightColumn)}
            </div>
          </div>
        </div>
      </section>
      <section className="my-10 md:my-14 lg:my-28">
        <div className="container grid-layout items-center">
          <div className="col-span-4 md:col-span-6 lg:col-span-4 md:col-start-2 lg:col-start-8 lg:col-start-auto lg:order-2 lg:-mx-8">
            <div className="flex flex-col items-center">
              <SectionTitle>{everywhereSectionTitle}</SectionTitle>
              <div className="text-center text-body-16 lg:text-body-18 mt-2.5 md:mt-5 space-y-5">
                {renderRichText(everywhereSectionText)}
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-start-auto md:-mx-6 lg:-mx-0 lg:-mr-8 mt-5 md:mt-10 lg:mt-0 lg:order-1">
            <div className="flex flex-col">
              <div className="flex">
                <div className="hidden md:block rounded overflow-hidden h-28 md:h-36 lg:h-96 md:w-1/3 lg:w-auto md:mr-5 lg:mr-8">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={first.url}
                    alt=""
                  />
                </div>

                <div className="rounded overflow-hidden h-28 md:h-36 lg:h-56 w-full md:w-2/3 lg:w-auto">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={second.url}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex mt-5 lg:-mt-32">
                <div className="rounded overflow-hidden flex-1 md:flex-auto h-28 md:h-36 lg:h-56 md:w-2/3 lg:w-auto mr-5 lg:mr-8 lg:mt-auto">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={third.url}
                    alt=""
                  />
                </div>

                <div className="rounded overflow-hidden flex-1 md:flex-auto h-28 md:h-36 lg:h-96 md:w-1/3 lg:w-auto">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={fourth.url}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="container grid-layout pt-10 md:pt-14 lg:pt-24 pb-10 md:pb-14 lg:pb-24">
          <div className="col-span-4 lg:col-start-5 md:col-start-3 flex flex-col items-center">
            <SectionTitle>{uniqueSectionTitle}</SectionTitle>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-12 md:col-start-3 lg:col-start-1 md:-mx-6 lg:mx-0 mt-5 md:mt-8 lg:mt-10">
            <div className="grid-layout gap-y-5 md:gap-y-8">
              {uniqueList.map(({ title, description: { description } }) => (
                <div
                  className="col-span-4 md:col-span-8 lg:col-span-4 text-center"
                  key={title}
                >
                  <h3 className="text-subtitle-20 md:text-subtitle-24 font-bold">
                    {title}
                  </h3>
                  <p className="text-body-16 md:text-body-20 mt-2.5">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="bg-navy text-white py-5 md:py-8 lg:py-14">
        <div className="col-span-4 md:col-span-8 lg:col-span-12">
          <SectionTitle>{clientsSectionTitle}</SectionTitle>
        </div>
        <ClientsSection clients={clientsLogos} />
      </div>
    </Layout>
  );
};

export default IndexPage;

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
    downloads: allContentfulDownload(
      filter: { node_locale: { eq: $language } }
    ) {
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
    contentfulHomePage(id: { eq: $id }, node_locale: { eq: $language }) {
      heroTitle {
        raw
      }
      heroSubtitle
      heroButton {
        name
        url
      }
      aboutUsText {
        aboutUsText
      }
      aboutUsButton {
        name
        url
      }
      blueBannerLeftColumn
      blueBannerRightColumn {
        raw
      }
      everywhereSectionTitle
      everywhereSectionText {
        raw
      }
      everywhereSectionImages {
        url
        title
      }
      uniqueSectionTitle
      uniqueList {
        title
        description {
          description
        }
      }
      testimonialsSectionTitle
      #testimonialsList {
      #  review {
      #    review
      #  }
      #  companyPosition
      #  reviewerName
      #}
      clientsSectionTitle
      clientsLogos {
        url
        title
      }
    }
  }
`;
