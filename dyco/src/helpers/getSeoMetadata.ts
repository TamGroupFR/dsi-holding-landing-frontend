import { GlobalSeoData, PageSeoData } from '../interfaces/seo.interface';

// As page SEO data is optional, we need to check if it exists before using it
// If it does not exist, the page data (e.g. header) is used
// If that is not declared, the global SEO data is used

export const getSeoMetadata = (
  globalSeoData: GlobalSeoData,
  pageSeoData?: PageSeoData,
  pageContentData?: PageSeoData,
) => {
  const globalSeo = globalSeoData?.nodes[0].seo;

  const seo = {
    title: pageSeoData?.title || pageContentData?.title || globalSeo?.title,
    description: pageSeoData?.description || pageContentData?.description || globalSeo?.description,
    image: pageSeoData?.image || pageContentData?.image || globalSeo?.image,
  };

  return seo;
};
