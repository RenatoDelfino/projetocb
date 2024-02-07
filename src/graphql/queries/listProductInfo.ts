import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productQuery = gql`
  query Product ($slug: String!) {
    product(where: { slug: $slug }) {
      id
      image {
        url
      }
      name
      pix
      price
      slug
      checkout
      coupon {
        discount
      }
      technicalSpecifications {
        raw
      }
      dimensions {
        raw
      }
      description {
        raw
      }
      characteristics {
        raw
      }
    }
  }
`

interface IQueryProductProps {
  slug: string
}

export const listProductInfo = async ({ slug }: IQueryProductProps) =>
  await client.request<any>(productQuery, { slug })