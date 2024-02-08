"use client"
import { useQuery } from "@tanstack/react-query";
import { Product, ProductSkeleton } from "./Product";
import { listProductsInPromotion } from "@/graphql/queries/listProductsInPromotion";
import { useEffect, useState } from "react";

export function ListProductsInPromotion() {
  const [mount, setMount] = useState(false)

  const { data, isLoading: loadingProducts } = useQuery({
    queryKey: ["products_in_promotions"],
    queryFn: () => listProductsInPromotion(),
  });

  useEffect(() => {
    setMount(true)
  }, [])

  return mount && (
    <section className="w-full flex flex-col gap-4">
      <strong className="text-blue-800 font-bold text-3xl">
        Produtos promocionais
      </strong>

      <div className="flex items-center gap-2 w-full overflow-scroll [&::-webkit-scrollbar]:hidden">
        {loadingProducts ? (
          <ProductSkeleton />
        ) : (
          data?.products.map((product: any) => (
            <Product key={product.slug} product={product} />
          ))
        )}
      </div>
    </section>
  );
}
