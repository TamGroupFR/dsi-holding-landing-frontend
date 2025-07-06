import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Header from '../components/Header/Header';
import Layout from '../components/Layout/Layout';
import ProjectCards from '../components/ProjectCards/ProjectCards';
import { getSeoMetadata } from '../helpers/getSeoMetadata';
import {
  ProjectPageProps,
  ProjectsPageProps,
} from '../interfaces/projects.interface';
import { PageSeoData } from '../interfaces/seo.interface';

const Projects = ({ data }: PageProps<ProjectsPageProps>) => {
  const {
    navigation,
    navigationMobile,
    footer,
    projectPage: { nodes: projectPageNodes },
    homepage: globalSeoData,
  } = data;

  const projectsPage: ProjectPageProps = projectPageNodes[0];
  const {
    title, projects, slug, seo,
  } = projectsPage;

  const pageData: PageSeoData = {
    title: projectsPage.title,
  };

  return (
    <Layout
      allowBack
      backLink="/"
      darkNavbar
      navigation={navigation}
      navigationMobile={navigationMobile}
      footer={footer}
      seo={getSeoMetadata(globalSeoData, seo, pageData)}
    >
      <div className="py-32">
        <section className="container">
          <Breadcrumbs homeLink="home" />
        </section>
        <section className="container">
          <Header title={title} icon />
        </section>
        <section className="container">
          <ProjectCards projects={projects} url={slug} />
        </section>
      </div>
    </Layout>
  );
};

export default Projects;

export const query = graphql`
  query ($language: String!) {
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
    projectPage: allContentfulProjectsPage(
      filter: { node_locale: { eq: $language } }
    ) {
      nodes {
        title
        slug
        seo {
          title
          description
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        projects {
          title
          slug
          mainTitle {
            raw
          }
          images {
            gatsbyImageData(placeholder: BLURRED)
            title
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
