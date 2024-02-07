"use client"
import { listProductInfo } from "@/graphql/queries/listProductInfo";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useParams } from "next/navigation"
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Detail } from "./ProductDetail";
import { useQuery } from "@tanstack/react-query";

export function ModalTechnicalProductDetails() {
  const param = useParams()
  const slug = param.slug as string

  const { data, isLoading: contentLoading } = useQuery({
    queryFn: () => listProductInfo({ slug }),
    queryKey: ["description", slug]
  })

  const content = data?.product

  const [showProductDescription, setShowProductDescription] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("type1")

  function openSpecifiction(type: any) {
    setOpenModal(true)
    setTypeModal(type)
  }

  const productDescription = showProductDescription ? "border-[##CCCCCC] border-t-2 h-full p-4" : "border-transparent h-0 overflow-hidden";

  const toggleOrderDetails = () => setShowProductDescription((state) => !state)

  return (
    <>
      {content ? (
        <section className="flex flex-col gap-2">
          <div className="border-[##CCCCCC] border-2 rounded-lg overflow-hidden">
            <header className="flex items-center justify-between bg-[#FCFCFC] p-6 text-[#595959]">
              <p className="text-sm font-bold">Descrição do produto</p>

              <button onClick={toggleOrderDetails} className="flex items-center gap-4">
                {!showProductDescription ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronUp size={20} />
                )}
              </button>
            </header>

            <div className={twMerge("transition-all ease-in-out rounded-b-lg flex flex-col items-center", productDescription)}>
              {contentLoading ? (
                <ContentLoading />
              ) : (
                <RichText content={content.description?.raw} />
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 items-center">
            <button
              className="px-4 py-6 flex items-center justify-between border-[##CCCCCC] border-2 bg-[#FCFCFC] text-[#595959] font-bold"
              onClick={() => openSpecifiction("type1")}
            >
              Características
              <Plus />
            </button>

            <button
              className="px-4 py-6 flex items-center justify-between border-[##CCCCCC] border-2 bg-[#FCFCFC] text-[#595959] font-bold"
              onClick={() => openSpecifiction("type2")}>
              Especificações Técnicas
              <Plus />
            </button>

            <button
              className="px-4 py-6 flex items-center justify-between border-[##CCCCCC] border-2 bg-[#FCFCFC] text-[#595959] font-bold"
              onClick={() => openSpecifiction("type3")}
            >
              Dimensões
              <Plus />
            </button>
          </div>
        </section>
      ) : (
        <h1></h1>
      )}

      <Detail
        open={openModal}
        detail={typeModal}
        close={() => setOpenModal(false)}
      />
    </>
  )
}

function ContentLoading() {
  return (
    <div className="animate-pulse w-full flex flex-col gap-[1px]">
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
      <div className="h-4 bg-black/10 w-full rounded-md" />
    </div>
  )
}