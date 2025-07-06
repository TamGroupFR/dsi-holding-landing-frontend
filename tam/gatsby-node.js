const path = require('path');

const findObjectBySubsubcategoryName = (categories, subsubcategoryName) => {
  const foundObject = categories
    .flatMap((category) => {
      return category.subcategories.map((subcategory) => ({
        category: category.slug,
        subcategory: subcategory.slug,
        subsubcategory: subcategory.subcategories
          ? subcategory.subcategories.find(
              (subsubcategory) => subsubcategory.name === subsubcategoryName
            )
          : undefined,
      }));
    })
    .find((obj) => obj.subsubcategory);

  return foundObject;
};

exports.createPages = async ({ graphql, actions }) => {
  const { data: categories } = await graphql(`
    query Categories {
      allContentfulCategory {
        nodes {
          name
          slug
          subcategories {
            slug
            name
            subcategories {
              slug
              name
            }
          }
        }
      }
    }
  `);

  const { data: allproducts } = await graphql(`
    query Categories {
      contentfulProductsPage {
        productsIndex {
          url
          name
        }
        slug
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

  const { data: policies } = await graphql(`
    query Policies($locale: String) {
      allContentfulPolicyPage(filter: { node_locale: { eq: $locale } }) {
        nodes {
          slug
        }
      }
    }
  `);

  const { data: search } = await graphql(`
    query Search {
      contentfulSearchPage {
        slug
      }
      allContentfulSearchPage {
        nodes {
          slug
        }
      }
    }
  `);

  policies.allContentfulPolicyPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/templates/policy.tsx'),
      context: { slug },
    });
  });

  actions.createPage({
    path: `/${allproducts.contentfulProductsPage.slug}`,
    component: path.resolve('./src/pages/products.tsx'),
    context: { slug: allproducts.contentfulProductsPage.slug },
  });

  search.allContentfulSearchPage.nodes.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: path.resolve('./src/pages/search.tsx'),
      context: { slug },
    });
  });

  categories.allContentfulCategory.nodes.forEach((category) => {
    actions.createPage({
      path: `/${allproducts.contentfulProductsPage.slug}/${category.slug}`,
      component: path.resolve('./src/pages/products.tsx'),
      context: { slug: category.slug },
    });
  });

  actions.createPage({
    path: `/${allproducts.contentfulProductsPage.slug}/${allproducts.contentfulProductsPage.productsIndex.url}`,
    component: path.resolve('./src/pages/products.tsx'),
    context: { slug: allproducts.contentfulProductsPage.productsIndex.url },
  });

  categories.allContentfulCategory.nodes.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      actions.createPage({
        path: `/${allproducts.contentfulProductsPage.slug}/${category.slug}/${subcategory.slug}`,
        component: path.resolve('./src/pages/products.tsx'),
        context: { slug: subcategory.slug },
      });
    });
  });

  categories.allContentfulCategory.nodes.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      if (subcategory.subcategories) {
        subcategory.subcategories.forEach((subsubcategory) => {
          actions.createPage({
            path: `/${allproducts.contentfulProductsPage.slug}/${category.slug}/${subcategory.slug}/${subsubcategory.slug}`,
            component: path.resolve('./src/pages/products.tsx'),
            context: { slug: subsubcategory.slug },
          });
        });
      }
    });
  });

  products.allContentfulProduct.nodes.forEach((product) => {
    const category =
      product.subcategory.category === null &&
      findObjectBySubsubcategoryName(
        categories.allContentfulCategory.nodes,
        product.subcategory.name
      );
    const pathName =
      product.subcategory.category === null
        ? `/${allproducts.contentfulProductsPage.slug}/${category?.category}/${category?.subcategory}/${category?.subsubcategory?.slug}/${product.slug}`
        : `/${allproducts.contentfulProductsPage.slug}/${product.subcategory.category[0].slug}/${product.subcategory.slug}/${product.slug}`;
    actions.createPage({
      path: pathName,
      component: require.resolve('./src/pages/product.tsx'),
      context: {
        slug: product.slug,
      },
    });
  });
};
