import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  mutation publishQuestion($ask: String!, $user: String!, $slug: String!) {
    createQuestion(
      data: {ask: $ask, user: $user, product: {connect: {slug: $slug}}}
    ) {
      id
      ask
      createdAt
      user
    }
  }
`

interface ListProductsProps {
  ask: string;
  slug: string;
  user: string
}

export const publishQuestion = async ({ ask, slug, user }: ListProductsProps) =>
  await client.request<any>(productsQuery, {
    ask,
    user,
    slug
  })