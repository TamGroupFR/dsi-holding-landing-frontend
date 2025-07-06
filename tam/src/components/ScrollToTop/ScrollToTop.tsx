import React from 'react';
import ArrowUpward from '../../assets/icon/arrow-upward.svg';
import { scrollToTop } from '../../helpers/scrollToTop';

interface ScrollToTopProps {
  button: string;
}

const ScrollToTop = ({ button }: ScrollToTopProps) => (
  <button type="button" className="flex items-center text-subtitle-16 font-bold py-2" onClick={scrollToTop}>
    <ArrowUpward className="mr-2.5" />
    {button}
  </button>
);

export default ScrollToTop;
