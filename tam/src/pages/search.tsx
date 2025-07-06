import { graphql, Link, PageProps } from 'gatsby';
import React, { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Layout from '../components/Layout/Layout';
import { SubcategoryProps } from '../interfaces/products.interface';
import { SearchResult } from '../components/Navbar/Navbar';
import { DataSearchProps, SearchVariant } from '../interfaces/search.interface';
import Header from '../components/Header/Header';
import categoryImage from '../assets/img/all-products-category.png';
import Icon from '../assets/icon/download.svg';
import Arrow from '../assets/icon/arrow.svg';
import { getDate } from '../helpers/getDate';
import { findObjectBySubsubcategoryName } from '../helpers/findObjectBySubsubcategoryName';
import { MenuProps, selectStyles } from '../helpers/select';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Product from '../components/ProductCards/Product';
import useLanguage from '../hooks/useLanguage';
import useAlgoliaSearch from '../hooks/useAlgoliaSearch';
import useSearchHandler from '../hooks/useSearchHandler';

const Search = ({ data }: PageProps<DataSearchProps>) => {
  const {
    categories: { nodes },
    products: { nodes: productsNodes },
    productsPage,
    navigation,
    footer,
    searchPage,
    downloads: { nodes: downloadsNodes },
  } = data;
  const categories = nodes;
  const products = productsNodes;
  const downloads = downloadsNodes;
  const { slug: allProductsSlug } = productsPage;
  const {
    buttonViewMore,
    resultsFound,
    searchResults: searchResultsText,
    sortResults,
    products: productsTitle,
    downloads: downloadTitle,
    download,
    categories: categoriesTitle,
    icon,
    filter,
    title,
    slug: mainSlug,
  } = searchPage;
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [value, setValue] = useState('');

  const language = useLanguage();
  const index = useAlgoliaSearch(language);
  const handleSearch = useSearchHandler(index, setSearchResults, 0);

  const searchValue =
    typeof window !== 'undefined' && sessionStorage.getItem('search-value');
  useEffect(() => {
    if (searchValue) {
      handleSearch(searchValue);
      setValue(searchValue);
    }
  }, [searchValue]);

  const { category, product, catalog } = SearchVariant;
  const searchedCategories = searchResults?.filter(
    (item) => item.type === category
  );
  const searchedProducts = searchResults?.filter(
    (item) => item.type === product
  );
  const searchedCatalogs = searchResults?.filter(
    (item) => item.type === catalog
  );

  const filteredCategories =
    searchedCategories &&
    categories.filter((categoryItem) =>
      searchedCategories.some((item) => item.slug === categoryItem.slug)
    );

  const filteredProducts =
    searchedProducts &&
    products.filter((productItem) =>
      searchedProducts.some((item) => item.slug === productItem.slug)
    );

  const filteredCatalogs =
    searchedCatalogs &&
    downloads.filter((downloadItem) =>
      searchedCatalogs.some((item) => item.slug === downloadItem.slug)
    );

  const [type, setType] = useState(filter[0]);
  const renderIcon = (style: string) => <Arrow className={style} />;
  const handleSelect = (event: SelectChangeEvent<typeof type>) => {
    const {
      target: { value: selectedValue },
    } = event;
    setType(selectedValue);
  };

  const [visibleProducts, setVisibleProducts] = useState(8);
  const [visibleCatalgos, setVisibleCatalgos] = useState(8);

  const handleSeeMoreProducts = () => {
    setVisibleProducts(visibleProducts + 8);
  };

  const handleSeeMoreCatalogs = () => {
    setVisibleCatalgos(visibleCatalgos + 8);
  };

  const getLink = (namelink: string, subcategory: SubcategoryProps) => {
    if (subcategory.category === null) {
      const categoryName = findObjectBySubsubcategoryName(
        categories,
        subcategory.name
      );
      return `/${allProductsSlug}/${categoryName?.category}/${categoryName?.subcategory}/${categoryName?.subsubcategory?.slug}/${namelink}`;
    }

    return `/${allProductsSlug}/${subcategory.category[0].slug}/${subcategory.slug}/${namelink}`;
  };

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle="search"
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
      darkNavbar
    >
      <div className="pb-20 px-4 md:px-6 pt-32 md:pt-36 lg:pt-40">
        <div className="pb-10 md:pb-16 lg:pb-24">
          <section className="flex lg:px-0 lg:container">
            <Breadcrumbs
              homeLink={navigation.home}
              link={{ name: title, url: mainSlug }}
            />
          </section>
          <section className="flex lg:px-0 lg:container">
            <div className="flex flex-col md:flex-row justify-between w-full mt-5">
              <div className="flex flex-col">
                <h1 className="text-title-4 md:text-title-3 font-bold md:mr-4">
                  {searchResultsText}: {value}
                </h1>
                <p className="text-subtitle-18">
                  {searchResults?.length} {resultsFound}
                </p>
              </div>
              <div className="flex flex-col mt-6 md:mt-0 ">
                <p className="text-body-12 mb-2">{sortResults}:</p>
                <div className="w-60 md:w-72">
                  <Select
                    IconComponent={({ className }) => renderIcon(className)}
                    displayEmpty
                    value={type}
                    onChange={handleSelect}
                    renderValue={(selected) => (
                      <span className="text-body-14 uppercase font-bold">
                        {selected}
                      </span>
                    )}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={selectStyles}
                    className="w-full border-dark-navy max-h-10"
                  >
                    {filter.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        className="uppercase text-body-14 py-3 max-h-10"
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </section>
          {filteredCategories && filteredCategories?.length > 0 && (
            <section className="flex flex-col lg:px-0 lg:container mt-12">
              <Header title={categoriesTitle} icon={icon} />
              <div className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0 ">
                  {filteredCategories
                    .sort((a, b) =>
                      type === filter[0]
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name)
                    )
                    .map(({ name, slug, id }) => (
                      <Link
                        to={`/${allProductsSlug}/${slug}`}
                        key={id}
                        className="max-w-[292px] flex flex-col"
                      >
                        <img src={categoryImage} alt={name} />
                        <h4 className="text-subtitle-16 lg:text-subtitle-18  p-4 lg:px-0 font-bold">
                          {name}
                        </h4>
                      </Link>
                    ))}
                </div>
              </div>
            </section>
          )}
          {filteredProducts && filteredProducts.length > 0 && (
            <section className="flex flex-col lg:px-0 lg:container mt-12">
              <Header title={productsTitle} icon={icon} />
              <div className="flex flex-col w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0">
                  {filteredProducts
                    .slice(0, visibleProducts)
                    .sort((a, b) =>
                      type === filter[0]
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name)
                    )
                    .map(({ name, gallery, subcategory, slug }) => (
                      <Product
                        link={getLink(slug, subcategory)}
                        gallery={gallery}
                        name={name}
                        slug={slug}
                        key={slug}
                      />
                    ))}
                </div>
                {filteredProducts.length > visibleProducts && (
                  <button
                    type="button"
                    onClick={handleSeeMoreProducts}
                    className="text-body-14 font-bold underline p-3 mt-2 w-40 mx-auto"
                  >
                    {buttonViewMore.name}
                  </button>
                )}
              </div>
            </section>
          )}
          {filteredCatalogs && filteredCatalogs.length > 0 && (
            <section className="flex flex-col lg:px-0 lg:container mt-12">
              <Header title={downloadTitle} icon={icon} />
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0">
                {filteredCatalogs
                  .slice(0, visibleCatalgos)
                  .sort((a, b) =>
                    type === filter[0]
                      ? a.title.localeCompare(b.title)
                      : b.title.localeCompare(a.title)
                  )
                  .map(({ title, file, updatedAt, thumbnail, id }) => (
                    <div
                      className="rounded-md border border-gray-100 bg-white py-6 px-4 max-w-[292px] flex flex-col justify-between"
                      key={id}
                    >
                      <div className="w-full flex">
                        <img
                          src={thumbnail.file.url}
                          alt={title}
                          className="w-1/2"
                        />
                      </div>
                      <h4 className="font-medium text-lg mt-4 truncate-lines-2">
                        {title}
                      </h4>
                      <p className="text-sm mt-3 border-b border-gray-100 pb-4 text-gray-500">
                        {getDate(updatedAt)}
                      </p>
                      <div className="mt-4 flex">
                        <a href={file.url} download={title} target="blank">
                          <button
                            type="button"
                            className="text-base flex font-bold"
                          >
                            <Icon className="mr-2" />
                            {download.name}
                          </button>
                        </a>
                        <span className="text-sm  ml-5">
                          {(file.size / 1000000).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
              {filteredCatalogs.length > visibleCatalgos && (
                <button
                  type="button"
                  onClick={handleSeeMoreCatalogs}
                  className="text-body-14 font-bold underline p-3 mt-2 w-40 mx-auto"
                >
                  {buttonViewMore.name}
                </button>
              )}
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const query = graphql`
  query ($language: String!) {
    searchPage: contentfulSearchPage(node_locale: { eq: $language }) {
      title
      slug
      sortResults
      searchResults
      resultsFound
      products
      downloads
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
      filter
      download {
        name
      }
      categories
      buttonViewMore {
        name
      }
    }
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
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
    }
    products: allContentfulProduct(filter: { node_locale: { eq: $language } }) {
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
        id
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
