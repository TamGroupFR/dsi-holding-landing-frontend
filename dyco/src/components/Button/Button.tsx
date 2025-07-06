import React, { FC, PropsWithChildren, ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-react-i18next';

type ButtonKind = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  kind?: ButtonKind;
  paddingClass?: string;
  marginClass?: string;
  bgColor?: string;
  linkTo?: string;
  target?: string;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
  ref?: any;
}

const wrapWithLink: FC<{ children: ReactNode, to: string, target?: string, isExternal?: boolean }> = ({
  children,
  to,
  target,
  isExternal,
}) => {
  return (
    isExternal ? (
      <a href={to} target={target}>
        {children}
      </a>
    ) : (
      <Link to={to} target={target}>
        {children}
      </Link>
    )
  );
};

const getKindClassNames = (
  kind: ButtonKind,
  isCustomColor: boolean,
  paddingClass?: string,
  marginClass?: string,
): string => {
  const classNames = ['w-full', 'h-12', 'text-body-16', 'font-bold', 'rounded', 'inline-flex', 'items-center', 'justify-center', 'transition'];

  if (paddingClass) {
    classNames.push(paddingClass);
  } else {
    classNames.push('px-4');
  }

  if (marginClass) {
    classNames.push(marginClass);
  }

  if (!isCustomColor) {
    classNames.push('border-primary');

    if (kind === 'primary') {
      classNames.push('border', 'bg-primary', 'text-white', 'active:bg-opacity-90');
    } else if (kind === 'secondary') {
      classNames.push('border', 'text-primary', 'active:bg-primary', 'active:bg-opacity-20');
    } else if (kind === 'quaternary') {
      classNames.push('border', 'text-white', 'bg-dark-navy', 'active:bg-primary');
    }
  } else {
    classNames.push('text-white');
  }

  return classNames.join(' ');
};

const StyledButton = styled.div.attrs(({
  kind,
  bgColor,
  isAnchor,
  paddingClass,
  marginClass,
}: any) => ({
  as: isAnchor ? 'span' : 'button',
  type: isAnchor ? undefined : 'button',
  className: `${getKindClassNames(kind, bgColor, paddingClass, marginClass)}`,
}))`
  ${({ bgColor }: any) => bgColor && `background-color: ${bgColor}`};
  ${({ bgColor }: any) => bgColor && `border-color: ${bgColor}`};
` as any;

const Button: FC<Props> = ({
  children,
  type = 'button',
  kind = 'primary',
  paddingClass,
  marginClass,
  bgColor,
  onClick,
  linkTo,
  target,
  isExternal,
  className,
}) => {
  const button = (
    <StyledButton
      type={type}
      onClick={onClick}
      kind={kind}
      bgColor={bgColor}
      isAnchor={linkTo}
      href={linkTo}
      target={target}
      paddingClass={paddingClass}
      marginClass={marginClass}
      className={className}
    >
      {children}
    </StyledButton>
  );

  return (
    // eslint-disable-next-line react/button-has-type
    linkTo ? wrapWithLink({
      children: button,
      to: linkTo,
      target,
      isExternal,
    }) : button
  );
};

export default Button;
