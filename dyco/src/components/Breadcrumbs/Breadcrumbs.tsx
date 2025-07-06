import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';

export interface BreadcrumbsProps {
  homeLink: string;
  white?: boolean;
}

const Breadcrumbs = ({ homeLink, white }: BreadcrumbsProps) => {
  const location = useLocation();
  const { pathname } = location;
  const pathSegments = pathname.split('/').filter((segment) => segment !== '');
  const labelsToExclude = ['pl', 'de', 'fr'];
  const breadcrumbs = [
    { to: '/', label: homeLink },
    ...pathSegments.map((segment, index) => ({
      to: `/${pathSegments.slice(0, index + 1).join('/')}`,
      label: segment.replace(/-/g, ' '),
    })),
  ].filter(({ label }) => !labelsToExclude.includes(label));
  return (
    <nav className="flex items-center space-x-2 text-xs my-8">
      {breadcrumbs.map(({ to, label }, index) => (
        <React.Fragment key={label}>
          {index > 0 && (
            <span className={`${white ? 'text-white' : 'text-black'}`}>
              {'>'}
            </span>
          )}
          <Link
            to={to}
            className={`breadcrumb capitalize text-body-12 ${
              white ? 'text-white' : 'text-black'
            }`}
          >
            {label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
