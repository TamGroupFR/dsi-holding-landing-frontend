import React, { FC, useState } from 'react';

interface Props {
  brandUrl?: string;
  img: string;
  name?: string;
  title?: string;
  buttonText?: string;
  paddingClassName?: string;
  disableHoverExpand?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const BrandTile: FC<Props> = ({
  brandUrl, img, name, title, paddingClassName, onMouseEnter, onMouseLeave, disableHoverExpand, buttonText,
}) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    onMouseLeave?.();
  };

  return (
    <a
      href={brandUrl}
      className={`${paddingClassName ?? 'px-4 py-8'} ${!disableHoverExpand ? 'border-l border-t border-r' : 'border'} flex flex-col items-center bg-light-blue rounded border-light-blue hover:border-light-gray transition relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      target="_blank"
      rel="noreferrer"
    >
      <img src={img} alt={title} />
      {name && (
      <p className={`${isMouseOver ? 'transform' : ''} hidden md:block mt-5 transition text-body-16 font-medium text-center`}>
        {name}
      </p>
      )}
      {brandUrl
        ? (
          <span className={`${!disableHoverExpand && isMouseOver ? 'lg:opacity-100' : ''} absolute bottom-0 text-primary text-body-16 font-bold underline opacity-0 transition`}>
            {buttonText}
          </span>
        ) : null }

      <span className={`${!disableHoverExpand && isMouseOver ? 'lg:transform lg:translate-y-8 lg:border-light-gray' : 'border-light-blue'} absolute -left-px -right-px -bottom-px h-12 bg-light-blue rounded-b border-b border-l border-r transition -z-10`} />
    </a>
  );
};

export default BrandTile;
