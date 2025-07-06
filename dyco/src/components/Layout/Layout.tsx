import { AnimatePresence, motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { Helmet } from 'gatsby-plugin-react-i18next';
import React, { FC, useEffect, useState } from 'react';
import { useLocalStorage, useWindowScroll } from 'react-use';
import favicon from '../../assets/img/favicon-dywidag.ico';
import { FooterProps } from '../../interfaces/footer.interface';
import {
  NavigationMobileProps,
  NavigationProps,
} from '../../interfaces/navigation.interface';
import { Seo } from '../../interfaces/seo.interface';
import CookiesBanner from '../CookiesBanner/CookiesBanner';
import Footer from '../Footer/Footer';
import MobileMenu from '../MobileMenu/MobileMenu';
import Navbar, { NavbarState } from '../Navbar/Navbar';

interface Props {
  allowBack?: boolean;
  backLink?: string;
  darkNavbar?: boolean;
  seo: Seo
  navigation: NavigationProps;
  navigationMobile: NavigationMobileProps;
  footer: FooterProps;
}

declare global {
  interface Window {
    dataLayer: { event: string }[];
  }
}

const Layout: FC<Props> = ({
  children,
  allowBack = false,
  backLink = '',
  darkNavbar = false,
  seo,
  navigation,
  navigationMobile,
  footer,
}) => {
  const windowScroll = useWindowScroll();
  const [cookieConsent, updateCookieConsent] = useLocalStorage('dywidag-cookies-consent');
  const [enhancedCookieConsent, updateEnhancedCookieConsent] = useLocalStorage('dywidag-cookies-enhanced-consent');
  const [navbarState, setNavbarState] = useState<NavbarState>('default');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [lastScrollYPos, setLastScrollYPos] = useState<number>(0);

  const seoImg = getImage(seo.image);

  useEffect(() => {
    if (windowScroll.y > 40 && windowScroll.y > lastScrollYPos) {
      setNavbarState('hidden');
    } else if (windowScroll.y < lastScrollYPos) {
      setNavbarState('scroll');
    }

    if (windowScroll.y === 0) {
      setNavbarState('default');
    }

    setLastScrollYPos(windowScroll.y);
  }, [windowScroll]);

  useEffect(() => {
    if (enhancedCookieConsent) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'consent_granted' });
    }
  }, [enhancedCookieConsent]);

  const handleAcceptCookies = () => {
    updateCookieConsent(true);
    updateEnhancedCookieConsent(true);
    window.location.reload();
  };

  const {
    site: { siteMetadata },
    contentfulManageCookiesPage,
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
      contentfulManageCookiesPage {
        popUpDescription {
          raw
        }
        popUpButton
        title
        slug
      }
    }
  `);

  const isCookieBannerVisible = !cookieConsent
    && typeof window !== 'undefined'
    && !window.location.href.includes(contentfulManageCookiesPage.slug);

  return (
    <>
      <Helmet>
        <body className={`${isMobileMenuOpen ? 'overflow-hidden' : ''}`} />
        <title>
          {seo?.title || siteMetadata.title}
        </title>
        <meta name="description" content={seo?.description} />
        <meta name="og:image" content={seoImg?.images.fallback?.src} />
        <link rel="icon" href={favicon} />
      </Helmet>
      <MobileMenu isOpen={isMobileMenuOpen} navigation={navigationMobile} />
      <Navbar
        state={navbarState}
        allowBack={allowBack}
        backLink={backLink}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDark={darkNavbar}
        siteMetadata={siteMetadata}
        navigation={navigation}
      />
      {children}
      <Footer siteMetadata={siteMetadata} footer={footer} />
      <AnimatePresence>
        {isCookieBannerVisible && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-8 right-8 w-full max-w-[500px]"
          >
            <CookiesBanner
              description={contentfulManageCookiesPage.popUpDescription}
              buttonLabel={contentfulManageCookiesPage.popUpButton}
              linkLabel={contentfulManageCookiesPage.title}
              slug={contentfulManageCookiesPage.slug}
              onAccept={handleAcceptCookies}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
