import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const listCategoriesQuery = gql`
  query Categories {
    categories {
      id
      imagem {
        url
      }
      name
      slug
    }
  }
`


export const listPopularCategories = async () =>
  await client.request<any>(listCategoriesQuery)