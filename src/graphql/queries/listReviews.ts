import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  query Reviews ($slug: String!) {
    reviews(where: {product: {slug: $slug}}) {
      id
      avaliation
      stars
      user
      images {
        id
        url
      }
    }
  }
`

interface ListProductsProps {
  slug: string
}

export const listReviews = async ({ slug }: ListProductsProps) =>
  await client.request<any>(productsQuery, { slug })