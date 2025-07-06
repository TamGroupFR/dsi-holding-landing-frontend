import React, { FC } from 'react';

interface Props {
  text: string;
  title: string;
  author: string;
}

const Testimonial: FC<Props> = ({ text, title, author }) => {
  return (
    <div>
      <img src="/img/quote.svg" alt="" />
      <div className="flex flex-col items-center text-center mt-4 md:mt-8">
        <p className="text-body-16 md:text-body-18 lg:text-body-20 font-medium">{text}</p>
        <p className="text-body-14 md:text-body-16 text-primary font-bold mt-5">{title}</p>
        <p className="text-body-12 md:text-body-14 mt-1">{author}</p>
      </div>
    </div>
  );
};

export default Testimonial;
