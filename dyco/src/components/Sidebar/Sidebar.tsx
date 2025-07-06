import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import Arrow from '../../assets/icon/arrow.svg';
import { CategoriesProps } from '../../interfaces/category.interface';
import NavbarLink from '../NavbarLink/NavbarLink';

interface SidebarProps {
  links: CategoriesProps[];
  title: string;
  link: string;
  productsIndex: { slug?: string; name: string; url: string };
  categoryName: string | null;
  visibility: boolean;
  mobile: boolean;
  nameSubcategory: string | null;
  setCategoryName: React.Dispatch<React.SetStateAction<string | null>>;
  setSubcategoryName: React.Dispatch<React.SetStateAction<string | null>>;
}

const Sidebar = ({
  links,
  title,
  link,
  categoryName,
  productsIndex,
  visibility,
  mobile,
  setCategoryName,
  nameSubcategory,
  setSubcategoryName,
}: SidebarProps) => {
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  const location = useLocation();

  const indexClick = () => {
    setCategoryName(productsIndex.url);
    setSubcategoryName(null);
  };

  const mainClick = (slug: string) => () => {
    navigate(`/${link}/${slug}`);
  };

  const mainClickArrow = (slug: string) => () => {
    if (categoryName === slug) {
      setIsCategoryExpanded(!isCategoryExpanded);
    } else {
      navigate(`/${link}/${slug}`);
    }
  };

  const mobileMainClick = (slug: string) => () => {
    setSubcategoryName(null);
    if (categoryName === slug) {
      setCategoryName(null);
    } else {
      setCategoryName(slug);
    }
  };

  const subClick = (subCategorySlug: string) => () => {
    if (nameSubcategory === subCategorySlug) {
      setSubcategoryName(null);
    }
    setSubcategoryName(subCategorySlug);
  };

  return (
    <div
      className={`w-full md:max-w-[220px] lg:max-w-[292px] ${
        visibility ? 'hidden' : ''
      }`}
    >
      <Link
        to={`/${link}`}
        className="hidden py-2.5 font-bold pl-4 text-subtitle-14 md:block text-left "
      >
        <NavbarLink isActive={location.pathname === `/${link}`}>
          {title}
        </NavbarLink>
      </Link>
      <div className="flex flex-col">
        {mobile ? (
          <button
            type="button"
            className="border-t py-2 cursor-pointer font-bold w-full flex
            justify-between pl-4 text-subtitle-14 block text-left"
            onClick={indexClick}
          >
            {productsIndex.name}
          </button>
        ) : (
          <Link
            to={`/${link}/${productsIndex.url}`}
            className="border-t py-2.5 cursor-pointer font-bold w-full flex
            justify-between pl-4 text-subtitle-14 block text-left"
          >
            <NavbarLink
              isActive={location.pathname.includes(productsIndex.url)}
            >
              {productsIndex.name}
            </NavbarLink>
          </Link>
        )}
        {links.map(({ name, slug, subcategories }) => {
          return (
            <div className="w-full" key={name}>
              {mobile ? (
                <button
                  type="button"
                  className="border-t py-2.5 cursor-pointer w-full flex
                  justify-between pl-4 text-subtitle-14 block text-left"
                  onClick={mobileMainClick(slug)}
                >
                  <span className="text-subtitle-14 inline-block">{name}</span>{' '}
                  <img
                    src={Arrow}
                    alt={name}
                    className={`h-[21px] ${
                      categoryName === slug ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <div className="border-t py-2.5 cursor-pointer w-full flex justify-between pl-4 text-subtitle-14 gap-2">
                  <button
                    type="button"
                    onClick={mainClick(slug)}
                    className="block text-left max-w-[240px]"
                  >
                    <NavbarLink isActive={location.pathname.includes(slug)}>
                      <span className="text-subtitle-14 inline-block">
                        {name}
                      </span>
                    </NavbarLink>{' '}
                  </button>
                  <button
                    type="button"
                    onClick={mainClickArrow(slug)}
                    className="w-[24px] h-[21px] flex justify-end items-start"
                  >
                    <img
                      src={Arrow}
                      alt={name}
                      className={`w-[21px] h-[21px] block ${
                        categoryName === slug && isCategoryExpanded
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>
                </div>
              )}
              {categoryName === slug && isCategoryExpanded && (
                <div className="flex flex-col">
                  {subcategories.map(
                    ({ name: subCategoryName, slug: subCategorySlug }) => (
                      <div key={subCategoryName}>
                        {mobile ? (
                          <button
                            type="button"
                            className="border-t py-2.5 cursor-pointer w-full flex justify-between
                            text-subtitle-14 block text-left"
                            onClick={subClick(subCategorySlug)}
                            key={subCategoryName}
                          >
                            <span className="text-subtitle-14 pl-8 inline-block">
                              {subCategoryName}
                            </span>
                          </button>
                        ) : (
                          <Link
                            to={`/${link}/${slug}/${subCategorySlug}`}
                            className="border-t py-2.5 pl-8 w-full cursor-pointer text-left
                            text-subtitle-14 text-left flex justify-between"
                            key={subCategoryName}
                          >
                            <NavbarLink
                              isActive={location.pathname.includes(
                                subCategorySlug
                              )}
                            >
                              <span className="inline-block">
                                {subCategoryName}
                              </span>
                            </NavbarLink>
                          </Link>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
