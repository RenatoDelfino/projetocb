import { client } from '@/lib/graphql'
import { gql } from 'graphql-request'

const productsQuery = gql`
  fragment product on Product {
    id
    name
    slug
    image {
      url
    }
    coupon {
      discount
    }
    reviews {
      stars
    }
    price
  }

  query Products($slug: String!) {
    categories(
      where: {slug: $slug},
      first: 1
    ) {
      id
      name
      products {
        ... product
      }
    }
  }
`


interface ListProductsProps {
  slug: string
}

export const listProductsByCategory = async ({ slug }: ListProductsProps) => {
  return await client.request<any>(productsQuery, { slug })
}
