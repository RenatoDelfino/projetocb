import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const categoriesQuery = gql`
  query Questions ($slug: String!) {
    questions(where: {product: {slug: $slug}}) {
      id
      ask
      response
      user
      created:createdAt
    }
  }
`

export const listQuestions = async ({ slug }: any) =>
  await client.request<any>(categoriesQuery, { slug })