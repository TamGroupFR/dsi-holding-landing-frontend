import React, { FC, useEffect, useState } from 'react';
import { RiArrowDropDownLine, RiArrowLeftLine } from 'react-icons/ri';
import { useTranslation, Link, useI18next } from 'gatsby-plugin-react-i18next';
import { usePopperTooltip } from 'react-popper-tooltip';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { useLocation } from '@gatsbyjs/reach-router';
import BurgerButton from '../BurgerButton/BurgerButton';
import NavbarLink from '../NavbarLink/NavbarLink';
import { NavigationProps } from '../../interfaces/navigation.interface';

export type NavbarState = 'hidden' | 'scroll' | 'default';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  allowBack?: boolean;
  backLink?: string;
  isDark?: boolean;
  state?: NavbarState;
  siteMetadata?: any;
  navigation: NavigationProps;
}

const getNavbarClassNames = (
  state: NavbarState,
  isMobileMenuOpen: boolean,
  isDark: boolean
): string => {
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
    'min-h-[92px] md:min-h-[80px]',
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

const Navbar: FC<Props> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  allowBack,
  backLink,
  isDark = false,
  state = 'default',
  siteMetadata,
  navigation,
}) => {
  const [isLangTooltipVisible, setIsLangTooltipVisible] =
    useState<boolean>(false);
  const navigationLinks = navigation.nodes[0];

  const location = useLocation();
  const i18next = useI18next();
  const { t } = useTranslation();
  const langTooltip = usePopperTooltip({
    trigger: 'click',
    closeOnOutsideClick: true,
    placement: 'bottom-end',
    offset: [0, 12],
    visible: isLangTooltipVisible,
    onVisibleChange: (visible: boolean) => {
      setIsLangTooltipVisible(visible);
    },
  });

  useEffect(() => {
    if (state !== 'default' && langTooltip.visible) {
      setIsLangTooltipVisible(false);
    }
  }, [state]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={getNavbarClassNames(state, isMobileMenuOpen, isDark)}>
      <div className="container grid-layout h-14 md:h-20">
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <div className="flex items-center h-full">
            <Link to="/" className="flex">
              <img
                className="md:w-32 md:scale-125 lg:scale-150"
                src="/img/logo-dywidag-white.png"
                alt={siteMetadata.title}
              />
            </Link>
          </div>
        </div>
        <div className="hidden md:block md:col-span-6 lg:col-span-8">
          <ul
            className="flex items-center space-x-10 md:space-x-5 lg:space-x-10 h-full
          text-body-14 lg:text-body-16 font-bold text-white"
          >
            {navigationLinks.links.map(({ url, name }) => (
              <li className="relative group" key={name}>
                <NavbarLink isActive={location.pathname.includes(url)}>
                  <Link to={`/${url}`}>{name}</Link>
                </NavbarLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 lg:col-span-2">
          <div className="flex items-center h-full justify-start">
            <AnimateSharedLayout>
              {state === 'default' && (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10"
                >
                  <button
                    type="button"
                    className="flex items-center lg:space-x-2"
                    ref={langTooltip.setTriggerRef}
                  >
                    <span className="text-body-14 md:text-body-16 text-white font-bold uppercase w-6">
                      {i18next.language}
                    </span>
                    <RiArrowDropDownLine size={24} className="text-white" />
                  </button>
                </motion.div>
              )}

              <div className="flex items-center md:hidden ml-auto">
                <BurgerButton
                  onClick={toggleMobileMenu}
                  isActive={isMobileMenuOpen}
                />
              </div>
            </AnimateSharedLayout>
            {langTooltip.visible && (
              <div
                className="w-32 px-4 py-1.5 bg-white"
                ref={langTooltip.setTooltipRef}
                style={langTooltip.getTooltipProps().style}
              >
                <ul className="flex flex-col space-y-1.5">
                  {i18next.languages
                    .filter((lng: string) => lng !== i18next.language)
                    .map((lng: string) => (
                      <li key={lng}>
                        <Link
                          to="/"
                          className="block text-body-14 font-medium uppercase hover:text-primary"
                          language={lng}
                        >
                          {lng}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {allowBack && (
        <div className="container grid-layout h-14 pt-4 md:pt-0">
          <div className="col-span-4 md:col-span-4 lg:col-span-12 flex items-center">
            <Link
              to={backLink ?? ''}
              className="flex items-center space-x-4 text-body-16 font-bold text-white hover:underline"
            >
              <RiArrowLeftLine size={24} />
              <span>{navigationLinks.buttonHome}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
