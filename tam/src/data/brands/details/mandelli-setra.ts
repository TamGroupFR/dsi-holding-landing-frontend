import { Brand } from '../../../interfaces/brand.interface';
import mandelliSetraLogoAnimData from '../../../assets/lottie/logo-mandelli-setra.json';
import mandelliSetraLogoMenu from '../../../assets/img/logo-mandelli-setra-menu.svg';
import mandelliSetraLogoSmall from '../../../assets/img/logo-mandelli-setra-small.svg';
import mandelliSetraLogoLarge from '../../../assets/img/logo-mandelli-setra-large.svg';
import mandelliSetraBg from '../../../assets/img/bg-mandelli-setra.jpeg';

export const mandelliSetra: Brand = {
  name: 'Mandelli Setra',
  slug: 'mandelli-setra',
  color: '#EC1C24',
  backgroundImg: mandelliSetraBg,
  logoAnimData: mandelliSetraLogoAnimData,
  logoMenu: mandelliSetraLogoMenu,
  logoSmall: mandelliSetraLogoSmall,
  logoLarge: mandelliSetraLogoLarge,
  stats: {
    businessPartners: 3000,
    yearsInBusiness: 65,
    countriesInEurope: 44,
  },
  contactPeople: [{
    name: 'David Platel',
    email: 'mandellisetra@tamgroupe.fr',
  }],
};
