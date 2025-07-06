import React from 'react';
import { Link } from 'gatsby';

interface MobileMenuLinksProps {
  link: { name: string; url: string };
}

const MobileMenuLinks = ({ link }: MobileMenuLinksProps) => (
  <li className="py-5 border-light-gray border-opacity-20" key={link.name}>
    <Link
      to={`/${link.url}`}
      title={link.name}
      className="text-body-12 font-bold uppercase"
    >
      {link.name}
    </Link>
  </li>
);

export default MobileMenuLinks;
