import React, { FC } from 'react';

interface Props {
  isActive?: boolean;
  onClick?: () => void;
}

const BurgerButton: FC<Props> = ({ onClick, isActive }) => {
  return (
    <button
      className="w-6 h-6 relative"
      type="button"
      onClick={onClick}
    >
      <span className={`${isActive ? 'top-1/2 rotate-45' : 'top-1.5'} transition absolute block w-4 h-0.5 bg-white transform -translate-x-1/2 left-1/2`} />
      <span className={`${isActive ? 'opacity-0' : 'opacity-100'} transition absolute w-4 h-0.5 bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
      <span className={`${isActive ? 'top-1/2 -rotate-45' : 'bottom-1.5'} transition absolute block w-4 h-0.5 bg-white transform -translate-x-1/2 left-1/2`} />
    </button>
  );
};

export default BurgerButton;
