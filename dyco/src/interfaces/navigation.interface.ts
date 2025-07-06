export interface NavigationProps {
  nodes: {
    buttonHome: string;
    links: {
      name: string;
      url: string;
    }[];
  }[];
}

export interface NavigationMobileProps {
  nodes: {
    buttonHome: string;
    links: {
      name: string;
      url: string;
    }[];
    buttonContact: {
      name: string;
      url: string;
    };
  }[];
}
