import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { IncrementViewCount } from "../utils/common.js"

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
    const handleClick = e => {
      const entryId = e.currentTarget.getAttribute("data-id")
      const prevCount = e.currentTarget.getAttribute("data-count")
      console.log(prevCount)
      IncrementViewCount(entryId, prevCount)
    }

    return (
      <Layout location={this.props.location} title={siteTitle} articles={posts}>
        <SEO title="vancouver" />
        {posts.map(({ node }) => {
          const title = node.title || node.slug
          return (
            <Link
              style={{}}
              to={`/${node.slug}`}
              key={node.slug}
              data-id={node.contentful_id}
              data-count={node.counter["counter"]}
              onClick={handleClick}
            >
              <Post>
                <PostImage>
                  <Img fluid={node.image.fluid} />
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
    allContentfulPost(filter: { category: { eq: "バンクーバー" } }, limit: 10) {
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
          counter {
            counter
          }
          author
          slug
          contentful_id
        }
      }
    }
  }
`