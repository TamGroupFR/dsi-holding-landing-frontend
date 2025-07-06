import React, { FC } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import Testimonial from '../../components/Testimonial/Testimonial';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

export interface TestimonialData {
  review: {
    review: string;
  };
  companyPosition: string;
  reviewerName: string;
}
interface TestimonialsSectionProps {
  testimonials: TestimonialData[];
}

const TestimonialsSection: FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  const { t } = useTranslation();

  return (
    <section className="container grid-layout">
      <div className="col-span-4 md:col-span-8 lg:col-span-12 mt-5 md:mt-10 lg:mt-12">
        <div className="grid-layout gap-y-4">
          {testimonials.map(
            ({ review: { review }, companyPosition, reviewerName }) => (
              <div className="col-span-4 lg:col-span-6" key={review}>
                <div className="max-w-lg mx-auto">
                  <Testimonial
                    text={review}
                    title={companyPosition}
                    author={reviewerName}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
