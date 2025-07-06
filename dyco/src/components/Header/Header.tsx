import React from 'react';
import image from '../../assets/icon/bullet.svg';

interface HeaderProps {
  title: string;
  icon?: boolean;
}

const Header = ({ title, icon }: HeaderProps) => (
  <div className="flex mb-6 lg:mb-8 items-center">
    {icon && <img className="w-6 h-6" src={image} alt={title} />}
    <h2 className="text-subtitle-24 md:text-header-32 font-bold ml-4 text-black">
      {title}
    </h2>
  </div>
);

export default Header;
