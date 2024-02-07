import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  query Products {
    products(where: {coupon: {discount_gt: 0}}) {
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

export const listProductsInPromotion = async () =>
  await client.request<any>(productsQuery)