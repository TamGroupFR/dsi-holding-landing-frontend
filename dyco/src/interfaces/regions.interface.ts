export interface RegionProps {
  name?: string;
  phone?: string;
  mobilePhone?: string;
  email: string;
  countries: string[];
}

export interface RegionsProps {
  nodes: {
    title: string;
    variant: 'EU' | 'PL' | 'DACH';
    description?: {
      description: string;
    };
    regions: RegionProps[];
  }[];
}
