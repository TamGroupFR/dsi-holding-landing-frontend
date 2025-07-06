import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ImageProps } from '../../interfaces/products.interface';

interface HeaderProps {
  title: string;
  icon: ImageProps;
  white?: boolean;
}

const Header = ({ title, icon, white }: HeaderProps) => (
  <div className="flex mb-6 lg:mb-8 items-center">
    <GatsbyImage image={icon.gatsbyImageData} alt={icon.title} className="max-h-8 max-w-8 mb-1.5 md:mb-3" />
    <h1 className={`text-subtitle-20 md:text-header-32 font-bold ml-4 ${white ? 'text-white' : 'text-black'}`}>
      {title}
    </h1>
  </div>
);

export default Header;
