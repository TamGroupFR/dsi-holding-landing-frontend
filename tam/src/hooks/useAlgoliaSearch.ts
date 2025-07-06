import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { useMemo } from 'react';
import { LanguageVariant } from '../interfaces/language.interface';

const useAlgoliaSearch = (language: string | null): SearchIndex => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID!,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY!
  );

  const index = useMemo(() => {
    return language === LanguageVariant.fr
      ? searchClient.initIndex(process.env.GATSBY_ALGOLIA_INDEX_FR!)
      : searchClient.initIndex(process.env.GATSBY_ALGOLIA_INDEX_EN!);
  }, [language]);

  return index;
};

export default useAlgoliaSearch;
