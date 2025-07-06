require('dotenv').config({
  path: '.env'
});

const languages = ['fr-FR'];

const queriesEn = [];
const queriesFr = [];

languages.forEach((language) => {
  const productsSearchQuery = `
     {
      allContentfulProduct(filter: { node_locale: { eq: "${language}" } }) {
        nodes {
          name
          id
          slug
          subcategory {
            name
            slug
            category {
              name
              slug
            }
          }
          internal {
            contentDigest
          }
        }
      }
    }
  `;

  const categoriesSearchQuery = `
     {
      allContentfulCategory(filter: { node_locale: { eq: "${language}" } }) {
        nodes {
          name
          id
          slug
          internal {
            contentDigest
          }
        }
      }
    }
  `;

  const catalogsSearchQuery = `
     {
      allContentfulDownload(filter: { node_locale: { eq: "${language}" } }) {
        nodes {
          id
          title
          slug
          internal {
            contentDigest
          }
        }
      }
    }
  `;

  const queriesSet = language === 'en-US' ? queriesEn : queriesFr;

  queriesSet.push(
    {
      query: productsSearchQuery,
      transformer: ({ data }) =>
        data.allContentfulProduct.nodes.map((node) => ({
          type: 'product',
          objectID: node.id,
          ...node
        }))
    },
    {
      query: categoriesSearchQuery,
      transformer: ({ data }) =>
        data.allContentfulCategory.nodes.map((node) => ({
          type: 'category',
          objectID: node.id,
          ...node
        }))
    },
    {
      query: catalogsSearchQuery,
      transformer: ({ data }) =>
        data.allContentfulDownload.nodes.map((node) => ({
          type: 'catalog',
          objectID: node.id,
          ...node
        }))
    }
  );
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.yourdomain.tld',
    title: 'TAM',
    description:
      'Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus.'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-188402795-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        defer: true,
        enableWebVitalsTracking: true
      }
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['roboto', 'roboto:300,400,500,700,900'],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: 'jsx',
        allExtensions: true
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/locales`,
        name: 'locale'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/brands/content`,
        name: 'brands'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/documents`,
        name: 'documents'
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: ['fr-FR'],
        defaultLanguage: 'fr-FR',
        siteUrl: 'https://example.com/',
        i18nextOptions: {
          nsSeparator: false,
          defaultNS: 'translations'
        }
      }
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries: queriesEn,
        searchableAttributes: ['name', 'title'],
        chunkSize: 10000,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_EN
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries: queriesFr,
        searchableAttributes: ['name', 'title'],
        chunkSize: 10000,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_FR
      }
    }
  ]
};
