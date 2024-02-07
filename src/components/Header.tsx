"use client"
import Image from "next/image"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, MenuIcon, X, MapPin } from "lucide-react";
import * as HoverCard from '@radix-ui/react-hover-card';
import { useQuery } from "@tanstack/react-query";

import { listCategories } from "@/graphql/queries/listCategories";

import { ProfileOptions } from "./ProfileOptions";

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [mount, setMount] = useState(false)

  const { data, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories_header"],
    queryFn: () => listCategories()
  })

  const categories = data?.categories

  const [address, setAddress] = useState<any>(() => {
    if (typeof window == 'undefined') return ""
    const info = JSON.parse(localStorage.getItem("@address") as string)

    return info ? info : ""
  })

  useEffect(() => {
    setMount(true)
  }, [])

  function handleToggleMenu() {
    setMenuIsOpen(state => !state)
  }

  return (
    <header>
      <div className="w-full mx-auto flex flex-col">
        <div className="flex w-full justify-between items-start lg:items-center max-w-7xl  mx-auto px-4 order-2 lg:order-1 pt-3 pb-2">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <div className="flex items-center gap-4">
              <button className="block lg:hidden text-blue-900" onClick={handleToggleMenu}>
                <Menu />
              </button>

              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt=""
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="object-contain w-auto h-auto max-h-8"
                />
              </Link>
            </div>

            <div className="flex lg:bg-white items-center gap-2 lg:px-4 lg:py-[4px] rounded-md lg:border-address lg:border-[1px] mt-4 lg:mt-0">
              <MapPin size={12} color="#0033C6" />

              <div className="flex md:flex-col md:items-start gap-1 md:gap-0">
                <span className="text-[.75rem] text-[#0033C6]">Entregar em:</span>
                <strong className="text-[.75rem] text-[#0033C6] font-extrabold">{mount && address ? address : "Buscando"}</strong>
              </div>
            </div>
          </div>

          <ProfileOptions />
        </div>

        {loadingCategories ? (
          <LoadingMenu
            isOpen={menuIsOpen}
            setIsOpen={setMenuIsOpen}
          />
        ) : (
          <nav className="bg-[#0033C6] border-red-500 border-b-4 lg:mt-4 lg:order-2 order-1 py-2">
            <div
              className={`
                ${menuIsOpen ? "fixed flex flex-col bg-input w-[60%] h-full top-0 left-0 p-4 border-r-[1px] z-50" : "hidden"}
                lg:flex lg:flex-row gap-4 lg:gap-16 lg:bg-transparent lg:text-white lg:border-0 lg:relative lg:max-w-7xl lg:w-full lg:mx-auto lg:px-4 lg:top-auto lg:items-center lg:left-auto py-[2px]
              `}
            >
              <strong className="lg:hidden text-blue-900">Compre por departamentos</strong>

              <HoverCard.Root>
                <HoverCard.Trigger className="hidden md:block">
                  <button className="flex items-center gap-2 hover:bg-red-800 text-white py-2 px-2">
                    <MenuIcon />
                    Compre por departamentos
                  </button>
                </HoverCard.Trigger>

                <HoverCard.Portal>
                  <HoverCard.Content className="hidden data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white data-[state=open]:transition-all z-50 md:flex flex-col">
                    {
                      categories.map((category: any) => (
                        <Link
                          key={category.id}
                          href={`/products/${category.slug}`}
                          className="text-sm border-b-[1px] border-black/10 md:border-none p-4 hover:bg-gray-200 hover:text-blue-800"
                        >
                          {category.name}
                        </Link>
                      ))}
                    <HoverCard.Arrow className="fill-white" />
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>

              {
                categories.map((category: any) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    className="text-sm border-b-[1px] border-black/10 md:border-none pb-2 py-0 md:pb-0"
                  >
                    {category.name}
                  </Link>
                ))}

              <button className="lg:hidden absolute right-0 translate-x-[100%] bg-input border-[1px] p-2" onClick={handleToggleMenu}>
                <X size={16} />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header >
  )
}

function LoadingMenu({ isOpen }: any) {
  return (
    <nav className="bg-[#0033C6] border-red-500 border-b-4 md:mt-4 md:order-2 order-1 py-2">
      <div
        className={`
          ${isOpen ? "fixed flex flex-col bg-input w-[60%] h-full top-0 left-0 p-4 border-r-[1px] z-50" : "hidden"}
          md:flex md:flex-row gap-4 md:gap-16 md:bg-transparent md:text-white md:border-0 md:relative md:max-w-7xl md:w-full md:mx-auto md:px-4 md:top-auto md:left-auto py-[4px] animate-pulse
        `}
      >
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <div
              key={index}
              className="py-4 w-[148px] bg-black/50 hidden md:block rounded-md"
            />
          )
        })}
      </div>
    </nav >
  )
}