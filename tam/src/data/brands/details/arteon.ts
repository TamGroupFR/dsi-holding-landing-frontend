import { Brand } from '../../../interfaces/brand.interface';
import arteonLogoAnimData from '../../../assets/lottie/logo-arteon.json';
import arteonLogoMenu from '../../../assets/img/logo-arteon-menu.svg';
import arteonLogoSmall from '../../../assets/img/logo-arteon-small.svg';
import arteonLogoLarge from '../../../assets/img/logo-arteon-large.svg';
import arteonBg from '../../../assets/img/bg-arteon.jpeg';

export const arteon: Brand = {
  name: 'Arteon',
  slug: 'arteon',
  color: '#3760F4',
  backgroundImg: arteonBg,
  logoAnimData: arteonLogoAnimData,
  logoMenu: arteonLogoMenu,
  logoSmall: arteonLogoSmall,
  logoLarge: arteonLogoLarge,
  stats: {
    businessPartners: 100,
    yearsInBusiness: 58,
    countriesInEurope: 44,
  },
  contactPeople: [{
    name: 'Jihane Naji',
    email: 'arteon@tamgroupe.fr',
  }],
};
