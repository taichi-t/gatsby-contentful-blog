import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

//elements
import { Post } from "../components/elements/elements"
import { PostImage } from "../components/elements/elements"
import { PostText } from "../components/elements/elements"
import { PostTitle } from "../components/elements/elements"
import { PostDiscription } from "../components/elements/elements"

import Layout from "../components/layout"
import SEO from "../components/seo"

class VancouverArticles extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulPost.edges

    return (
      <Layout location={this.props.location} title={siteTitle} articles={posts}>
        <SEO title="vancouver" />
        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <Link style={{}} to={`/${node.slug}`}>
              <Post key={node.slug}>
                <PostImage>
                  <Img fluid={node.image.fluid} object />
                </PostImage>
                <PostText>
                  <header>
                    <PostTitle>{title}</PostTitle>
                  </header>
                  <section>
                    <PostDiscription>
                      <p>{node.date}</p>
                      <p>#{node.category}</p>
                    </PostDiscription>
                  </section>
                </PostText>
              </Post>
            </Link>
          )
        })}
      </Layout>
    )
  }
}

export default VancouverArticles

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost(filter: { category: { eq: "vancouver" } }, limit: 10) {
      edges {
        node {
          title
          category
          date(formatString: "YYYY.MM.DD")
          image {
            fluid(maxWidth: 220, maxHeight: 220) {
              ...GatsbyContentfulFluid
            }
          }

          author
          slug
        }
      }
    }
  }
`
