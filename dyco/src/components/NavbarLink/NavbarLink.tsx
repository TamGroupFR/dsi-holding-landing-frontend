import React, { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  isActive?: boolean;
}

const NavbarLink: FC<Props> = ({
  children,
  isActive,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      className={`relative ${isActive ? 'active' : ''}`}
      onMouseOver={() => setIsMouseOver(true)}
      onFocus={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {children}

      <AnimatePresence>
        {(isActive || isMouseOver) && (
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            exit={{ width: 0 }}
            className="absolute left-0 -bottom-0.5 block h-0.5 bg-primary rounded-full"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavbarLink;
