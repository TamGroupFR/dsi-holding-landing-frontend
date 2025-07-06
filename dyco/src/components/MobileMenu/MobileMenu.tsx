import React, { FC } from 'react';
import Button from '../Button/Button';
import { NavigationMobileProps } from '../../interfaces/navigation.interface';
import MobileMenuLinks from './MobileMenuLinks';

interface Props {
  isOpen: boolean;
  navigation: NavigationMobileProps;
}

const MobileMenu: FC<Props> = ({ isOpen, navigation }) => {
  const { links, buttonContact } = navigation.nodes[0];

  return (
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={`fixed inset-0 pt-14 w-full h-full bg-dark-navy z-40 text-white transform 
      transition-transform duration-300 ${
        !isOpen && '-translate-x-full'
      } overflow-auto`}
    >
      <div className="container grid-layout pt-12 pb-6 min-h-full">
        <div className="col-span-4">
          <div className="flex flex-col h-full">
            <ul className="mb-5 flex-shrink-0">
              {links.map((link) => {
                return <MobileMenuLinks link={link} key={link.name} />;
              })}
            </ul>

            <div className="mt-6 flex flex-col flex-shrink-0">
              <Button linkTo={`mailto:${buttonContact.url}`} isExternal>
                {buttonContact.name}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
