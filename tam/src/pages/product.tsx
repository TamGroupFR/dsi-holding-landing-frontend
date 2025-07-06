import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';
import Layout from '../components/Layout/Layout';
import Downloads from '../components/Downloads/Downloads';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { goToSection } from '../helpers/goToSection';
import { options } from '../helpers/richTextOptions';
import ProductNav from '../components/ProductNav/ProductNav';
import {
  DataProductsProps,
  ImageProps,
  SubcategoryProps,
} from '../interfaces/products.interface';
import { findObjectBySubsubcategoryName } from '../helpers/findObjectBySubsubcategoryName';
import Product from '../components/ProductCards/Product';
import CategoryCard from '../components/CategoryCards/CategoryCard';

const ProductPage = ({ data }: PageProps<DataProductsProps>) => {
  const {
    product,
    productsPage,
    categories: { nodes },
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
  } = data;
  const {
    description,
    gallery,
    name,
    slug: productSlug,
    quickFds,
    video,
    downloads,
    relatedProducts,
    relatedSubcategory,
  } = product;
  const {
    buttonVideo,
    buttonFds,
    buttonDownloads,
    buttonDownload,
    subtitles,
    title,
    slug,
    buttonBack,
    url,
    buttonShowMore,
  } = productsPage;
  const categories = nodes;
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [subcategoryName, setSubcategoryName] = useState<string | null>(null);
  const [subsubcategoryName, setSubsubcategoryName] = useState<string | null>(
    null
  );
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1240;
  const [mainImage, setMainImage] = useState(
    gallery && gallery.images ? gallery.images[0] : null
  );
  const changeImage = (image: ImageProps) => () => setMainImage(image);
  const buttons = [
    ...(downloads && downloads.length > 0
      ? [{ button: buttonDownloads, link: buttonDownloads.name }]
      : []),
    ...(video ? [{ button: buttonVideo, link: buttonVideo.name }] : []),
    ...(quickFds ? [{ button: buttonFds, link: quickFds }] : []),
  ];

  const header = (
    <>
      <Header title={name} icon={productsPage.icon} />
      <div className="flex gap-2 flex-wrap">
        {buttons.map(({ button, link }) => {
          return button.name === buttonFds.name ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="bg-dark-navy text-white text-body-12 lg:text-paragraph-14 px-2.5 py-2 rounded h-[40px] flex gap-1 items-center"
            >
              {button.name}
              <GatsbyImage
                image={button.icon.gatsbyImageData}
                alt={button.name}
                className="max-h-8 max-w-8"
              />
            </a>
          ) : (
            <button
              type="button"
              className="bg-dark-navy text-white text-body-12 lg:text-paragraph-14 px-2.5 py-2 rounded h-[40px] flex gap-1 items-center"
              onClick={goToSection(button.name)}
            >
              <GatsbyImage
                image={button.icon.gatsbyImageData}
                alt={button.name}
                className="max-h-8 max-w-8"
              />
              <span className="block">{button.name}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  const [visibleProducts, setVisibleProducts] = useState(8);
  const handleSeeMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };
  const [visibleSubcategory, setVisibleSubcategory] = useState(8);
  const handleSeeMoreSubcategory = () => {
    setVisibleSubcategory(visibleSubcategory + 8);
  };

  const getLink = (namelink: string, subcategory: SubcategoryProps) => {
    if (subcategory.category === null) {
      const relatedCategory = findObjectBySubsubcategoryName(
        categories,
        subcategory.name
      );
      return `/${slug}/${relatedCategory?.category}/${relatedCategory?.subcategory}/${relatedCategory?.subsubcategory?.slug}/${namelink}`;
    }

    return `/${slug}/${subcategory.category[0].slug}/${subcategory.slug}/${namelink}`;
  };

  const relatedSection = (
    headerName: string,
    listElements: React.ReactElement
  ) => (
    <section className="lg:px-0 lg:container flex justify-end mt-12">
      <div className="flex flex-col w-full">
        <Header title={headerName} icon={productsPage.icon} />
        <div className="flex flex-col w-full">{listElements}</div>
      </div>
    </section>
  );

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle={name}
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloadsNodes}
      darkNavbar
    >
      <div className="pb-24 px-4 md:px-6 pt-40 md:pt-32 lg:pt-36">
        <div className="pb-10 md:pb-16 lg:pb-24">
          <section className="lg:px-0 lg:container flex">
            <ProductNav
              links={categories}
              homeLink={productsPage.homeLink.name}
              allProducts={{ name: title, slug, url }}
              productIndex={productsPage.productsIndex}
              product={{ name, slug: productSlug }}
              slug={slug}
              setCategoryName={setCategoryName}
              setSubcategoryName={setSubcategoryName}
              isMobile={isMobile}
              buttonBack={buttonBack}
              setSubsubcategoryName={setSubsubcategoryName}
              isProducts={false}
              isActiveSubcategory
            />
          </section>
          <section className="lg:px-0 lg:container mb-6 flex justify-between flex-col md:hidden lg:flex lg:flex-row">
            {header}
          </section>
          <section className="lg:px-0 lg:container flex gap-6">
            <div className="hidden md:flex lg:hidden">
              <Sidebar
                links={categories}
                title={title}
                productsIndex={productsPage.productsIndex}
                link={slug}
                categoryName={categoryName}
                visibility={false}
                mobile={isTablet}
                setCategoryName={setCategoryName}
                setSubcategoryName={setSubcategoryName}
                nameSubcategory={subcategoryName}
                setSubsubcategoryName={setSubsubcategoryName}
              />
            </div>
            <div className="flex gap-6 flex-col lg:flex-row w-full md:w-4/6 lg:w-full ">
              <div className="hidden md:flex lg:hidden flex-col">{header}</div>
              <div className="flex w-full lg:w-5/12">
                <div className="flex flex-col w-full md:flex-row lg:flex-col md:gap-6">
                  {mainImage && (
                    <div className="w-full h-[286px] md:h-[326px] lg:h-[485px] border-light-gray border rounded p-2 lg:p-4">
                      <GatsbyImage
                        image={mainImage.gatsbyImageData}
                        alt={mainImage.title}
                        className="w-full object-contain h-full"
                        objectFit="contain"
                        objectPosition="50% 50%"
                      />
                    </div>
                  )}
                  {gallery && gallery.images && gallery.images.length > 1 && (
                    <div className="flex flex-col">
                      <div className="flex gap-2.5 mt-8 md:mt-0 lg:mt-2 flex-wrap flex-start">
                        {gallery.images.map((image: ImageProps) => (
                          <button
                            type="button"
                            className="border-light-gray border rounded h-[84px] w-[84px] md:h-[96px] md:w-[96px] lg:h-[104px] lg:w-[104px] p-2"
                            onClick={changeImage(image)}
                          >
                            <GatsbyImage
                              image={image.gatsbyImageData}
                              alt={image.title}
                              className="w-full object-contain h-full"
                              objectFit="contain"
                              objectPosition="50% 50%"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-7/12 list">
                {renderRichText(description, options)}
              </div>
            </div>
          </section>
          {downloads && downloads.length > 0 && (
            <section
              className="lg:px-0 lg:container flex mt-16 w-full"
              id={buttonDownloads.name}
            >
              <Downloads
                downloads={downloads}
                title={subtitles[0]}
                button={buttonDownload.name}
                icon={productsPage.icon}
                fourCols
              />
            </section>
          )}
          {video && (
            <section
              className="lg:px-0 lg:container flex justify-end md:justify-start mt-12"
              id={buttonVideo.name}
            >
              <div className="flex flex-col w-full  md:w-2/3">
                <Header title={subtitles[1]} icon={productsPage.icon} />
                <div className="w-full h-[300px] md:h-[400px] md:h-[450px]">
                  <iframe
                    src={video.link}
                    title={video.name}
                    className="w-full h-full object-cover object-center"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          )}
          {relatedProducts &&
            relatedSection(
              subtitles[2],
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0">
                  {relatedProducts
                    .slice(0, visibleProducts)
                    .map(
                      ({
                        name: relatedProductName,
                        slug: slugProduct,
                        subcategory,
                        gallery: relatedProductGallery,
                      }) => (
                        <Product
                          link={getLink(slugProduct, subcategory)}
                          name={relatedProductName}
                          gallery={relatedProductGallery}
                          slug={slugProduct}
                        />
                      )
                    )}
                </div>
                {relatedProducts.length > visibleProducts && (
                  <button
                    type="button"
                    onClick={handleSeeMoreProducts}
                    className="text-body-16 underline p-3 mx-auto mt-10"
                  >
                    {buttonShowMore.name}
                  </button>
                )}
              </>
            )}
          {relatedSubcategory &&
            relatedSection(
              subtitles[3],
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0">
                  {relatedSubcategory
                    .slice(0, visibleSubcategory)
                    .map(
                      ({
                        name: relatedSubcategoryName,
                        slug: relatedSubcategorySlug,
                        image,
                      }) => (
                        <CategoryCard
                          name={relatedSubcategoryName}
                          slug={relatedSubcategorySlug}
                          image={image}
                        />
                      )
                    )}
                </div>
                {relatedSubcategory.length > visibleSubcategory && (
                  <button
                    type="button"
                    onClick={handleSeeMoreSubcategory}
                    className="text-body-16 underline p-3 mx-auto mt-10"
                  >
                    {buttonShowMore.name}
                  </button>
                )}
              </>
            )}
          <section className="lg:px-0 lg:container flex justify-end mt-12">
            <ScrollToTop button={productsPage.buttonBackToTop.name} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

export const query = graphql`
  query ($language: String!, $slug: String) {
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
    product: contentfulProduct(
      node_locale: { eq: $language }
      slug: { eq: $slug }
    ) {
      slug
      name
      quickFds
      video {
        name
        slug
        link
      }
      downloads {
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
      relatedProducts {
        slug
        name
        gallery {
          images {
            gatsbyImageData(placeholder: BLURRED)
            title
          }
        }
        subcategory {
          name
          slug
          category {
            name
            slug
          }
        }
      }
      subcategory {
        name
        slug
        category {
          name
          slug
        }
      }
      gallery {
        images {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      description {
        raw
      }
      relatedSubcategory {
        name
        slug
        image {
          gatsbyImageData
          title
        }
      }
    }
    productsPage: contentfulProductsPage(node_locale: { eq: $language }) {
      buttonBackToTop {
        name
      }
      homeLink {
        name
      }
      productsIndex {
        name
        url
      }
      title
      slug
      url
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
      subtitles
      buttonDownload {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      buttonDownloads {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      buttonVideo {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      buttonFds {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      buttonBack {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      buttonShowMore {
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
  }
`;
