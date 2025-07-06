import React from 'react';
import { ProjectProps } from '../../interfaces/projects.interface';
import Project from './Project';

interface ProjectCardsProps {
  projects: ProjectProps[];
  url: string;
}

const ProjectCards = ({
  projects, url,
}: ProjectCardsProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-5 md:gap-5 lg:gap-6 mx-auto md:mx-0">
    {projects.map(({
      title, slug, images, mainTitle,
    }) => {
      const image = images ? images[0].gatsbyImageData : undefined;
      return (
        <Project
          key={title}
          title={title}
          link={`/${url}/${slug}`}
          mainTitle={mainTitle}
          image={image}
        />
      );
    })}
  </div>
);

export default ProjectCards;
