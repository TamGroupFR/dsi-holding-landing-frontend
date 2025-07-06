import React, { useCallback } from 'react';
import { SearchIndex } from 'algoliasearch/lite';
import { SearchResult } from '../components/Navbar/Navbar';
import { debounce } from '../helpers/debounce';

const useSearchHandler = (
  index: SearchIndex,
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>,
  delay: number
) => {
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      const { hits } = await index.search<SearchResult>(value);
      setSearchResults(hits);
    }, delay),
    [index, setSearchResults]
  );

  return debouncedSearch;
};

export default useSearchHandler;
