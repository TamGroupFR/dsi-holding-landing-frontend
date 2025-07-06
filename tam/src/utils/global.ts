import { MutableRefObject } from 'react';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';

export const scrollToRef = (elementRef: MutableRefObject<HTMLElement | null | undefined>) => {
  if (elementRef.current) {
    return smoothScrollIntoView(elementRef.current);
  }

  return null;
};

export const isBrowser = () => {
  return typeof window !== 'undefined';
};
