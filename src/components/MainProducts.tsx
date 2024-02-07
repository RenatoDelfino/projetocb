"use client"
import { useUser } from "@/context/userContext"
import { listMainCategories } from "@/graphql/queries/listMainCategories"
import { useQuery } from "@tanstack/react-query"
import { Product, ProductSkeleton } from "./Product"

export function MainProducts() {
  const { user } = useUser()

  const { data, isLoading: CategoriesLoading } = useQuery({
    queryKey: ["main_products", user],
    queryFn: () => listMainCategories()
  })

  return (
    CategoriesLoading ? (
      <>
        <LoadingProducts />
        <LoadingProducts />
      </>
    ) : (
      data.categories.map((category: any) => {
        return (
          category.products.length > 0 && (
            <div
              className="flex flex-col gap-4 mb-12"
              key={category.slug}
            >
              <strong className="text-blue-800 font-bold text-3xl">
                {category.name}
              </strong>

              <div className="flex gap-2 overflow-scroll overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {category.products.map((product: any) => (
                  <Product
                    product={product}
                    key={product.id}
                  />
                ))}
              </div>
            </div>
          )
        )
      })
    )
  )
}

function LoadingProducts() {
  return (
    <div className="flex flex-col gap-4 mb-12">
      <strong className="w-64 h-8 bg-black/5" />

      <div className="flex gap-2 overflow-scroll overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: 5 }).map((_: any, index: number) => (
          <ProductSkeleton
            key={index}
          />
        ))}
      </div>
    </div>
  )
}