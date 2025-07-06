import React, { useState } from 'react';
import Search from '../SearchResults/Search/Search';
import SearchResults from '../SearchResults/SearchResults';
import SearchIcon from '../../assets/icon/search.svg';
import { NavigationProps } from '../../interfaces/navigation.interface';
import { SearchResult } from '../Navbar/Navbar';
import { CategoriesProps } from '../../interfaces/category.interface';
import Close from '../../assets/icon/close.svg';
import { DownloadProps } from '../../interfaces/download.interface';

interface MobileSearchResultsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  navigation: NavigationProps;
  categories: CategoriesProps[];
  allproductsLink: string;
  downloads: DownloadProps[];
}

const MobileSearchResults = ({
  isOpen,
  setIsOpen,
  searchValue,
  setSearchValue,
  navigation,
  categories,
  allproductsLink,
  downloads,
}: MobileSearchResultsProps) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={`fixed top-1/4 inset-0 p-4 w-full h-full overflow-auto
      bg-white z-40 text-black transform transition-transform ${
        !isOpen && 'translate-y-full'
      }`}
    >
      <div className="w-full flex justify-end mb-4">
        <Close
          onClick={() => {
            setIsOpen(false);
            setSearchValue('');
          }}
        />
      </div>
      <div className="flex border py-2 text-black rounded max-h-10 relative w-full">
        <div className="mr-10 w-full">
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            placeholder={navigation.searchProducts}
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            navigation={navigation}
          />
        </div>

        <div className="bg-dark-navy p-2 max-h-10 rounded-r absolute -top-px right-0">
          <SearchIcon className="z-10 relative" />
        </div>
      </div>
      {searchValue.length > 2 && (
        <div className="mt-4">
          <SearchResults
            mobile
            navigation={navigation}
            searchResults={searchResults}
            categories={categories}
            allproductsLink={allproductsLink}
            searchValue={searchValue}
            downloads={downloads}
          />
        </div>
      )}
    </div>
  );
};

export default MobileSearchResults;
