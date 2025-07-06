import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  hideIcon?: boolean;
  besideIcon?: boolean;
  textAlignClass?: string;
}

const SectionTitle: FC<Props> = ({
  children, textAlignClass, hideIcon = false, besideIcon = false,
}) => {
  return (
    <div className={`flex items-center ${besideIcon ? 'flex-row space-x-2.5 lg:space-x-6' : 'flex-col space-y-2.5 lg:space-y-5'}`}>
      {!hideIcon && (
        <div className="w-4 h-4 md:w-6 md:h-6">
          <svg className="w-full h-full fill-current text-primary" width="32" height="32" viewBox="0 8 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 16C32 18.1012 31.5861 20.1817 30.7821 22.1229C29.978 24.0641 28.7994 25.828 27.3137 27.3137C25.828 28.7994 24.0641 29.978 22.1229 30.7821C20.1817 31.5861 18.1011 32 16 32C13.8988 32 11.8183 31.5861 9.87706 30.7821C7.93585 29.978 6.17203 28.7994 4.68629 27.3137C3.20055 25.828 2.022 24.0641 1.21793 22.1229C0.413852 20.1817 -1.83688e-07 18.1011 0 16L16 16H32Z" fill="#68BC45" />
          </svg>
        </div>
      )}

      <h2 className={`text-title-4 md:text-title-4 lg:text-title-3 font-bold ${textAlignClass ?? 'text-center'}`}>
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;
