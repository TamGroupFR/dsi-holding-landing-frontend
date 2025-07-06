import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import { LinkProps } from '../../interfaces/products.interface';

export interface BreadcrumbsProps {
  homeLink: string;
  link: LinkProps;
  white?: boolean;
}

const Breadcrumbs = ({ homeLink, link, white }: BreadcrumbsProps) => {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  const slugToNameMap: Record<string, string> = {
    [link.url]: link.name,
  };

  const labelsToExclude = ['fr-FR', 'de-DE', 'en-US'];
  const breadcrumbs = [
    { to: '/', label: homeLink },
    ...pathSegments.map((segment, index) => ({
      to: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: slugToNameMap[segment] || segment,
    })),
  ].filter(({ label }) => !labelsToExclude.includes(label));
  return (
    <nav className="flex items-center space-x-2 text-xs my-8">
      {breadcrumbs.map(({ to, label }, index) => (
        <React.Fragment key={label}>
          {index > 0 && <span className={`${white ? 'text-white' : 'text-black'}`}>{'>'}</span>}
          <Link to={to} className={`breadcrumb text-body-12 ${white ? 'text-white' : 'text-black'}`}>
            {label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
