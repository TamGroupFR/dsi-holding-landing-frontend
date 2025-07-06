import { FooterProps } from './footer.interface';
import { NavigationMobileProps, NavigationProps } from './navigation.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface AnimationProps {
  name: string;
  link: string;
}

export interface AnimationPageProps {
  title: string;
  url: string;
  animations: AnimationProps[],
  seo?: Seo;
}

export interface AnimationsPageProps {
  footer: FooterProps;
  navigation: NavigationProps;
  navigationMobile: NavigationMobileProps;
  animationsPage: { nodes: AnimationPageProps[] };
  homepage: GlobalSeoData;
}
