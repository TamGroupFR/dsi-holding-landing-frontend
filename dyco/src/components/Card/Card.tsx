import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  imgSrc? :string;
  imgAlt?: string;
}

const Card: FC<Props> = ({ children, imgSrc, imgAlt }) => {
  return (
    <div>
      {imgSrc && (
        <div className="rounded-t overflow-hidden aspect-w-3 aspect-h-2">
          <img className="w-full h-full object-center object-cover" src={imgSrc} alt={imgAlt} />
        </div>
      )}

      <div className={`pt-4 px-4 pb-8 rounded-b border-l border-r border-b border-light-gray ${!imgSrc && 'border-t rounded-t'}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
