import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/Layout/Layout';
import Sidebar from '../components/Sidebar/Sidebar';
import AllProducts from '../components/AllProducts/AllProducts';
import CategoryCards from '../components/CategoryCards/CategoryCards';
import {
  CategoriesProps,
  SubcategoryProps
} from '../interfaces/category.interface';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import Downloads from '../components/Downloads/Downloads';
import Header from '../components/Header/Header';
import ProductCards from '../components/ProductCards/ProductCards';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent';
import ProductNav from '../components/ProductNav/ProductNav';
import { DataProductsProps } from '../interfaces/products.interface';
import ProductIndex from '../components/ProductIndex/ProductIndex';

const ProductsPage = ({ data }: PageProps<DataProductsProps>) => {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [subcategoryName, setSubcategoryName] = useState<string | null>(null);
  const [subsubcategoryName, setSubsubcategoryName] = useState<string | null>(
    null
  );
  const {
    categories: { nodes },
    products: { nodes: productsNodes },
    productsPage,
    navigation,
    footer,
    downloads: { nodes: downloadsNodes }
  } = data;
  const categories = nodes;
  const products = productsNodes;
  const {
    icon,
    title,
    slug,
    url,
    buttonSubcategories,
    productsIndex,
    buttonBackToTop,
    homeLink,
    buttonBack,
    selectRange,
    buttonShowAll,
    buttonDownload
  } = productsPage;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1240;
  const currentCategory = categories.filter(
    (category: CategoriesProps) => category.slug === categoryName
  );
  const currentSubcategory = currentCategory[0]?.subcategories?.filter(
    (item: SubcategoryProps) => item.slug === subcategoryName
  );
  const currentSubSubcategory = currentSubcategory
    ? currentSubcategory[0]?.subcategories?.filter(
        (item: SubcategoryProps) => item.slug === subsubcategoryName
      )
    : undefined;
  const isSubsubcategory =
    currentSubcategory && currentSubcategory[0]?.subcategories;
  const isActiveSubcategory = isSubsubcategory
    ? subsubcategoryName !== null
    : subcategoryName !== null;
  const isProductIdx = categoryName === productsIndex.url;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProducts = products.filter(
    (product: { subcategory: { slug: string } }) => {
      if (subsubcategoryName) {
        return product.subcategory.slug === subsubcategoryName;
      }
      return product.subcategory.slug === subcategoryName;
    }
  );
  const productsPerPage = isMobile ? 8 : 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const rederTitle = () => {
    if (
      subsubcategoryName &&
      currentSubSubcategory &&
      currentSubSubcategory[0]
    ) {
      return currentSubSubcategory[0].name;
    }
    if (subcategoryName && currentSubcategory && currentSubcategory[0]) {
      return currentSubcategory[0].name;
    }
    if (categoryName && !isProductIdx && currentCategory[0]) {
      return currentCategory[0].name;
    }
    if (categoryName && isProductIdx) {
      return productsIndex.name;
    }
    return title;
  };
  const header = <Header title={rederTitle()} icon={icon} />;
  const downloads =
    currentSubcategory && currentSubcategory.length > 0
      ? currentSubcategory[0] &&
        currentSubcategory[0].subcategories &&
        currentSubcategory[0].subcategories
          .map((item) => item.downloads)
          .flat()
          .filter((n) => n)
      : currentCategory &&
        currentCategory[0] &&
        currentCategory[0].subcategories &&
        currentCategory[0].subcategories
          .map((item) => item.downloads)
          .flat()
          .filter((n) => n);

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle="products"
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloadsNodes}
      darkNavbar
    >
      <div className="pb-20 px-4 md:px-6 pt-36 md:pt-32 lg:pt-36">
        <div className="pb-10 md:pb-16 lg:pb-24">
          <section className="flex lg:px-0 lg:container w-full">
            <ProductNav
              isMobile={isMobile}
              slug={slug}
              links={categories}
              homeLink={homeLink.name}
              allProducts={{ name: title, slug, url }}
              productIndex={productsIndex}
              setCategoryName={setCategoryName}
              setSubcategoryName={setSubcategoryName}
              setSubsubcategoryName={setSubsubcategoryName}
              buttonBack={buttonBack}
              isProducts
              isActiveSubcategory={isActiveSubcategory || isProductIdx}
              name={title}
              icon={icon}
            />
          </section>
          <section className="flex lg:px-0 lg:container w-full">
            {((isProductIdx && !isTablet) || !isProductIdx) && (
              <Sidebar
                links={categories}
                title={title}
                productsIndex={productsIndex}
                link={slug}
                categoryName={categoryName}
                visibility={isActiveSubcategory && isMobile}
                mobile={isMobile}
                setCategoryName={setCategoryName}
                setSubcategoryName={setSubcategoryName}
                nameSubcategory={subcategoryName}
                setSubsubcategoryName={setSubsubcategoryName}
              />
            )}
            {!isProductIdx && !subcategoryName && (
              <div className="hidden md:block flex-1 ml-6 w-full">
                {header}
                {!categoryName && (
                  <AllProducts
                    categories={categories}
                    button={buttonSubcategories.name}
                    mainLink={slug}
                  />
                )}
                {categoryName && (
                  <>
                    <CategoryCards categories={currentCategory[0]} />
                    {!isTablet && downloads && downloads.length > 0 && (
                      <div className="mt-12">
                        <Downloads
                          downloads={downloads}
                          title={buttonDownload.name}
                          button={buttonDownload.name}
                          icon={productsPage.icon}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            {isProductIdx && (
              <div className="flex-1 md:ml-6 w-full">
                {header}
                <ProductIndex
                  showAll={buttonShowAll.name}
                  select={selectRange}
                  products={products}
                  allProducts={slug}
                  categories={categories}
                />
              </div>
            )}
            {!isProductIdx && subcategoryName && !isSubsubcategory && (
              <div className="flex-1 md:ml-6 w-full">
                {header}
                <ProductCards products={currentProducts} slug={slug} />
              </div>
            )}
            {!isProductIdx &&
              subcategoryName &&
              isSubsubcategory &&
              subsubcategoryName && (
                <div className="flex-1 md:ml-6 w-full">
                  {header}
                  <ProductCards
                    products={currentProducts}
                    slug={slug}
                    subcategoryName={subcategoryName}
                    categoryName={categoryName}
                  />
                </div>
              )}
            {!isProductIdx &&
              subcategoryName &&
              isSubsubcategory &&
              !subsubcategoryName && (
                <div className="hidden md:block flex-1 md:ml-6 w-full">
                  {header}
                  <CategoryCards categories={currentSubcategory[0]} />
                  {!isTablet && downloads && downloads.length > 0 && (
                    <div className="mt-12">
                      <Downloads
                        downloads={downloads}
                        title={buttonDownload.name}
                        button={buttonDownload.name}
                        icon={productsPage.icon}
                      />
                    </div>
                  )}
                </div>
              )}
          </section>
          {!isProductIdx &&
            categoryName &&
            !subsubcategoryName &&
            isTablet &&
            !isMobile &&
            downloads &&
            downloads.length > 0 && (
              <section className="flex lg:px-0 lg:container w-full">
                <div className="mt-20 w-full">
                  <Downloads
                    downloads={downloads}
                    title={buttonDownload.name}
                    button={buttonDownload.name}
                    icon={productsPage.icon}
                    fourCols
                  />
                </div>
              </section>
            )}
          {!isProductIdx && subcategoryName && totalPages > 1 && (
            <section className="flex justify-center lg:px-0 lg:container w-full">
              <div className="flex justify-center md:ml-72">
                <PaginationComponent
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </section>
          )}
          <section className="flex justify-end mt-12 lg:px-0 lg:container">
            <ScrollToTop button={buttonBackToTop.name} />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

export const query = graphql`
  query ($language: String!) {
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
    productsPage: contentfulProductsPage(node_locale: { eq: $language }) {
      title
      url
      slug
      selectRange
      buttonShowAll {
        name
        url
      }
      buttonSubcategories {
        name
      }
      buttonBackToTop {
        name
      }
      buttonBack {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      productsIndex {
        name
        url
      }
      homeLink {
        name
      }
      buttonDownload {
        name
        icon {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
      }
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
    }
    products: allContentfulProduct(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
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
    }
    categories: allContentfulCategory(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
        name
        slug
        sortOrder
        image {
          title
          gatsbyImageData(placeholder: BLURRED)
        }
        subcategories {
          slug
          name
          image {
            title
            gatsbyImageData(placeholder: BLURRED)
          }
          download {
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
          subcategories {
            name
            slug
            image {
              title
              gatsbyImageData(placeholder: BLURRED)
            }
            download {
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
