export interface FooterProps {
  nodes: {
    allRights: string;
    company: string;
    contact: string;
    email: {
      url: string;
      name: string;
    };
    language: string;
    phone: {
      url: string;
      name: string;
    };
    links: {
      url: string;
      name: string;
    }[];
    socialLinks: {
      url: string;
      name: string;
    }[];
    termsLinks: {
      url: string;
      title: string;
    }[];
  }[];
}
