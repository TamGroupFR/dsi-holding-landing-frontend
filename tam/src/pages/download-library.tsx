import React, { useState } from 'react';
import { graphql, PageProps } from 'gatsby';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Layout from '../components/Layout/Layout';
import Header from '../components/Header/Header';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent';
import DownloadIcon from '../assets/icon/download.svg';
import ShareIcon from '../assets/icon/share.svg';
import { CategoriesProps } from '../interfaces/category.interface';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { FooterProps } from '../interfaces/footer.interfaces';
import { NavigationProps } from '../interfaces/navigation.interface';
import { ImageProps } from '../interfaces/products.interface';
import { DownloadProps } from '../interfaces/download.interface';

interface File {
  id: string;
  title: string;
  slug: string;
  file: {
    url: string;
  };
}

interface TabData {
  title: string;
  id: string;
  files: File[];
}

interface DownloadData {
  title: string;
  slug: string;
  icon: ImageProps;
  tabs: TabData[];
  downloadButtonText: string;
  shareButtonText: string;
  columnNameText: string;
}

interface DownloadLibraryData {
  navigation: NavigationProps;
  footer: FooterProps;
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
  downloadData: DownloadData;
}

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  activeTab: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, activeTab, id, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={activeTab !== id}
      id={`simple-tabpanel-${id}`}
      aria-labelledby={`simple-tab-${id}`}
      {...other}
    >
      {activeTab === id && <div>{children}</div>}
    </div>
  );
};

const ITEMS_PER_PAGE = 20;

const ShareButton = ({ url, title, buttonText }: { url: string; title: string; buttonText: string }) => {
  const handleShare = async () => {
    const shareData = {
      title,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        const desktopShareUrl = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(
          shareData.url
        )}`;
        window.location.href = desktopShareUrl;
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button type="button" onClick={handleShare} className="flex items-center hover:text-blue-500 fill-current">
      <ShareIcon className="mr-2.5 mb-0.5" />
      <span className="hidden md:block">{buttonText}</span>
    </button>
  );
};

const DownloadLibrary = ({ data }: PageProps<DownloadLibraryData>) => {
  const {
    categories: { nodes },
    navigation,
    footer,
    downloads: { nodes: downloadsNodes },
    downloadData: { title, slug, tabs, icon, shareButtonText, downloadButtonText, columnNameText },
  } = data;
  const downloads = downloadsNodes;
  const categories = nodes;
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || ({} as TabData);
  const totalPages = Math.ceil(activeTabData.files.length / ITEMS_PER_PAGE);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedFiles = (files: File[]) =>
    [...files].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

  return (
    <Layout
      allowBack
      backLink="/"
      tabTitle="Download Library"
      navigation={navigation}
      categories={categories}
      footer={footer}
      downloads={downloads}
      darkNavbar
    >
      <div className="pb-24 px-4 md:px-6 pt-32 md:pt-36 lg:pt-40">
        <div className="pb-10 md:pb-16 lg:pb-24">
          <section className="flex lg:px-0 lg:container">
            <Breadcrumbs homeLink={navigation.home} link={{ name: title, url: slug }} />
          </section>
          <section className="lg:px-0 lg:container">
            <Header title={title} icon={icon} />
            <Tabs
              value={activeTab}
              onChange={handleChange}
              className="border-b border-gray-100  md:w-1/2"
              TabIndicatorProps={{
                sx: {
                  backgroundColor: 'black',
                },
              }}
            >
              {tabs.map(({ title: tabTitle, id }) => (
                <Tab
                  label={tabTitle}
                  value={id}
                  sx={{
                    '&.Mui-selected': {
                      textTransform: 'none',
                      color: 'black',
                    },
                    textTransform: 'none',
                    color: 'black',
                  }}
                />
              ))}
            </Tabs>
            <button type="button" onClick={toggleSortOrder} className="font-bold ml-4 md:ml-8 mb-2 mt-6">
              {columnNameText}
              &nbsp;
              <span className="text-body-12 ">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            </button>
            {tabs.map(({ id, files }) => {
              const sortedFilesData = sortedFiles(files);
              const paginatedFiles = sortedFilesData.slice(startIndex, endIndex);

              return (
                <TabPanel activeTab={activeTab} id={id}>
                  {paginatedFiles.map(({ title: fileTitle, id: fileId, file: { url }, slug: fileSlug }) => (
                    <div
                      className="flex items-between justify-between  even:bg-white odd:bg-gray-100 px-4 py-2 text-body-16"
                      key={fileSlug}
                    >
                      <div>{fileTitle}</div>
                      <div className="flex items-center gap-4  md:gap-10">
                        <a
                          href={url}
                          target="_blank"
                          download={fileTitle}
                          className="flex items-center hover:text-blue-500 fill-current"
                          rel="noreferrer"
                        >
                          <DownloadIcon className="md:mr-2.5 mb-0.5" />
                          <span className="hidden md:block">{downloadButtonText}</span>
                        </a>
                        <ShareButton url={url} title={fileTitle} buttonText={shareButtonText} />
                      </div>
                    </div>
                  ))}
                </TabPanel>
              );
            })}

            {totalPages > 1 && (
              <section className="flex justify-center lg:px-0 lg:container">
                <div className="flex justify-center">
                  <PaginationComponent
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </section>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DownloadLibrary;

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
    categories: allContentfulCategory(
      filter: { node_locale: { eq: $language } }
      sort: { fields: [sortOrder, name], order: [ASC, ASC] }
    ) {
      nodes {
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
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    downloads: allContentfulDownload(filter: { node_locale: { eq: $language } }) {
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
    downloadData: contentfulDownloadLibrary(node_locale: { eq: $language }) {
      title
      slug
      icon {
        gatsbyImageData(placeholder: BLURRED)
        title
      }
      tabs {
        title
        id
        files {
          title
          id
          file {
            url
          }
        }
      }
      downloadButtonText
      shareButtonText
      columnNameText
    }
  }
`;
