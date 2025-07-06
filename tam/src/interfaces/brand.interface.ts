export interface Brand {
  name: string;
  slug: string;
  color: string;
  backgroundImg: string;
  logoAnimData: Object;
  logoMenu: string;
  logoSmall: string;
  logoLarge: string;
  stats: {
    businessPartners: number;
    yearsInBusiness: number;
    countriesInEurope: number;
  },
  contactPeople: {
    name: string;
    email: string;
  }[]
}
