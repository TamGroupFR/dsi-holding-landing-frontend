import { PageProps, graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Layout from "../components/Layout/Layout";
import PaginationComponent from "../components/PaginationComponent/PaginationComponent";
import ProductCards from "../components/ProductCards/ProductCards";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ProductIndex from "../components/ProductIndex/ProductIndex";
import ProductNav from "../components/ProductNav/ProductNav";
import ProductsBanner from "../components/ProductsBanner/ProductsBanner";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Sidebar from "../components/Sidebar/Sidebar";
import SubCategoryCards from "../components/SubCategoryCards/SubCategoryCards";
import { getSeoMetadata } from "../helpers/getSeoMetadata";
import {
  CategoriesProps,
  SubcategoryProps,
} from "../interfaces/category.interface";
import {
  AllProductsPageProps,
  ProductProps,
} from "../interfaces/products.interface";
import { PageSeoData } from "../interfaces/seo.interface";

const ProductsPage = ({ data }: PageProps<AllProductsPageProps>) => {
  const {
    navigation,
    navigationMobile,
    footer,
    categories: { nodes },
    products: { nodes: productNodes },
    productPage: { nodes: productPageNodes },
    homepage: globalSeoData,
  } = data;

  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [subcategoryName, setSubcategoryName] = useState<string | null>(null);
  const [productName, setProductName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  const categories = nodes;
  const products = productNodes;
  const productPage = productPageNodes[0];
  const homeLink = navigation.nodes[0].buttonHome;
  const isTablet = typeof window !== "undefined" && window.innerWidth < 1240;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const currentCategory = categories.filter(
    (category: CategoriesProps) => category.slug === categoryName
  );
  const currentSubcategory = currentCategory[0]?.subcategories?.filter(
    (item: SubcategoryProps) => item.slug === subcategoryName
  );
  const currentProduct = products.filter(
    (product: ProductProps) =>
      product.slug.replace(/ß/g, "ss").replace(/%C3%9F/g, "ss") ===
      productName?.replace(/ß/g, "ss").replace(/%C3%9F/g, "ss")
  );

  const isActiveSubcategory = subcategoryName !== null;

  const isProductIdx = categoryName === productPage.productsIndex.url;
  const filteredProducts = products.filter(
    (product: { subcategory: { slug: string } }) => {
      return product.subcategory.slug === subcategoryName;
    }
  );
  const productsPerPage = isMobile ? 8 : 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const renderTitle = () => {
    if (
      subcategoryName &&
      currentSubcategory &&
      currentProduct &&
      currentProduct[0]
    ) {
      return currentProduct[0].name;
    }
    if (subcategoryName && currentSubcategory && currentSubcategory[0]) {
      return currentSubcategory[0].name;
    }
    if (categoryName && !isProductIdx && currentCategory[0]) {
      return currentCategory[0].name;
    }
    if (categoryName && isProductIdx) {
      return productPage.productsIndex.name;
    }
    return productPage.title;
  };

  useEffect(() => {
    if (productName) {
      return setIsScrollTopVisible(true);
    }
    if (isProductIdx) {
      return setIsScrollTopVisible(true);
    }
    if (subcategoryName && currentProducts.length > 5) {
      return setIsScrollTopVisible(true);
    }
    if (currentCategory[0]?.subcategories.length > 5) {
      return setIsScrollTopVisible(true);
    }
    return setIsScrollTopVisible(false);
  }, [isProductIdx, currentCategory, subcategoryName, currentProducts]);

  const header = <Header title={renderTitle()} icon />;

  const pageData: PageSeoData = {
    title: renderTitle(),
    description: productPage.productsIndex.name,
    image: getImage(productPage.renderImage.gatsbyImageData),
  };

  const productPageSeoData: PageSeoData = {
    ...productPage.seo,
    title:
      renderTitle() !== productPage.title
        ? renderTitle()
        : productPage.seo?.title,
  };

  return (
    <Layout
      allowBack
      backLink="/"
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, productPageSeoData, pageData)}
      darkNavbar
    >
      <div className="pb-20 px-4 md:px-6 pt-36 md:pt-32 lg:pt-36">
        <div>
          <section className="flex lg:px-0 lg:container w-full">
            <ProductNav
              isMobile={isMobile}
              slug={productPage.slug}
              links={categories}
              homeLink={homeLink}
              allProducts={{
                name: productPage.title,
                slug: productPage.slug,
                url: productPage.slug,
              }}
              productIndex={productPage.productsIndex}
              setCategoryName={setCategoryName}
              setSubcategoryName={setSubcategoryName}
              setProductName={setProductName}
              buttonBack={productPage.buttonBack}
              isProducts
              isActiveSubcategory={isActiveSubcategory || isProductIdx}
              name={productPage.title}
              product={currentProduct[0]}
            />
          </section>
          <section className="flex lg:px-0 lg:container w-full">
            {((isProductIdx && !isTablet) || !isProductIdx) && (
              <Sidebar
                links={categories}
                title={productPage.title}
                productsIndex={productPage.productsIndex}
                link={productPage.slug}
                categoryName={categoryName}
                visibility={isActiveSubcategory && isMobile}
                mobile={isMobile}
                setCategoryName={setCategoryName}
                setSubcategoryName={setSubcategoryName}
                nameSubcategory={subcategoryName}
              />
            )}
            {!isProductIdx && !subcategoryName && (
              <div className="hidden md:block flex-1 ml-6 w-full">
                {header}
                {!categoryName ? (
                  <ProductsBanner
                    productsRender={productPage.productsRender}
                    renderImage={productPage.renderImage}
                    productsPageSlug={productPage.slug}
                  />
                ) : (
                  <SubCategoryCards
                    subCategories={currentCategory[0].subcategories}
                    url={`/${productPage.slug}/${currentCategory[0].slug}`}
                  />
                )}
              </div>
            )}
            {isProductIdx && (
              <div className="flex-1 md:ml-6 w-full">
                {header}
                <ProductIndex
                  showAll={productPage.buttonShowAll}
                  select={productPage.selectRange}
                  products={products}
                  allProducts={productPage.slug}
                  categories={categories}
                />
              </div>
            )}
            {!isProductIdx && subcategoryName && !productName && (
              <div className="flex-1 md:ml-6 w-full">
                {header}
                <ProductCards
                  products={currentProducts}
                  slug={productPage.slug}
                />
              </div>
            )}
            {!isProductIdx && subcategoryName && productName && (
              <div className="flex-1 md:ml-6 w-full">
                <ProductDetails
                  product={currentProduct[0]}
                  productPage={productPage}
                />
              </div>
            )}
          </section>
          {!isProductIdx &&
            subcategoryName &&
            !productName &&
            totalPages > 1 && (
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
          {isScrollTopVisible && (
            <section className="flex justify-end mt-12 lg:px-0 lg:container">
              <ScrollToTop button={productPage.buttonBackToTop} />
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

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
    categories: allContentfulCategory(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
        name
        slug
        url
        sortOrder
        subcategories {
          name
          slug
          url
          image {
            title
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    products: allContentfulProduct(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
        slug
        name
        sortOrder
        gallery {
          images {
            gatsbyImageData(placeholder: BLURRED)
            title
          }
        }
        specification {
          mainDescription {
            raw
          }
          photos {
            gatsbyImageData(placeholder: BLURRED)
            title
          }
          accessories {
            title
            photos {
              gatsbyImageData(placeholder: BLURRED)
              title
            }
          }
          description {
            title
            description {
              raw
            }
            photos {
              gatsbyImageData(placeholder: BLURRED)
              title
            }
            descriptionSecondary {
              raw
            }
          }
          mainGallery {
            title
            gatsbyImageData(placeholder: BLURRED)
          }
          similarProducts {
            name
            slug
            subcategory {
              name
              slug
              category {
                slug
              }
            }
            gallery {
              images {
                gatsbyImageData(placeholder: BLURRED)
                title
              }
            }
            specification {
              mainGallery {
                title
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
        }
        instructions {
          mainDescription {
            raw
          }
          steps {
            name
            description {
              description
            }
            image {
              gatsbyImageData(placeholder: BLURRED)
              title
            }
          }
        }
        subcategory {
          name
          slug
          category {
            name
            slug
            url
          }
        }
        downloads {
          id
          slug
          title
          updatedAt
          file {
            size
            url
          }
        }
      }
    }
    productPage: allContentfulProductPage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        productTabs {
          name
        }
        title
        slug
        buttonBackToTop
        selectRange
        buttonShowAll
        buttonBack
        productsIndex {
          name
          url
        }
        similarProductsTitle
        buttonDownload
        buttonDownloads
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
