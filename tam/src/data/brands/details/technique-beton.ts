import { Brand } from '../../../interfaces/brand.interface';
import techniqueBetonLogoAnimData from '../../../assets/lottie/logo-technique-beton.json';
import techniqueBetonLogoMenu from '../../../assets/img/logo-technique-beton-menu.svg';
import techniqueBetonLogoSmall from '../../../assets/img/logo-technique-beton-small.svg';
import techniqueBetonLogoLarge from '../../../assets/img/logo-technique-beton-large.svg';
import techniqueBetonBg from '../../../assets/img/bg-technique-beton.jpeg';

export const techniqueBeton: Brand = {
  name: 'Technique Beton',
  slug: 'technique-beton',
  color: '#68BC45',
  backgroundImg: techniqueBetonBg,
  logoAnimData: techniqueBetonLogoAnimData,
  logoMenu: techniqueBetonLogoMenu,
  logoSmall: techniqueBetonLogoSmall,
  logoLarge: techniqueBetonLogoLarge,
  stats: {
    businessPartners: 3000,
    yearsInBusiness: 44,
    countriesInEurope: 44,
  },
  contactPeople: [{
    name: 'David Platel',
    email: 'techniquebeton@tamgroupe.fr',
  }],
};
