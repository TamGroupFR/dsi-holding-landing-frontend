import { Department } from '../components/DepartmentsMap/DepartmentsMap';
import { ContentfulContactSection } from '../sections/ContactSection/ContactSection';
import { CategoriesProps } from './category.interface';
import { DownloadProps } from './download.interface';
import { FooterProps } from './footer.interfaces';
import { NavigationProps } from './navigation.interface';
import { BannerProps, ImageProps } from './products.interface';

export interface DataContactProps {
  navigation: NavigationProps;
  footer: FooterProps;
  categories: {
    nodes: CategoriesProps[];
  };
  downloads: {
    nodes: DownloadProps[];
  };
  contact: {
    title: string;
    slug: string;
    banner: BannerProps;
    icon: ImageProps;
    departmentsList: Department[];
    departmentsMapLegendText: string;
  };
  contactInfo: ContentfulContactSection;
}
