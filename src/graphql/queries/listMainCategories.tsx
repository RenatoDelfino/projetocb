import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const listMainCategoriesQuery = gql`
  query MainCategories {
    categories(first: 4, where: {products_empty: false}) {
      id
      slug
      name
      products {
        ... on Product {
          id
          name
          image {
            url
          }
          reviews {
            stars
          }
          price
          pix
          slug
          coupon {
            discount
          }
        }
      }
    }
  }
`


export const listMainCategories = async () =>
  await client.request<any>(listMainCategoriesQuery)