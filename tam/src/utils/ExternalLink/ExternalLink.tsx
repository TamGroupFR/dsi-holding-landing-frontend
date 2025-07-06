import React, { AnchorHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

interface Props extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
}

const ExternalLink: FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <a {...rest}>
      <span className="flex items-center">
        {children}
        <RiArrowRightUpLine className="ml-2.5" />
      </span>
    </a>
  );
};

export default ExternalLink;
