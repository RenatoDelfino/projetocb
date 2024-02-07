"use client"
import { useQuery } from "@tanstack/react-query";

import { useUser } from "@/context/userContext";
import { listProductsByCategory } from "@/graphql/queries/listProductsByCategory";

import { Product, ProductSkeleton } from "@/components/Product";

export default function Products({ params }: any) {
  const { user } = useUser()

  const { data, isLoading: loadingProducts } = useQuery({
    queryKey: ["products_category", user, params.slug],
    queryFn: () => listProductsByCategory({ slug: params.slug })
  })

  const productsByCategory = data?.categories[0]

  return (
    <>
      <main className="max-w-7xl px-4 mx-auto flex flex-col mt-8 w-full">
        {loadingProducts ? (
          <strong className="w-48 rounded-md h-8 bg-black/10" />
        ) : (
          <strong className="text-blue-800 font-medium text-3xl">{productsByCategory?.name}</strong>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {loadingProducts ? (
              <span className="block w-48 bg-black/10 h-4 mt-4" />
            ) : (
              <span className="text-sm">{(productsByCategory?.products?.length || 0).toString().padStart(2, "0")} produtos encontrados</span>
            )}
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <ProductSkeleton />
            </div>
          ) : productsByCategory?.products?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {productsByCategory?.products?.map((product: any) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center mt-12 text-gray-500">Nenhum produto encontrado</div>
          )}
        </div>
      </main >
    </>
  )
}

