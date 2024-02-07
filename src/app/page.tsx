'use client'

import { Banners } from "@/components/Banners";
import { Categories } from "@/components/PopularCategories";
import { MainProducts } from "@/components/MainProducts";
import { ListProductsInPromotion } from "@/components/ProductsInPromotion";
import { useUser } from "@/context/userContext";

export default function Products() {
  const { user } = useUser()

  return (
    <>
      <Banners />
      <main className="max-w-7xl px-4 mx-auto flex flex-col gap-4 mt-8 w-full">
        {user?.birthday && <ListProductsInPromotion />}
        <MainProducts />
        <Categories />
      </main >
    </>
  )
}

