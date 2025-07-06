import { brands } from '../data/brands/brands';
import { Brand } from '../interfaces/brand.interface';

export const getBrandDetailsBySlug = (slug: string): Brand => {
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) {
    throw new Error(`Brand with slug ${slug} not found`);
  }

  return brand;
};
