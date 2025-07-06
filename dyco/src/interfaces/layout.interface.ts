import { FooterProps } from './footer.interface';
import { NavigationMobileProps, NavigationProps } from './navigation.interface';

export interface LayoutProps {
  navigation: NavigationProps;
  navigationMobile: NavigationMobileProps;
  footer: FooterProps;
}
