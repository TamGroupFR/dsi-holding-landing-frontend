import React from 'react';
import Header from '../Header/Header';
import { HistorySectionProps } from '../../interfaces/company.interface';

interface HistoryProps {
  sectionHeader: string;
  historySection: HistorySectionProps[];
}

const History = ({ sectionHeader, historySection }: HistoryProps) => {
  const renderTimeLine = historySection.map(({ description, title }, index) => {
    const isEven = index % 2 === 0;

    return (
      <div
        className={`flex md:contents mb-10 md:mb-0 ${
          isEven && ' flex-row-reverse'
        }`}
        key={title}
      >
        {isEven && (
          <div className="md:col-start-1 md:col-end-5 p-4 my-4 ml-auto border">
            <p className="">{description.description}</p>
          </div>
        )}
        <div className="md:col-start-5 md:col-end-6 md:mx-auto relative">
          <div className="h-full w-0.5 flex items-center justify-center hidden md:flex">
            <div
              className={`${
                index === historySection.length - 1
                  ? 'h-1/2 relative -top-1/4'
                  : 'h-full'
              } w-1  bg-primary`}
            />
          </div>
          <div className="absolute top-0.5 md:top-1/2 md:-left-6 -mt-3 bg-primary text-white py-0.5 px-2 z-10">
            {title}
          </div>
          <div
            className={`absolute top-1/2 -mt-3 bg-primary w-9 lg:w-16 h-0.5 z-0 hidden md:flex ${
              isEven
                ? 'right-1.5 lg:right-2 translate-y-3 lg:translate-x-1'
                : 'left-1.5 translate-y-3 lg:-translate-x-0.5'
            }`}
          />
        </div>
        {!isEven && (
          <div className="col-start-6 col-end-10 p-4 my-4 ml-auto border">
            <p className="">{description.description}</p>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="py-8">
      <section className="container">
        <Header title={sectionHeader} icon />
      </section>
      <section className="container mt-8 md:mt-0">
        <div className="arrow" />
        <div className="flex flex-col md:grid grid-cols-9 mx-auto text-body-14">
          {renderTimeLine}
        </div>
      </section>
    </div>
  );
};

export default History;
