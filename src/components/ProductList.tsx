"use clients"
import { useQuery } from "@tanstack/react-query";

import { listMainProducts } from "@/graphql/queries/listMainProducts";

import { Product, ProductSkeleton } from "./Product";

export function ProductList() {
  const { data, isLoading: loadingProducts } = useQuery({
    queryKey: ["main_products"],
    queryFn: () => listMainProducts()
  })

  return (
    <section className="mt-12 w-full flex flex-col gap-4">
      <h3 className="text-blue-500 font-extra-bold mb-2 text-xl">Acreditamos que você pode gostar</h3>

      <div className="flex items-center gap-2 w-full overflow-scroll [&::-webkit-scrollbar]:hidden">
        {loadingProducts ? (
          <ProductSkeleton />
        ) : (
          data?.products.map((product: any) => (
            <Product
              key={product.slug}
              product={product}
            />
          ))
        )}
      </div>
    </section>
  )
}