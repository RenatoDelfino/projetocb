"use client"
import Image from "next/image"
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { listReviews } from "@/graphql/queries/listReviews";

export function Avaliations() {
  const param = useParams()
  const slug = param.slug as string

  const { data, isLoading: reviewsLoading } = useQuery({
    queryKey: ["avaliation", slug],
    queryFn: () => listReviews({ slug })
  })

  const reviews = data?.reviews

  return reviewsLoading ? <AvaliationsLoading /> : (
    <section className="flex flex-col lg:flex-row my-8 gap-8">
      <div className="flex flex-col gap-4">
        <strong className="text-xl font-bold text-blue-900">Avaliações dos clientes</strong>

        <div className="flex items-start gap-4">
          <strong className="text-4xl font-bold text-[#595959]">5.0</strong>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
            </div>

            <p className="text-xs font-bold">Total de {reviews.length} avalições</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <strong className="text-lg font-bold text-blue-900">Principais avaliações</strong>

        <ul className="flex flex-col gap-4">
          {reviews.map((avalation: any) => (
            <li
              key={avalation.id}
              className="border-b-2 border-dashed pb-4 border-[#CCCCCC]"
            >
              <header>
                <strong>{avalation.user}</strong>
                <div className="flex gap-2 items-center mt-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.floor(avalation.stars ?? 0) }).map((_, index) => (
                      <Star
                        key={index}
                        color="orange"
                        size={12}
                        fill="orange"
                      />
                    ))}
                  </div>

                  <span className="text-xs leading-3">Avaliado em 26 de janeiro de 2024</span>
                </div>
              </header>

              <div className="mt-4">
                <p className="mb-2">{avalation.avaliation}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {avalation.images.map((image: any) => (
                    <Image
                      key={image.id}
                      src={image.url}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[100px] h-[60px] object-cover"
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div >
    </section>
  )
}

function AvaliationsLoading() {
  return (
    <section className="flex flex-col lg:flex-row my-8 gap-8">
      <div className="flex flex-col gap-4">
        <strong className="text-xl font-bold text-blue-900">Avaliações dos clientes</strong>

        <div className="flex items-start gap-4 animate-pulse">
          <strong className="text-4xl w-12 h-12 bg-black/10 rounded-md font-bold text-[#595959]" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
              <Star color="orange" size={32} fill="orange" />
            </div>

            <p className="text-xs font-bold" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <strong className="text-lg font-bold text-blue-900">Principais avaliações</strong>

        <div className="border-b-2 border-dashed pb-8 border-[#CCCCCC] animate-pulse">
          <header>
            <strong className="h-4 block w-64 rounded-md bg-black/10" />
            <div className="flex gap-2 items-center mt-2">
              <div className="flex items-center gap-1">
                <Star
                  color="orange"
                  size={12}
                  fill="orange"
                />
              </div>

              <span className="text-xs leading-3 h-4 bg-black/10 w-32 rounded-md" />
            </div>
          </header>

          <div className="mt-4">
            <p className="mb-2 h-4 w-24 bg-black/10 rounded-md" />
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-[100px] h-[60px] bg-black/10" />
              <div className="w-[100px] h-[60px] bg-black/10" />
              <div className="w-[100px] h-[60px] bg-black/10" />
            </div>
          </div>
        </div>
      </div >
    </section >
  )
}