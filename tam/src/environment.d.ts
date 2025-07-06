export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GATSBY_ALGOLIA_APP_ID: string;
      GATSBY_ALGOLIA_SEARCH_KEY: string;
      GATSBY_ALGOLIA_ADMIN_KEY: string;
      GATSBY_ALGOLIA_INDEX_FR: string;
      GATSBY_ALGOLIA_INDEX_EN: string;
    }
  }
}
