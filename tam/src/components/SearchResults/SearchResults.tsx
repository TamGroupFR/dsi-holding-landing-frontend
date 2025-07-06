import React from 'react';
import { Link, navigate } from 'gatsby';
import { NavigationProps } from '../../interfaces/navigation.interface';
import { SearchResult } from '../Navbar/Navbar';
import { CategoriesProps } from '../../interfaces/category.interface';
import { findObjectBySubsubcategoryName } from '../../helpers/findObjectBySubsubcategoryName';
import { SubcategoryProps } from '../../interfaces/products.interface';
import { DownloadProps } from '../../interfaces/download.interface';

enum TypesVariant {
  product = 'product',
  catalog = 'catalog',
  category = 'category',
}

interface SearchResultsProps {
  navigation: NavigationProps;
  searchResults: SearchResult[];
  mobile?: boolean;
  allproductsLink: string;
  categories: CategoriesProps[];
  searchValue: string;
  downloads: DownloadProps[];
}

const SearchResults = ({
  navigation,
  searchResults,
  mobile,
  categories,
  allproductsLink,
  searchValue,
  downloads,
}: SearchResultsProps) => {
  const getLink = (
    type: string,
    namelink: string,
    subcategory?: SubcategoryProps
  ) => {
    const getProductLink = () => {
      if (subcategory) {
        if (subcategory.category === null) {
          const category = findObjectBySubsubcategoryName(
            categories,
            subcategory.name
          );
          return `/${allproductsLink}/${category?.category}/${category?.subcategory}/${category?.subsubcategory?.slug}/${namelink}`;
        }
        return `/${allproductsLink}/${subcategory.category[0].slug}/${subcategory.slug}/${namelink}`;
      }
      return '/';
    };

    const getCatalogLink = downloads.filter(
      (download) => download.slug === namelink
    );

    switch (type) {
      case TypesVariant.catalog:
        return getCatalogLink && getCatalogLink[0] && getCatalogLink[0].file
          ? getCatalogLink[0].file.url
          : '/';
      case TypesVariant.category:
        return `/${allproductsLink}/${namelink}`;
      case TypesVariant.product:
        return getProductLink();
      default:
        return '/';
    }
  };

  const setSearchResults = (link: string) => () => {
    sessionStorage.setItem('search-value', searchValue);
    navigate(`/${link}`);
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case TypesVariant.catalog:
        return navigation.types[0];
      case TypesVariant.category:
        return navigation.types[2];
      case TypesVariant.product:
        return navigation.types[1];
      default:
        return '';
    }
  };

  return searchResults.length > 0 ? (
    <>
      {searchResults.map(
        ({ name, type, title, slug, subcategory, objectID }, index) => {
          return index < (mobile ? 8 : 6) ? (
            <div
              key={objectID}
              className="border-t py-2 first:border-t-0 font-normal"
            >
              {type === 'catalog' ? (
                <a
                  href={getLink(type, slug, subcategory)}
                  download={title}
                  target="blank"
                >
                  <button
                    type="button"
                    className="text-black w-full inline-block text-body-14 text-left"
                  >
                    {name || title}
                    {type && (
                      <span className="text-gray-500">{` - ${getTypeName(
                        type
                      )}`}</span>
                    )}
                  </button>
                </a>
              ) : (
                <Link
                  to={getLink(type, slug, subcategory)}
                  className="text-black w-full inline-block text-body-14"
                  key={objectID}
                >
                  {name || title}
                  {type && (
                    <span className="text-gray-500">{` - ${getTypeName(
                      type
                    )}`}</span>
                  )}
                </Link>
              )}
            </div>
          ) : null;
        }
      )}
      {searchResults && (
        <div className="w-full flex justify-center py-2.5 max-h-10 mb-2">
          <button
            type="button"
            onClick={setSearchResults(navigation.seeAllResults.url)}
            className="underline font-normal text-body-14"
          >
            {navigation.seeAllResults.name}
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="border-t py-2.5 first:border-t-0 font-normal max-h-10 text-black text-body-16">
      <p className="text-center">{navigation.noResults}</p>
    </div>
  );
};

export default SearchResults;
