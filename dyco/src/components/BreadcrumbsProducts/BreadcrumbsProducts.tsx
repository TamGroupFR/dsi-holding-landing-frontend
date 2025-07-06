import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import { CategoriesProps } from '../../interfaces/category.interface';
import { LinkProps } from '../../interfaces/products.interface';

export interface BreadcrumbsProps {
  links: CategoriesProps[];
  homeLink: string;
  allProducts: LinkProps;
  productIndex: LinkProps;
  slug: string;
  setCategoryName: React.Dispatch<React.SetStateAction<string | null>>;
  setSubcategoryName: React.Dispatch<React.SetStateAction<string | null>>;
  setProductName: React.Dispatch<React.SetStateAction<string | null>>;
  product?: { name: string; slug: string };
}

const Breadcrumbs = ({
  links,
  homeLink,
  allProducts,
  productIndex,
  product,
  slug,
  setCategoryName,
  setSubcategoryName,
  setProductName,
}: BreadcrumbsProps) => {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');
  useEffect(() => {
    const currentUrl = location.href
      .split(`/${slug}`)
      .filter((segment) => segment !== '');
    if (currentUrl.length >= 2) {
      const names = currentUrl[1].split('/');
      setCategoryName(names[1]);
      if (names[3]) {
        setProductName(names[3]);
      } else {
        setProductName(null);
      }
      if (names[2]) {
        setSubcategoryName(names[2]);
      } else {
        setSubcategoryName(null);
      }
    } else {
      setCategoryName(null);
    }
  }, [location]);

  const slugToNameMap: Record<string, string> = {
    [allProducts.url]: allProducts.name,
    [productIndex.url]: productIndex.name,
    ...(product && { [product.slug]: product.name }),
  };

  function buildSlugToNameMap(categories: CategoriesProps[]) {
    categories.forEach((category) => {
      slugToNameMap[category.slug] = category.name;
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          slugToNameMap[subcategory.slug] = subcategory.name;
        });
      }
    });
  }

  buildSlugToNameMap(links);

  const labelsToExclude = ['pl', 'de', 'fr'];
  const breadcrumbs = [
    { to: '/', label: homeLink },
    ...pathSegments.map((segment, index) => ({
      to: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: slugToNameMap[segment] || segment,
    })),
  ].filter(({ label }) => !labelsToExclude.includes(label));

  return (
    <nav className="flex items-center space-x-2 text-xs my-12">
      {breadcrumbs.map(({ to, label }, index) => (
        <React.Fragment key={label}>
          {index > 0 && <span>{'>'}</span>}
          <Link to={to} className="breadcrumb text-body-12">
            {label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
