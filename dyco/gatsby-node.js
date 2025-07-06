const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { data: categories } = await graphql(`
    query Categories {
      allCategories: allContentfulCategory {
        nodes {
          slug
          subcategories {
            slug
          }
        }
      }
    }
  `);

  const { data: products } = await graphql(`
    query Products {
      allContentfulProduct {
        nodes {
          slug
          subcategory {
            name
            slug
            category {
              name
              slug
            }
          }
        }
      }
    }
  `);

  const { data: productPage } = await graphql(`
    query Productpage {
      allContentfulProductPage {
        nodes {
          slug
          productsIndex {
            name
            url
          }
        }
      }
    }
  `);

  const { data: projectsPage } = await graphql(`
    query ProjectsPage {
      allContentfulProjectsPage {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: projects } = await graphql(`
    query Project {
      allContentfulProject {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: animationsPage } = await graphql(`
    query AnimationsPage {
      allContentfulAnimationsPage {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: downloadsPage } = await graphql(`
    query DownloadsPage {
      allContentfulDownloadLibrary {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: contact } = await graphql(`
    query Contactpage {
      allContentfulContactSection {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: company } = await graphql(`
    query Contactpage {
      allContentfulCompanyPage {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: manageCookies } = await graphql(`
    query ManageCookiesPage {
      allContentfulManageCookiesPage {
        nodes {
          slug
        }
      }
    }
  `);

  company.allContentfulCompanyPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/companyPage.tsx'),
      context: { slug },
    });
  });

  contact.allContentfulContactSection.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/contactPage.tsx'),
      context: { slug },
    });
  });

  projectsPage.allContentfulProjectsPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/allProjects.tsx'),
      context: { slug },
    });
  });

  projects.allContentfulProject.nodes.forEach(({ slug }) => {
    projectsPage.allContentfulProjectsPage.nodes.forEach(
      ({ slug: projectsPageSlug }) => {
        actions.createPage({
          path: `/${projectsPageSlug}/${slug}`,
          component: path.resolve('./src/templates/singleProject.tsx'),
          context: { slug },
        });
      },
    );
  });

  animationsPage.allContentfulAnimationsPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/allAnimations.tsx'),
      context: { slug },
    });
  });

  manageCookies.allContentfulManageCookiesPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/manageCookiesPage.tsx'),
      context: { slug },
    });
  });

  downloadsPage.allContentfulDownloadLibrary.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/downloadLibrary.tsx'),
      context: { slug },
    });
  });

  categories.allCategories.nodes.forEach((category) => {
    productPage.allContentfulProductPage.nodes.forEach((node) => {
      actions.createPage({
        path: `/${node.slug}/${category.slug}`,
        component: path.resolve('./src/templates/allProducts.tsx'),
        context: { slug: category.slug },
      });
    });
  });

  productPage.allContentfulProductPage.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: path.resolve('./src/templates/allProducts.tsx'),
      context: { slug: node.slug },
    });
  });

  productPage.allContentfulProductPage.nodes.forEach((node) => {
    actions.createPage({
      path: `/${node.slug}/${node.productsIndex.url}`,
      component: path.resolve('./src/templates/allProducts.tsx'),
      context: { slug: node.productsIndex.url },
    });
  });

  categories.allCategories.nodes.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      productPage.allContentfulProductPage.nodes.forEach((node) => {
        actions.createPage({
          path: `/${node.slug}/${category.slug}/${subcategory.slug}`,
          component: path.resolve('./src/templates/allProducts.tsx'),
          context: { slug: subcategory.slug },
        });
      });
    });
  });

  products.allContentfulProduct.nodes.forEach((product) => {
    const categorySlug = product.subcategory.category[0].slug;
    const subcategorySlug = product.subcategory.slug;
    productPage.allContentfulProductPage.nodes.forEach((node) => {
      actions.createPage({
        path: `/${node.slug}/${categorySlug}/${subcategorySlug}/${product.slug}`,
        component: require.resolve('./src/templates/allProducts.tsx'),
        context: {
          slug: product.slug,
        },
      });
    });
  });
};

// Contentful doesn't send the types of the empty structures, so we need to create them manually
// There's a way to generate the types automatically, which simplifies the process:
// https://stackoverflow.com/a/64099825

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type ContentfulCompanyPage implements Node {
      seo: ContentfulSeo @link(by: "id", from: "seo___NODE")
      contactArea: ContentfulContactArea @link(by: "id", from: "contactArea___NODE")
      capacity: ContentfulCapacity @link(by: "id", from: "capacity___NODE")
      calculation: ContentfulCalculation @link(by: "id", from: "calculation___NODE")
      profiles: ContentfulProfiles @link(by: "id", from: "profiles___NODE")
      eurocodeTitle: String
      productionTitle: String
      productionItems: [ContentfulDescription] @link(by: "id", from: "productionItems___NODE")
      certificatesTitle: String
      certificateColumnsTitle: [String]
      certificatesItems: [ContentfulCertificates] @link(by: "id", from: "certificatesItems___NODE")
    }
  `;

  createTypes(typeDefs);
};
