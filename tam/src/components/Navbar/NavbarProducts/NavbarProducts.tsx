import React from 'react';
import { Link } from 'gatsby';
import ArrowUpward from '../../../assets/icon/arrow-upward.svg';
import Close from '../../../assets/icon/close.svg';
import { NavigationProps } from '../../../interfaces/navigation.interface';
import { CategoriesProps } from '../../../interfaces/category.interface';

interface NavbarProductsProps {
  onMouseLeave?: () => void;
  navigation: NavigationProps;
  categories: CategoriesProps[];
}

const NavbarProducts = ({ onMouseLeave, navigation, categories }: NavbarProductsProps) => {
  return (
    <div className="grid max-w-[632px] z-50" onMouseLeave={onMouseLeave}>
      <div className="bg-white p-4 filter drop-shadow-xl" onMouseLeave={onMouseLeave}>
        <div className="hidden md:flex lg:hidden flex justify-end">
          <button type="button" onClick={onMouseLeave}>
            <Close />
          </button>
        </div>
        <Link to={`/${navigation.allProducts.url}`} className="text-body-14 py-3 font-bold ml-4 max-h-10">
          {navigation.allProducts.name}
        </Link>
        <div className="grid md:grid-cols-2 gap-x-6 my-2">
          {categories.map(({ name, slug: slugCategory }) => (
            <Link
              to={`/${navigation.allProducts.url}/${slugCategory}`}
              className="text-body-14 border-t px-4 py-2.5 border-light-gray max-h-10"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="flex justify-end">
          <Link
            to={`/${navigation.allProducts.url}/${navigation.productsIndex.url}`}
            className="text-body-14 font-bold ml-4 py-2.5 flex items-center"
          >
            {navigation.productsIndex.name} <ArrowUpward className="rotate-90 scale-75" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarProducts;
