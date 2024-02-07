"use client"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";

import { formatPrice } from "@/utils/format-price";
import { formatDiscountPrice } from "@/utils/format-discount";

import { listProductInfo } from "@/graphql/queries/listProductInfo";

import { ModalTechnicalProductDetails } from "@/components/ModalTechnicalProductDetails";
import { ProductList } from "@/components/ProductList";
import { Avaliations } from "@/components/Avaliations"
import { Questions } from "@/components/Questions";
import { Address } from "@/components/Address";
import { useUser } from "@/context/userContext";

export default function Home({ params }: any) {
  const { user } = useUser()

  const { data, isLoading: productLoading } = useQuery({
    queryKey: ["product_info", params.slug],
    queryFn: () => listProductInfo({ slug: params.slug })
  })

  const product = {
    ...data?.product,
    coupon: user?.birthday ? data?.product.coupon : null
  }

  const discount = user?.birthday ? product.coupon?.discount : 0;
  const productPriceFormatted = formatDiscountPrice(discount, product.price)
  const discountOnPix = Math.floor(product.pix ? (product.price - product.pix) / product.price * 100 : 0)

  return (
    <>
      <main className="max-w-7xl px-4 mx-auto flex flex-col gap-8">
        {productLoading ? (
          <LoadingProduct />
        ) : (
          <section className="grid lg:grid-cols-product-detail gap-4 mt-8 w-full">
            <div className="w-full h-full flex justify-center items-center">
              <Image
                src={product.image?.url}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto max-h-[100%]"
              />
            </div>

            <div className="flex-1 md:flex-col">
              <div className="border-dashed border-b-2 border-[#CCCCCC] mb-4 pb-4 ">
                <h3 className="text-gray-600 text-2xl">{product.name}</h3>

                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex items-center gap-2">
                    <p className={`${user?.birthday && "line-through"}`}>{formatPrice(product.price)}</p>
                    {user?.birthday && product.coupon?.discount && <span className="bg-[#1E730D] text-white text-xs p-1 rounded-sm">- {product.coupon?.discount}%</span>}
                  </div>

                  <p className="mt-1 text-sm">
                    {formatPrice(productPriceFormatted)} em até 10x de {formatPrice(productPriceFormatted / 10)} sem juros.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between md:flex-row md:items-start ">
                <div className="flex gap-2 items-start flex-col flex-1">
                  <strong className="text-[#0033C6] text-2xl block">{formatPrice(product.pix ?? productPriceFormatted)}</strong>
                  {product.pix > 0 && <span> no Pix com {discountOnPix}% de desconto</span>}
                </div>

                <a
                  href={product.checkout}
                  target="_blank"
                  className="bg-[#1E730D] text-white py-3 rounded-md font-bold w-full mt-4 md:mt-0 md:max-w-64 hover:bg-[#1E730D]/95s transition-all flex justify-center items-center"
                >
                  Comprar
                </a>
              </div>

              <Address />
            </div>
          </section >
        )}

        <ModalTechnicalProductDetails />
        <ProductList />
        <Avaliations />
        <Questions />
      </main >

      <footer className="bg-[#E7E7E7] py-12 mt-4 b-0">
        <div className="max-w-7xl px-4 mx-auto">
          <ul className="flex flex-col justify-between gap-4 md:items-center md:flex-row">
            <li>
              <strong className="text-blue-900">CENTRAL DE VENDAS</strong>
              <p>Compre pelo Whatsapp</p>
            </li>

            <li>
              <strong className="text-blue-900">CENTRAL DE ATENDIMENTO</strong>
              <p>Fale pelo Whatsapp</p>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}


function LoadingProduct() {
  return (
    <section className="grid lg:grid-cols-product-detail gap-4 mt-8 animate-pulse w-full">
      <div className="w-full h-[200px] bg-black/10 rounded-md" />

      <div className="flex-1 md:flex-col w-full">
        <div className="border-dashed border-b-2 border-[#CCCCCC] mb-4 pb-4 ">
          <h3 className="text-gray-600 text-2xl h-6 bg-black/10" />
          <h3 className="text-gray-600 text-2xl mt-1 h-6 bg-black/10" />

          <div className="flex flex-col gap-2 mt-4">
            <p className="line-through w-full h-4 bg-black/10" />
            <p className="mt-1 text-sm h-4 bg-black/10" />
          </div>
        </div>

        <div className="flex flex-col justify-between md:flex-row md:items-start w-full">
          <strong className="text-[#0033C6] text-2xl block h-6 bg-black/10 w-[25%] rounded-md" />
          <button className="bg-[#1E730D] text-white py-3 rounded-md font-bold w-full mt-4 md:mt-0 md:max-w-64 hover:bg-[#1E730D]/95s transition-all" disabled>Comprar</button>
        </div>

        <Address />
      </div>
    </section>
  )
}