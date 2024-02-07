"use client"
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { RichText } from '@graphcms/rich-text-react-renderer';

import { listProductInfo } from "@/graphql/queries/listProductInfo";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

interface DetailProps {
  open: boolean;
  detail: string;
  close: () => void;
}

export function Detail({ open, detail, close }: DetailProps) {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState({} as any)
  const [isMobile, setIsMobile] = useState(true)
  const [titleHeader, setTitleHeader] = useState("Caracteristicas")

  const { data, isLoading: CategoriesLoading } = useQuery({
    queryKey: ["product_detail", slug],
    queryFn: () => listProductInfo({ slug })
  })

  useEffect(() => {
    listProductInfo({ slug })
      .then(response => setProduct(response.product))
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    function defineTabs() {
      if (window.innerWidth < 728) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    window.addEventListener("resize", defineTabs)

    return () => {
      window.removeEventListener("resize", defineTabs)
    }
  }, [])

  const title = {
    "type1": "Caracteristicas",
    "type2": "Especificações Técnicas",
    "type3": "Dimensões",
  }

  useEffect(() => {
    setTitleHeader(title[detail as keyof typeof title])
  }, [])

  return (
    <Dialog.Root open={open} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 w-screen h-screen fixed z-40 inset-0" />

        <Dialog.Content className="bg-white  overflow-hidden fixed  w-screen md:min-w-[800px] top-0 h-screen md:w-auto md:h-auto md:top-2/4 md:left-2/4 md:translate-x-[-50%] md:translate-y-[-50%] z-50 md:rounded-md">
          <header className='bg-blue-900 p-4 flex items-center text-white justify-between'>
            <Dialog.Title>{titleHeader}</Dialog.Title>
            <Dialog.Close>
              <button>
                <X />
              </button>
            </Dialog.Close>
          </header>

          <Tabs.Root defaultValue={detail} className='px-4 h-[400px] overflow-y-scroll'>
            <Tabs.List
              hidden={isMobile}
              className={`${isMobile ? "hidden" : "flex"}`}>
              <Tabs.Trigger
                className="bg-white px-5  h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none cursor-default"
                value="type1"
                onFocus={e => setTitleHeader(e.currentTarget.innerText)}
              >
                Caracteristicas
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5  h-[45px] flex-1 flex items-center justify-center  text-[15px] leading-none text-mauve11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none cursor-default"
                value="type2"
                onFocus={e => setTitleHeader(e.currentTarget.innerText)}
              >
                Especificações Técnicas
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5  h-[45px] flex-1 flex items-center justify-center  text-[15px] leading-none text-mauve11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] outline-none cursor-default"
                value="type3"
                onFocus={e => setTitleHeader(e.currentTarget.innerText)}
              >
                Dimensões
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="p-5 bg-white rounded-b-md"
              value="type1"
            >
              <RichText content={product.characteristics?.raw} />
            </Tabs.Content>
            <Tabs.Content
              className="p-5 bg-white rounded-b-md"
              value="type2">
              <RichText content={product.technicalSpecifications?.raw} />
            </Tabs.Content>
            <Tabs.Content
              className="p-5 bg-white rounded-b-md"
              value="type3"
            >
              <RichText content={product.dimensions?.raw} />
            </Tabs.Content>
            <Tabs.Content
              className="p-5 bg-white rounded-b-md"
              value="type1"
            >
              Tipo 4
            </Tabs.Content>
          </Tabs.Root>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
