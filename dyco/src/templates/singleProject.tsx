import {
  BLOCKS,
  MARKS,
  Node,
} from '@contentful/rich-text-types';
import { PageProps, graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import SlideshowGallery from '../components/SlideshowGallery/SlideshowGallery';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import { richTextOptions } from '../helpers/richTextOptions';
import {
  ProjectProps,
  SingleProjectPageProps,
} from '../interfaces/projects.interface';
import { PageSeoData } from '../interfaces/seo.interface';

const singleProjectRichTextOptions = {
  renderMark: {
    ...richTextOptions.renderMark,
    [MARKS.BOLD]: (children: React.ReactNode) => {
      return <b className="text-body-16 mb-1">{children}</b>;
    },
  },
  renderNode: {
    ...richTextOptions.renderNode,
    [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => {
      return (
        <h2 className="mt-2 mb-2 font-bold text-xl md:text-2xl">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => {
      return (
        <h2 className="mt-2 mb-2 font-semibold text-lg md:text-xl">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => {
      return <h3 className="mt-2 mb-2 font-semibold text-base md:text-xl">{children}</h3>;
    },
    [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => {
      return <p className="text-body-16 mb-1">{children}</p>;
    },
  },
};

const Projects = ({ data }: PageProps<SingleProjectPageProps>) => {
  const {
    navigation,
    navigationMobile,
    footer,
    project: { nodes },
    homepage: globalSeoData,
  } = data;

  const project: ProjectProps = nodes[0];

  const pageData: PageSeoData = {
    title: project.title,
    image: project.images?.[0].gatsbyImageData,
  };

  return (
    <Layout
      allowBack
      backLink="/"
      darkNavbar
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, project.seo, pageData)}
    >
      <div className="py-32">
        <section className="container">
          <Breadcrumbs homeLink="home" />
        </section>
        <section className="container flex gap-8 flex-col lg:flex-row-reverse">
          <div className="lg:w-[380px]">
            <p className="mb-1">{project.localization}</p>
            <Header title={project.title} icon />
            {project.desc && renderRichText(project.desc, singleProjectRichTextOptions)}
          </div>
          <div className="lg:w-[calc(100%-412px)]">
            {project.images?.length && (
              <SlideshowGallery gallery={project.images} />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Projects;

export const query = graphql`
  query ($language: String!, $slug: String) {
    navigation: allContentfulNavigation(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        links {
          name
          url
        }
        buttonHome
      }
    }
    navigationMobile: allContentfulNavigationMobile(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        links {
          name
          url
        }
        buttonContact {
          name
          url
        }
      }
    }
    footer: allContentfulFooter(filter: { node_locale: { eq: $language } }) {
      nodes {
        allRights
        company
        contact
        email {
          url
          name
        }
        language
        phone {
          url
          name
        }
        links {
          url
          name
        }
        socialLinks {
          url
          name
        }
        termsLinks {
          url
          title
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    project: allContentfulProject(filter: { slug: { eq: $slug } }) {
      nodes {
        title
        slug
        localization
        images {
          gatsbyImageData(placeholder: BLURRED)
          title
        }
        desc {
          raw
        }
        mainTitle {
          raw
        }
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
    homepage: allContentfulHomepage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
