export interface DownloadProps {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  file: {
    size: number;
    url: string;
  };
  thumbnail: {
    file: {
      url: string;
    };
  };
}
