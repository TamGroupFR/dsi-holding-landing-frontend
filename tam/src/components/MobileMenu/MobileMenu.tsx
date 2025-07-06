import React, { FC } from 'react';
import { Link } from 'gatsby';
import Button from '../Button/Button';
import { NavigationProps } from '../../interfaces/navigation.interface';

interface Props {
  isOpen: boolean;
  navigation: NavigationProps;
}

const MobileMenu: FC<Props> = ({ isOpen, navigation }) => {
  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={`fixed inset-0 pt-14 w-full h-full overflow-auto bg-dark-navy
      z-40 text-white transform transition-transform ${
        !isOpen && '-translate-x-full'
      }`}
    >
      <div className="grid-layout px-4 pt-8 pb-6 h-full">
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <ul className="mb-5">
              {navigation.mobileLinks.map((link) => (
                <li
                  className="py-5 border-b border-light-gray border-opacity-20"
                  key={link.name}
                >
                  <Link
                    to={`/${link.url}`}
                    className="text-body-12 font-bold uppercase"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <Button linkTo={`mailto:${navigation.getInTouch.url}`} isExternal>
                {navigation.getInTouch.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
