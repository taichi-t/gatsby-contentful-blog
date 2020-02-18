const path = require(`path`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)
  const categoryVancouver = path.resolve(`./src/pages/vancouver.js`)
  const categoryTech = path.resolve(`./src/pages/tech.js`)
  const categoryOthers = path.resolve(`./src/pages/others.js`)
  const result = await graphql(
    `
      {
        allContentfulPost {
          edges {
            node {
              title
              subtitle
              author
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allContentfulPost.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
    createPage({
      path: "/category/vancouver",
      component: categoryVancouver,
    })
    createPage({
      path: "/category/tech",
      component: categoryTech,
    })
    createPage({
      path: "/category/others",
      component: categoryOthers,
    })
  })
}
