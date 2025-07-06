import React, { FC, useEffect, useState } from 'react';
import { Helmet } from 'gatsby-plugin-react-i18next';
import { graphql, useStaticQuery } from 'gatsby';
import { useCookie, useWindowScroll } from 'react-use';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../Footer/Footer';
import MobileMenu from '../MobileMenu/MobileMenu';
import Navbar, { NavbarState } from '../Navbar/Navbar';
import CookiesBanner from '../CookiesBanner/CookiesBanner';
import favicon from '../../assets/img/favicon.png';
import MobileSearchResults from '../MobileSearchResults/MobileSearchResults';
import { NavigationProps } from '../../interfaces/navigation.interface';
import { CategoriesProps } from '../../interfaces/category.interface';
import { FooterProps } from '../../interfaces/footer.interfaces';
import { DownloadProps } from '../../interfaces/download.interface';

interface Props {
  allowBack?: boolean;
  backLink?: string;
  darkNavbar?: boolean;
  tabTitle?: string;
  navigation: NavigationProps;
  categories: CategoriesProps[];
  footer: FooterProps;
  downloads: DownloadProps[];
}

const Layout: FC<Props> = ({
  children,
  allowBack = false,
  backLink = '',
  darkNavbar = false,
  tabTitle,
  navigation,
  categories,
  footer,
  downloads,
}) => {
  const windowScroll = useWindowScroll();
  const [cookiesAccepted, updateCookiesAccepted] = useCookie('cookies-accepted');

  const [navbarState, setNavbarState] = useState<NavbarState>('default');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [lastScrollYPos, setLastScrollYPos] = useState<number>(0);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (windowScroll.y > 40 && windowScroll.y > lastScrollYPos) {
      setNavbarState('hidden');
      setSearchOpen(false);
    } else if (windowScroll.y < lastScrollYPos) {
      setNavbarState('scroll');
    }

    if (windowScroll.y === 0) {
      setNavbarState('default');
    }

    setLastScrollYPos(windowScroll.y);
  }, [windowScroll]);

  const handleAcceptCookies = () => {
    updateCookiesAccepted('true');
  };

  const handleRejectCookies = () => {
    updateCookiesAccepted('false');
  };

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
    }
  `);

  const downloadLibraryLink = navigation.links.filter((item) =>
    ['Download library', 'Télécharger'].includes(item.name)
  );

  return (
    <>
      <Helmet>
        <body className={`${isMobileMenuOpen || isSearchOpenMobile ? 'overflow-hidden' : ''}`} />
        <title>{tabTitle ? `${siteMetadata.title} | ${tabTitle}` : siteMetadata.title}</title>
        <meta name="description" content={siteMetadata.description} />
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>

      <MobileMenu isOpen={isMobileMenuOpen} navigation={navigation} />
      <MobileSearchResults
        isOpen={isSearchOpenMobile}
        setIsOpen={setIsSearchOpenMobile}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        navigation={navigation}
        categories={categories}
        allproductsLink={navigation.allProducts.url}
        downloads={downloads}
      />
      <Navbar
        state={navbarState}
        allowBack={allowBack}
        backLink={backLink}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDark={darkNavbar}
        siteMetadata={siteMetadata}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchOpenMobile={isSearchOpenMobile}
        setIsSearchOpenMobile={setIsSearchOpenMobile}
        navigation={navigation}
        categories={categories}
        allproductsLink={navigation.allProducts.url}
        downloads={downloads}
      />

      {children}

      <Footer footer={footer} />

      <AnimatePresence>
        {cookiesAccepted === null && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-0 left-0 w-full max-w-3xl"
          >
            <CookiesBanner onAccept={handleAcceptCookies} onReject={handleRejectCookies} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
