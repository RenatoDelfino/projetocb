"use client"
import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react'
import { listPopularCategories } from "@/graphql/queries/listPopularCategories"
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { useQuery } from "@tanstack/react-query"

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export function Categories() {
  const { data } = useQuery({
    queryKey: ["main_categories"],
    queryFn: () => listPopularCategories()
  })

  return (
    <section className="flex flex-col gap-2">
      <strong className="text-center text-3xl text-blue-600 font-bold">Camarote de ofertas</strong>

      <div className="mb-4">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16
            },
            728: {
              slidesPerView: 4,
              spaceBetween: 16
            }
          }}
          autoplay={{
            delay: 5000,
          }}
        >
          {data?.categories.map((category: any) => (
            <SwiperSlide className="relative" key={category.id}>
              <Link href={`/products/${category.slug}`}>
                <Image
                  src={category.imagem.url}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-contain w-full"
                />
              </Link>
            </SwiperSlide>

          ))}
        </Swiper>
      </div>
    </section>
  )
}