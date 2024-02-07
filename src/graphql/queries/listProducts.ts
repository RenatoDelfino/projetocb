import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const products = gql`
  query Products  {
    products {
      name
      image {
        url
      }
      price
      pix
      slug
      coupon {
        discount
      }
    }
  }
`

export const listProducts = async () => {
  return await client.request<any>(products);
}