import { LayoutProps } from './layout.interface';
import { GlobalSeoData, Seo } from './seo.interface';

export interface DownloadProps {
  id: string;
  title?: string;
  slug?: string;
  updatedAt?: string;
  file?: {
    size: number;
    url: string;
  };
  thumbnail?: {
    file: {
      url: string;
    };
  };
}

export interface File {
  id: string;
  title: string;
  slug: string;
  file: {
    url: string;
  };
}

export interface TabData {
  title: string;
  id: string;
  files: File[];
}

interface DownloadData {
  title: string;
  tabs: TabData[];
  downloadButtonText: string;
  shareButtonText: string;
  columnNameText: string;
  seo?: Seo;
}

export interface DownloadLibraryData extends LayoutProps {
  downloadsPage: {
    nodes: DownloadData[];
  }
  homepage: GlobalSeoData;
}
