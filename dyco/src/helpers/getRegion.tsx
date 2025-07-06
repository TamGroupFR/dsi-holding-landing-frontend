import { RegionsProps } from '../interfaces/regions.interface';

export const getRegion = (regions: RegionsProps, language: string) => {
  let filteredRegions;

  switch (language) {
    case 'en':
      filteredRegions = regions.nodes.filter(({ variant }) => variant === 'EU');
      break;
    case 'pl':
      filteredRegions = regions.nodes.filter(({ variant }) => variant === 'PL');
      break;
    case 'de':
      filteredRegions = regions.nodes.filter(
        ({ variant }) => variant === 'DACH'
      );
      break;
    default:
      filteredRegions = regions.nodes.filter(({ variant }) => variant === 'EU');
  }

  return filteredRegions;
};
