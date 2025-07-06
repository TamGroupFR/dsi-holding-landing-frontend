import React, { FC, useEffect, useRef, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useLocation } from '@gatsbyjs/reach-router';
import { useClickAway } from 'react-use';

import BurgerButton from '../BurgerButton/BurgerButton';
import NavbarLink from './NavbarLink/NavbarLink';
import NavbarProducts from './NavbarProducts/NavbarProducts';
import SearchIcon from '../../assets/icon/search.svg';
import SearchResults from '../SearchResults/SearchResults';
import Search from '../SearchResults/Search/Search';
import { NavigationProps } from '../../interfaces/navigation.interface';
import { CategoriesProps } from '../../interfaces/category.interface';
import { SubcategoryProps } from '../../interfaces/products.interface';
import { LanguageVariant } from '../../interfaces/language.interface';
import { SearchVariant } from '../../interfaces/search.interface';
import { DownloadProps } from '../../interfaces/download.interface';

export type NavbarState = 'hidden' | 'scroll' | 'default';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  allowBack?: boolean;
  backLink?: string;
  isDark?: boolean;
  state?: NavbarState;
  siteMetadata?: any;
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  isSearchOpenMobile: boolean;
  setIsSearchOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProps;
  categories: CategoriesProps[];
  allproductsLink: string;
  downloads: DownloadProps[];
}

export interface SearchResult {
  objectID: string;
  name?: string;
  type: SearchVariant;
  title?: string;
  slug: string;
  subcategory?: SubcategoryProps;
}

const getNavbarClassNames = (state: NavbarState, isDark: boolean): string => {
  const classNames = [
    'fixed',
    'top-0',
    'left-0',
    'w-full',
    'z-40',
    'w-full',
    'bg-dark-navy',
    'transition',
    'duration-300',
    'lg:px-6'
  ];

  if (state === 'default') {
    if (isDark) {
      classNames.push('bg-dark-navy');
    } else {
      classNames.push('bg-opacity-10', 'backdrop-filter', 'backdrop-blur-sm');
    }
  }

  if (state === 'hidden') {
    classNames.push('transform', '-translate-y-full');
  }

  if (state === 'scroll') {
    classNames.push('fixed');
  }

  return classNames.join(' ');
};
const { fr, en } = LanguageVariant;

const languageEntries = {
  [en]: 'EN',
  [fr]: 'FR'
};

const Navbar: FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  allowBack,
  backLink,
  isDark = false,
  state = 'default',
  siteMetadata,
  searchOpen,
  setSearchOpen,
  isSearchOpenMobile,
  setIsSearchOpenMobile,
  searchValue,
  setSearchValue,
  navigation,
  categories,
  allproductsLink,
  downloads
}) => {
  const [isMouseOverproducts, setIsMouseOverproducts] =
    useState<boolean>(false);
  const [isMouseOverproductsPanel, setIsMouseOverproductsPanel] =
    useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const location = useLocation();
  const i18next = useI18next();
  const searchRef = useRef<HTMLLIElement>(null);

  useClickAway(searchRef, () => {
    if (searchOpen) {
      setSearchOpen(false);
    }
    if (searchValue !== '') {
      setSearchValue('');
    }
  }, ['mousedown', 'touchstart']);

  useEffect(() => {
    localStorage.setItem('locale', fr);
    const localeStorage = localStorage.getItem('locale');
    if (state === 'hidden') {
      setIsMouseOverproducts(false);
      setIsMouseOverproductsPanel(false);
    }

    if (navigator.language.includes(fr) && !localeStorage) {
      i18next.changeLanguage(fr);
    }
  }, [state]);

  const isProductssPanelVisible =
    (isMouseOverproducts || isMouseOverproductsPanel) &&
    (state === 'default' || state === 'scroll');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpenMobile(false);
  };

  return (
    <div className={getNavbarClassNames(state, isDark)}>
      <div className="px-4 pt-2 md:pt-0 md:px-6 lg:px-0 lg:container grid-layout h-14 md:h-20">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <div className="flex items-center h-full">
            <Link to="/" className="flex">
              <img
                className="w-[62px] md:w-[114px]"
                src="/img/logo-tam.svg"
                alt={siteMetadata.title}
              />
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:col-span-7">
          <ul className="flex items-center space-x-10 h-full w-full text-body-14 lg:text-body-16 font-bold text-white">
            {navigation.links.map((link, index) => {
              return index === 1 ? (
                <li
                  className="flex items-center h-full"
                  onMouseLeave={() => setIsMouseOverproducts(false)}
                  key={link.name}
                >
                  <NavbarLink
                    isActive={
                      location.pathname === `/${link.url}` ||
                      isMouseOverproducts ||
                      isMouseOverproductsPanel
                    }
                  >
                    <a
                      onMouseOver={() => setIsMouseOverproducts(true)}
                      onFocus={() => setIsMouseOverproducts(true)}
                      onClick={() => setIsMouseOverproducts(true)}
                    >
                      {link.name}
                    </a>
                  </NavbarLink>
                </li>
              ) : (
                <li key={link.name}>
                  <NavbarLink isActive={location.pathname === `/${link.url}`}>
                    <Link to={`/${link.url}`}>{link.name}</Link>
                  </NavbarLink>
                </li>
              );
            })}
            <li className="relative" ref={searchRef}>
              <div
                className={`absolute z-10 w-full hidden md:block md:w-[326px] lg:w-[496px] left-10
                py-2 text-black transition-transform transform origin-top-left ${
                  searchOpen ? 'scale-x-100' : 'scale-x-0'
                }`}
                onMouseOver={() => setSearchOpen(true)}
                onFocus={() => setSearchOpen(true)}
              >
                <Search
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  placeholder={navigation.searchProducts}
                  setSearchResults={setSearchResults}
                  searchResults={searchResults}
                  navigation={navigation}
                />
                {searchValue.length > 2 && (
                  <div
                    className={`py-4 px-6 bg-white w-full relative
                    transition-transform transform origin-top text-body-14 ${
                      searchValue ? 'scale-y-100' : 'scale-y-0'
                    }`}
                  >
                    <SearchResults
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
              <button
                type="button"
                className="p-2 max-h-10 rounded-r relative overflow-hidden hidden md:block"
                onMouseOver={() => setSearchOpen(true)}
                onFocus={() => setSearchOpen(true)}
              >
                <SearchIcon className="z-10 relative" />
                <div
                  className={`absolute bg-dark-navy top-0 left-0 h-full w-full
                  transition-transform transform origin-top-right z-0 ${
                    searchOpen ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-4 md:hidden">
          <div className="flex items-center h-full justify-end">
            <AnimateSharedLayout>
              {state === 'default' && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-auto lg:ml-10 mr-2 sm:mr-6 md:mr-0"
                >
                  <ul className="flex items-center">
                    <button
                      type="button"
                      className="p-2 max-h-10 rounded-r relative overflow-hidden md:hidden"
                      onClick={() => {
                        setIsSearchOpenMobile(!isSearchOpenMobile);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <SearchIcon className="z-10 relative" />
                    </button>
                    {/* Use when second language will be ready */}
                    {/* {i18next.languages.map((lng: string, index: number) => (
                      <li key={lng}>
                        <Link
                          onClick={() => {
                            localStorage.setItem('locale', lng);
                          }}
                          to={i18next.originalPath}
                          language={lng}
                          className={` 
                            block text-body-14 text-white uppercase hover:text-primary px-2.5 
                            ${i18next.language === lng ? 'font-bold' : ''} 
                            ${index > 0 ? 'border-l border-white' : ''} 
                          `}
                        >
                          {languageEntries[lng as keyof typeof languageEntries]}
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                </motion.div>
              )}
              <div className="flex items-center justify-end md:hidden">
                <BurgerButton
                  onClick={toggleMobileMenu}
                  isActive={isMobileMenuOpen}
                />
              </div>
            </AnimateSharedLayout>
          </div>
        </div>
      </div>

      {allowBack && !isMobileMenuOpen && (
        <div className="px-4 md:px-6 lg:px-0 lg:container grid-layout h-14">
          <div className="col-span-4 md:col-span-4 lg:col-span-12 flex items-center">
            <Link
              to={backLink ?? ''}
              className="flex items-center space-x-4 text-body-16 font-bold text-white hover:underline"
            >
              <RiArrowLeftLine size={24} />
              <span>{navigation.home}</span>
            </Link>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isProductssPanelVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 w-full h-screen hidden md:block"
          >
            <div className="relative md:left-8 lg:left-72 z-50">
              <div
                className="container"
                onMouseEnter={() => setIsMouseOverproductsPanel(true)}
              >
                <NavbarProducts
                  onMouseLeave={() => setIsMouseOverproductsPanel(false)}
                  navigation={navigation}
                  categories={categories}
                />
              </div>
            </div>
            <div className="hidden md:block lg:hidden absolute top-0 w-full bg-black h-full opacity-60 z-40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
