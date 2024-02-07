import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  query Categories {
    categories {
      id
      name
      slug
    }
  }
`

export const listCategories = async () =>
  await client.request<any>(productsQuery)