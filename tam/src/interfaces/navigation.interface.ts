type LinkProps = {
  name: string;
  url: string;
};

export interface NavigationProps {
  home: string;
  types: string[];
  links: LinkProps[];
  mobileLinks: LinkProps[];
  seeAllResults: LinkProps;
  searchProducts: string;
  productsIndex: LinkProps;
  noResults: string;
  getInTouch: LinkProps;
  allProducts: LinkProps;
}
