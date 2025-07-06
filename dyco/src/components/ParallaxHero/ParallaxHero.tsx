import React, { FC } from 'react';
import { Parallax } from 'react-parallax';
import styled from 'styled-components';

interface Props {
  bgImage: string;
}

const StyledHeroParallax = styled.div`
  img {
    object-fit: contain;
    object-position: top left;
  }
`;

const ParallaxHero: FC<Props> = ({ bgImage }) => {
  return (
    <StyledHeroParallax>
      <Parallax bgImage={bgImage} strength={150}>
        <div className="py-36 md:py-64" />
        <div className="md:py-7 lg:py-12" />
      </Parallax>
    </StyledHeroParallax>
  );
};

export default ParallaxHero;
