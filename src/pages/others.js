import React from "react"
import { useStaticQuery, graphql } from "gatsby"

//elements
import { GridLayout } from "../components/elements/GridLayout"

export const Others = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPost(filter: { category: { eq: "その他" } }, limit: 10) {
        edges {
          node {
            title
            category
            createdAt(formatString: "YYYY.MM.DD")
            image {
              fluid(maxWidth: 200, maxHeight: 200, quality: 50) {
                ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
            slug
            contentful_id
          }
        }
      }
    }
  `)
  return <GridLayout data={data} title="Others" />
}

export default Others
