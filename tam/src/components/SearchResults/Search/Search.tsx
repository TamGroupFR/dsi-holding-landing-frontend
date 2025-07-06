import React from 'react';
import { navigate } from 'gatsby';
import Close from '../../../assets/icon/close.svg';
import { SearchResult } from '../../Navbar/Navbar';
import { NavigationProps } from '../../../interfaces/navigation.interface';
import useSearchHandler from '../../../hooks/useSearchHandler';
import useAlgoliaSearch from '../../../hooks/useAlgoliaSearch';
import useLanguage from '../../../hooks/useLanguage';

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  searchResults: SearchResult[];
  navigation: NavigationProps;
}

const Search = ({
  searchValue,
  setSearchValue,
  placeholder,
  setSearchResults,
  searchResults,
  navigation,
}: SearchProps) => {
  const language = useLanguage();
  const index = useAlgoliaSearch(language);
  const handleSearch = useSearchHandler(index, setSearchResults, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 2) {
      handleSearch(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Enter' || e.keyCode === 13) &&
      searchResults &&
      searchResults.length > 0
    ) {
      sessionStorage.setItem('search-value', searchValue);
      navigate(`/${navigation.seeAllResults.url}`);
    }
  };

  const handleClick = () => {
    setSearchValue('');
  };

  return (
    <div className="flex items-center w-full bg-white h-8 md:h-10 relative bottom-2 rounded-r -top-1 md:-top-2">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full px-4 focus:outline-0 outline-none
        font-normal text-black placeholder:text-black rounded-l"
        value={searchValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!searchValue}
        className={`mr-2 transition-opacity ${
          searchValue ? 'opacity-1' : 'opacity-0'
        } `}
      >
        <Close />
      </button>
    </div>
  );
};

export default Search;
