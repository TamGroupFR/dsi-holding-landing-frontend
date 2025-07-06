import React, { useState } from 'react';
import { Link } from 'gatsby';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Arrow from '../../assets/icon/arrow.svg';
import { ProductProps } from '../../interfaces/products.interface';
import { CategoriesProps } from '../../interfaces/category.interface';
import { findObjectBySubsubcategoryName } from '../../helpers/findObjectBySubsubcategoryName';
import { MenuProps, selectStyles } from '../../helpers/select';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

interface ProductIndexProps {
  showAll: string;
  select: string;
  allProducts: string;
  products: ProductProps[];
  categories: CategoriesProps[];
}

const ProductIndex = ({ showAll, select, allProducts, products, categories }: ProductIndexProps) => {
  const [activeLetter, setActiveLetter] = useState('');
  const handleChange = (letter: string) => () => setActiveLetter(letter);
  const handleSelect = (event: SelectChangeEvent<typeof activeLetter>) => {
    const {
      target: { value },
    } = event;
    setActiveLetter(value);
  };

  const groupedProducts: { [key: string]: ProductProps[] } = products.reduce((acc, product) => {
    const firstLetter = product.name[0].toLowerCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(product);
    return acc;
  }, {} as { [key: string]: ProductProps[] });

  const icon = (style: string) => <Arrow className={style} />;

  const getProductLink = (product: ProductProps) => {
    if (product.subcategory.category === null) {
      const category = findObjectBySubsubcategoryName(categories, product.subcategory.name);
      return `/${allProducts}/${category?.category}/${category?.subcategory}/${category?.subsubcategory?.slug}/${product.slug}`;
    }

    return `/${allProducts}/${product.subcategory.category[0].slug}/${product.subcategory.slug}/${product.slug}`;
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={handleChange('')}
          className="hidden md:block absolute right-0 -top-16 text-subtitle-18 font-bold md:pt-1 lg:pt-0"
        >
          {showAll}
        </button>
        <div className="hidden md:flex gap-1 mb-6 flex-wrap lg:flex-nowrap">
          {alphabet.map((letter) => (
            <button
              type="button"
              key={letter}
              className={`uppercase h-[32px] w-[32px] hover:bg-dark-navy hover:text-white rounded ${
                activeLetter === letter ? 'bg-dark-navy text-white' : 'bg-gray-100'
              }`}
              onClick={handleChange(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex flex-col md:hidden w-full">
          <span className="body-14 mb-1 text-body-14">{select}</span>
          <Select
            IconComponent={({ className }) => icon(className)}
            displayEmpty
            value={activeLetter}
            onChange={handleSelect}
            renderValue={(selected) => {
              return selected.length === 0 ? (
                <span className="text-body-14">{showAll}</span>
              ) : (
                <span className="text-body-14 uppercase">{selected}</span>
              );
            }}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={selectStyles}
            className="w-full border-dark-navy"
          >
            <MenuItem value="" className="text-body-14 py-0">
              {showAll}
            </MenuItem>
            {alphabet.map((letter) => (
              <MenuItem key={letter} value={letter} className="uppercase text-body-14 py-0">
                {letter}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div>
        {(activeLetter === '' ? alphabet : [activeLetter]).map((letter) => {
          if (groupedProducts[letter]) {
            return (
              <div key={letter}>
                <div className="flex flex-col">
                  <h2 className="text-subtitle-18 md:text-header-27 font-bold uppercase ml-4 mt-6">{letter}</h2>
                  <ul className="flex w-full gap-x-5 grid grid-cols-1 md:grid-cols-2">
                    {groupedProducts[letter]?.map((product, index) => (
                      <li
                        key={product.name}
                        className={`block py-2 px-4 text-body-1 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} ${
                          index % 4 < 2 ? 'md:bg-white' : 'md:bg-gray-100'
                        }`}
                      >
                        <Link to={getProductLink(product)} className="block w-full">
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductIndex;
