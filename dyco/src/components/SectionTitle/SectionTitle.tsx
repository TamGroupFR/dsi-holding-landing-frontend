import React, { FC, ReactNode } from 'react';
import bullet from '../../assets/icon/bullet.svg';

interface Props {
  children: ReactNode;
  hideIcon?: boolean;
  besideIcon?: boolean;
  textAlignClass?: string;
}

const SectionTitle: FC<Props> = ({
  children,
  textAlignClass,
  hideIcon = false,
  besideIcon = false,
}) => {
  return (
    <div
      className={`flex items-center ${
        besideIcon
          ? 'flex-row space-x-2.5 lg:space-x-6'
          : 'flex-col space-y-2.5 lg:space-y-5'
      }`}
    >
      {!hideIcon && (
        <div className="w-6 h-6">
          <img
            className="w-full h-full object-contain object-center"
            src={bullet}
            alt="bullet icon"
          />
        </div>
      )}

      <h2
        className={`text-title-4 md:text-title-4 lg:text-title-3 font-bold ${
          textAlignClass ?? 'text-center'
        }`}
      >
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;
