import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  query Products {
    products (first: 6) {
      name
      slug
      id
      image {
        url
      }
      reviews {
        stars
      }
      price
      coupon {
        discount
      }
    }
  }
`

export const listMainProducts = async () =>
  await client.request<any>(productsQuery)