import React from 'react';

import { EurocodeDataProps } from '../../interfaces/eurocode.interface';
import Header from '../Header/Header';
import EuroCodeCalculation from './components/EuroCodeCalculation';
import EuroCodeCapacity from './components/EuroCodeCapacity';
import EuroCodeContact from './components/EuroCodeContact';
import EuroCodeProfiles from './components/EuroCodeProfiles';

const EuroCode = ({
  eurocodeTitle,
  contactArea,
  capacity,
  calculation,
  profiles,
  productsLink,
}: EurocodeDataProps) => {
  if (!(eurocodeTitle || contactArea || capacity || calculation || (profiles && productsLink))) {
    return null;
  }

  return (
    <div className="py-12">
      <section className="container">
        {eurocodeTitle && <Header title={eurocodeTitle} icon /> }
        {contactArea && <EuroCodeContact contactArea={contactArea} />}
        <div className="flex flex-col gap-8 lg:gap-4 mb-12">
          <div className="flex flex-col lg:flex-row">
            {capacity && <EuroCodeCapacity capacity={capacity} />}
            {calculation && <EuroCodeCalculation calculation={calculation} />}
          </div>
          {(profiles && productsLink) && <EuroCodeProfiles profiles={profiles} productsLink={productsLink} />}
        </div>
      </section>
    </div>
  );
};

export default EuroCode;
