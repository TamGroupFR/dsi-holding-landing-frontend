import React, { FC } from 'react';
import { Parallax } from 'react-parallax';
import styled from 'styled-components';

interface Props {
  bgImage: string;
  dark?: boolean;
}

const ParallaxHero: FC<Props> = ({ bgImage, dark }) => {
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1240;
  const objectFit = isTablet ? 'cover' : 'contain';

  const StyledHeroParallax = styled.div`
    padding-bottom: 16px;
    background-color: ${dark ? '#081E37' : '#fff'};
    img {
      object-fit: ${objectFit};
      object-position: top left;
    }
  `;

  return (
    <StyledHeroParallax>
      <Parallax bgImage={bgImage} strength={200}>
        <div className="py-20 md:py-36 lg:py-64" />
        <div className="md:py-7 lg:py-12" />
      </Parallax>
    </StyledHeroParallax>
  );
};

export default ParallaxHero;
