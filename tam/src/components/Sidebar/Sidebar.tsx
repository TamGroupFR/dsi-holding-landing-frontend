import React from 'react';
import { Link } from 'gatsby';
import Arrow from '../../assets/icon/arrow.svg';
import { CategoriesProps } from '../../interfaces/category.interface';

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
  setSubsubcategoryName: React.Dispatch<React.SetStateAction<string | null>>;
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
  setSubsubcategoryName,
}: SidebarProps) => {
  const indexClick = () => {
    setCategoryName(productsIndex.url);
    setSubcategoryName(null);
    setSubsubcategoryName(null);
  };

  const mainClick = (slug: string) => () => {
    setSubsubcategoryName(null);
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
    } else {
      setSubcategoryName(subCategorySlug);
    }
    setSubsubcategoryName(null);
  };

  return (
    <div className={`w-full md:max-w-[220px] lg:max-w-[292px] ${visibility ? 'hidden' : ''}`}>
      <Link to={`/${link}`} className="hidden py-2.5 font-bold pl-4 text-subtitle-14 md:block text-left ">
        {title}
      </Link>
      <div className="flex flex-col">
        {mobile ? (
          <button
            type="button"
            className="border-t py-2 cursor-pointer font-bold w-full flex justify-between pl-4 text-subtitle-14 block text-left "
            onClick={indexClick}
          >
            {productsIndex.name}
          </button>
        ) : (
          <Link
            to={`/${link}/${productsIndex.url}`}
            className="border-t py-2.5 cursor-pointer font-bold w-full flex justify-between pl-4 text-subtitle-14 block text-left "
          >
            {productsIndex.name}
          </Link>
        )}
        {links.map(({ name, slug, subcategories }) => (
          <div className="w-full" key={name}>
            {mobile ? (
              <button
                type="button"
                className="border-t py-2.5 cursor-pointer w-full flex justify-between pl-4 text-subtitle-14 block text-left "
                onClick={mainClick(slug)}
              >
                <span className="text-subtitle-14 inline-block">{name}</span>{' '}
                <Arrow className={`h-[21px] ${categoryName === slug ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link
                to={`/${link}/${slug}`}
                className="border-t py-2.5 cursor-pointer w-full flex justify-between pl-4 text-subtitle-14 block text-left "
              >
                <span className="text-subtitle-14 inline-block">{name}</span>{' '}
                <Arrow className={`h-[21px] ${categoryName === slug ? 'rotate-180' : ''}`} />
              </Link>
            )}
            {categoryName === slug && (
              <div className="flex flex-col">
                {subcategories.map(
                  ({ name: subCategoryName, slug: subCategorySlug, subcategories: subsubCategories }) => (
                    <>
                      {mobile && subsubCategories ? (
                        <button
                          type="button"
                          className="border-t py-2.5 cursor-pointer w-full flex justify-between text-subtitle-14 block text-left "
                          onClick={subClick(subCategorySlug)}
                          key={subCategoryName}
                        >
                          <span className="text-subtitle-14 pl-8 inline-block">{subCategoryName}</span>{' '}
                          {subsubCategories && (
                            <Arrow className={`h-[21px] ${nameSubcategory === subCategorySlug ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                      ) : (
                        <Link
                          to={`/${link}/${slug}/${subCategorySlug}`}
                          className="border-t py-2.5 w-full cursor-pointer text-left text-subtitle-14 text-left flex justify-between "
                          key={subCategoryName}
                        >
                          <span className="pl-8 inline-block">{subCategoryName}</span>{' '}
                          {subsubCategories && (
                            <Arrow className={`h-[21px] ${nameSubcategory === subCategorySlug ? 'rotate-180' : ''}`} />
                          )}
                        </Link>
                      )}
                      {nameSubcategory === subCategorySlug && subsubCategories && (
                        <div className="flex flex-col">
                          {subsubCategories.map(({ name: subsubCategoryName, slug: subsubCategorySlug }) => (
                            <Link
                              to={`/${link}/${slug}/${subCategorySlug}/${subsubCategorySlug}`}
                              className="border-t py-2.5 w-full cursor-pointer text-left text-subtitle-14 text-left "
                              key={subsubCategoryName}
                            >
                              <span className="pl-12 inline-block">{subsubCategoryName}</span>{' '}
                            </Link>
                          ))}
                        </div>
                      )}
                      {}
                    </>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
