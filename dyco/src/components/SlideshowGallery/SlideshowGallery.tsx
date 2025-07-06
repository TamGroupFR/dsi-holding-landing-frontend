import React, { useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { ImageProps } from '../../interfaces/products.interface';
import Button from '../Button/Button';
import arrowWhite from '../../assets/icon/arrow-white.svg';
import arrowBlack from '../../assets/icon/arrow.svg';

const SlideshowGallery = ({ gallery }: {gallery: ImageProps[]}) => {
  const [mainImageIndex, setMainImageIndex] = useState(gallery ? 0 : null);
  const isSlideshowGalleryVisible = gallery && gallery.length > 1;
  const changeImage = (index: number) => () => setMainImageIndex(index);

  const prevImage = () => {
    const prevIndex = mainImageIndex !== null ? mainImageIndex - 1 : null;
    if (prevIndex === null) {
      return;
    }
    setMainImageIndex(prevIndex < 0 ? gallery.length - 1 : prevIndex);
  };
  const nextImage = () => {
    const nextIndex = mainImageIndex !== null ? mainImageIndex + 1 : null;
    if (nextIndex === null) {
      return;
    }
    setMainImageIndex(nextIndex > (gallery.length - 1) ? 0 : nextIndex);
  };

  return (
    <div className="flex flex-col w-full relative">
      {mainImageIndex !== null && (
        <div className="w-full h-[286px] md:h-[380px] lg:h-[485px] border-light-gray border rounded p-2 lg:p-4">
          <GatsbyImage
            image={gallery[mainImageIndex].gatsbyImageData}
            alt={gallery[mainImageIndex].title}
            className="w-full object-contain h-full"
            objectFit="contain"
            objectPosition="50% 50%"
          />
        </div>
      )}
      {isSlideshowGalleryVisible && (
        <>
          <div className="absolute w-full h-full md:hidden">
            <button type="button" className="h-full w-1/5" onClick={prevImage}>
              <img src={arrowBlack} alt="prev" className="max-w-none w-6 rotate-90" />
            </button>
            <div className="absolute w-full left-1/2 bottom-3 translate-x-[-50%] flex gap-1 flex-wrap justify-center">
              {gallery.map((image: ImageProps, index) => {
                const border = index === mainImageIndex ? 'border-primary border-4' : 'border-light-gray border-2';
                return (
                  <button
                    key={image.title}
                    type="button"
                    className={`${border} rounded-full hover:border-primary w-[15px] h-[15px]`}
                    onClick={changeImage(index)}
                  >
                    {' '}
                  </button>
                );
              })}
            </div>
            <button type="button" className="absolute h-full w-1/5 right-0" onClick={nextImage}>
              <img src={arrowBlack} alt="next" className="max-w-none w-6 rotate-[270deg] mr-0 ml-auto" />
            </button>
          </div>
          <div className="gap-2 mt-4 justify-center hidden md:flex">
            <Button className="w-min px-0 h-[50px}] lg:h-[80px]" onClick={prevImage}>
              <img src={arrowWhite} alt="prev" className="max-w-none w-6 rotate-90" />
            </Button>
            <div className="flex gap-1 flex-wrap justify-center">
              {gallery.map((image: ImageProps, index) => {
                const border = index === mainImageIndex ? 'border-primary' : 'border-light-gray';
                return (
                  <button
                    key={image.title}
                    type="button"
                    className={`${border} border rounded hover:border-primary h-[50px}] w-[50px] lg:h-[80px] lg:w-[80px]`}
                    onClick={changeImage(index)}
                  >
                    <GatsbyImage
                      image={image.gatsbyImageData}
                      alt={image.title}
                      className="w-full object-contain h-full"
                      objectFit="contain"
                      objectPosition="50% 50%"
                    />
                  </button>
                );
              })}
            </div>
            <Button className="w-min px-0 h-[50px}] lg:h-[80px]" onClick={nextImage}>
              <img src={arrowWhite} alt="next" className="max-w-none w-6 rotate-[270deg]" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SlideshowGallery;
