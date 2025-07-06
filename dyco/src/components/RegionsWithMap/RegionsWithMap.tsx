import React, { useState } from 'react';
import EuropeMap from '../EuropeMap/EuropeMap';
import RegionTile from '../RegionTile/RegionTile';
import { RegionProps } from '../../interfaces/regions.interface';
import PolandMap from '../PolandMap/PolandMap';
import DachMap from '../DachMap/DachMap';

export interface RegionsWithMapProps {
  regions: RegionProps[];
  variant: string;
}

const RegionsWithMap = ({ regions, variant }: RegionsWithMapProps) => {
  const [highlightedRegions, setHighlightedRegions] = useState<string[]>([]);

  const renderMap = () => {
    switch (variant) {
      case 'EU':
        return <EuropeMap highlightedRegions={highlightedRegions} />;
      case 'PL':
        return <PolandMap highlightedRegions={highlightedRegions} />;
      case 'DACH':
        return <DachMap highlightedRegions={highlightedRegions} />;
      default:
        return <EuropeMap highlightedRegions={highlightedRegions} />;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-x-8 relative z-0">
      <div className="flex-grow grid md:grid-cols-2 gap-x-8 gap-y-6 auto-rows-max">
        {regions.map(({ name, phone, email, countries, mobilePhone }) => (
          <RegionTile
            key={email}
            name={name}
            phone={phone}
            email={email}
            mobilePhone={mobilePhone}
            onMouseEnter={() => setHighlightedRegions(countries)}
            onMouseLeave={() => setHighlightedRegions([])}
          />
        ))}
      </div>
      <div
        className="flex-grow hidden md:block opacity-20 lg:opacity-100 absolute -z-10
        lg:z-auto lg:static w-full h-full md:top-1/2 lg:top-0 md:left-1/2 lg:left-0
        md:transform md:-translate-x-1/2 lg:translate-x-0 md:-translate-y-1/2
        lg:translate-y-0"
      >
        {renderMap()}
      </div>
    </div>
  );
};

export default RegionsWithMap;
