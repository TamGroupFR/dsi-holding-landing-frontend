import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { graphql, PageProps } from 'gatsby';
import React, { useState } from 'react';
import downloadIcon from '../assets/icon/download.svg';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import PaginationComponent from '../components/PaginationComponent/PaginationComponent';
import ShareButton from '../components/ShareButton/ShareButton';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { DownloadLibraryData, File, TabData } from '../interfaces/download.interface';
import { PageSeoData } from '../interfaces/seo.interface';

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  activeTab: string;
}

const TabPanel = (props: TabPanelProps) => {
  const {
    children, activeTab, id, ...other
  } = props;

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

const DownloadLibrary = ({ data }: PageProps<DownloadLibraryData>) => {
  const {
    navigation,
    navigationMobile,
    footer,
    downloadsPage: { nodes: downloadsPageNodes },
    homepage: globalSeoData,
  } = data;
  const {
    title, tabs, shareButtonText, downloadButtonText, columnNameText, seo,
  } = downloadsPageNodes[0];

  const pageData: PageSeoData = {
    title,
  };

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || ({} as TabData);
  const totalPages = Math.ceil((activeTabData?.files?.length || 0) / ITEMS_PER_PAGE);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedFiles = (files: File[]) => [...files].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    }
    return b.title.localeCompare(a.title);
  });

  return (
    <Layout
      allowBack
      backLink="/"
      darkNavbar
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, seo, pageData)}
    >
      <div className="pb-24 px-4 md:px-6 pt-32 md:pt-36 lg:pt-40">
        <div className="pb-10 md:pb-16 lg:pb-24">
          <section className="flex lg:px-0 lg:container">
            <Breadcrumbs homeLink="home" />
          </section>
          <section className="lg:px-0 lg:container">
            <Header title={title} icon />
            <Tabs
              value={activeTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              className="border-b border-gray-100 "
              TabIndicatorProps={{
                sx: {
                  backgroundColor: '#C92836',
                },
              }}
            >
              {tabs.map(({ title: tabTitle, id }) => {
                return (
                  <Tab
                    key={id}
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
                );
              })}
            </Tabs>
            <button type="button" onClick={toggleSortOrder} className="font-bold ml-4 md:ml-8 mb-2 mt-6">
              {columnNameText}
              &nbsp;
              <span className="text-body-12 ">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            </button>
            {tabs.map(({ id, files }) => {
              if (!files) return null;
              const sortedFilesData = sortedFiles(files);
              const paginatedFiles = sortedFilesData.slice(startIndex, endIndex);
              return (
                <TabPanel key={id} activeTab={activeTab} id={id}>
                  {paginatedFiles.map(({
                    title: fileTitle, id: fileId, file: { url }, slug: fileSlug,
                  }) => (
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
                          <img src={downloadIcon} alt="download" className="md:mr-2.5 mb-0.5" />
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
    downloadsPage: allContentfulDownloadLibrary(filter: { node_locale: { eq: $language } }) {
      nodes {
        title
        downloadButtonText
        shareButtonText
        columnNameText
        tabs {
          title
          id
          files {
            title
            id
            slug
            file {
              url
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
