'use client'
import Image from 'next/image'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export function Banners() {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 5000,
      }}
    >
      <SwiperSlide className="relative h-[500px]">
        <Image
          src="/images/bannerPrincipal.png"
          height={0}
          width={0}
          alt=""
          sizes='100vw'
          className="object-contain w-full"
        />
      </SwiperSlide>
      <SwiperSlide className="relative h-[500px]">
        <Image
          src="/images/bannerSecundario.png"
          height={0}
          width={0}
          alt=""
          sizes='100vw'
          className="object-contain w-full"
        />
      </SwiperSlide>
    </Swiper>
  )
}