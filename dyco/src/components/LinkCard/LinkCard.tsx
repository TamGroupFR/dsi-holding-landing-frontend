import { Link } from 'gatsby';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import React from 'react';

interface LinkCardProps {
  link: string;
  name: string;
  image?: IGatsbyImageData;
}

const LinkCard = ({ link, name, image }: LinkCardProps) => (
  <Link to={link} key={name} className="max-w-[292px] flex flex-col group">
    <div className="p-4 h-[150px] lg:h-[310px] border-t border-r border-l border-color-100 rounded-t flex items-center">
      {image && (
        <GatsbyImage
          image={image}
          alt={name}
          className="w-full object-cover  h-full max-h-[170px]"
          objectFit="contain"
          objectPosition="50% 50%"
        />
      )}
    </div>
    <div
      className="text-subtitle-12 lg:text-subtitle-16 p-2 lg:px-4 bg-dark-navy text-white h-[52px] lg:h-[84px]
      flex justify-center items-center border-b border-r border-l border-dark-navy rounded-b group-hover:bg-primary group-hover:border-primary"
    >
      <span className="text-center truncate-lines-2">{name}</span>
    </div>
  </Link>
);

export default LinkCard;
