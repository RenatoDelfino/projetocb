'use client'
import { AlertCircle, Check, User, X } from 'lucide-react'
import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"

import { useUser } from '@/context/userContext'
import { useCallback, useEffect, useMemo, useState } from 'react'

export function ProfileOptions() {
  const { user, setUser } = useUser()
  const [mounted, setMounted] = useState(false)
  const [nome, setNome] = useState("")
  const [pop, setPop] = useState(true)

  console.log("Hello")

  const closeModal = () => setPop((state: any) => !state)

  const handleLogoutUser = () => {
    localStorage.clear();
    setUser({});
  }

  const changeName = useCallback(() => {
    setNome(window.innerWidth < 720 ? user?.name?.split(" ")[0] || "" : user?.name || "");
  }, [user?.name]);

  const handleResize = useMemo(() => {
    return () => changeName();
  }, [changeName]);

  useEffect(() => {
    closeModal()
  }, [user?.birthday])

  useEffect(() => {
    changeName();
    setMounted(true);

    const handleResizeListener = () => handleResize();
    window.addEventListener("resize", handleResizeListener);

    return () => {
      window.removeEventListener("resize", handleResizeListener);
    };
  }, [changeName, handleResize]);

  return (
    mounted && (
      <Dialog.Root open={pop}>
        <Dialog.Trigger asChild>
          {
            user?.name && (
              <button
                onClick={closeModal}
                className="flex items-center gap-2 justify-center rounded-lg p-2 hover:bg-black/10 transition-all"
              >
                <User size={20} />
                <strong className="md:text-sm">{nome}</strong>
              </button>
            )
          }
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 w-screen h-screen fixed z-40 inset-0" />
          <Dialog.Content className="px-12 py-8 bg-white overflow-hidden fixed flex flex-col w-[90%] max-w-96 justify-center items-center top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-50 rounded-md">
            <header className='flex items-center justify-between w-full'>
              <strong>Meu perfil</strong>

              <Dialog.Close asChild>
                <button onClick={closeModal}>
                  <X />
                </button>
              </Dialog.Close>
            </header>

            <div className="flex flex-col py-6 w-full">
              {user?.birthday && (
                <Image
                  src="/images/ofertaDisponivel.png"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto max-w-[300px]"
                />
              )}

              <div className={`flex flex-col gap-2 border-b-black/5 border-b-[1px] pb-4 ${user?.birthday ? "my-4" : "mb-4"}`}>
                <small className='text-xs'>Nome</small>
                <strong className="flex items-center gap-2 text-black bold text-sm">{user?.name}</strong>
              </div>

              <div className='flex flex-col items-start gap-2'>
                <small className='text-black font-medium text-xs'>Status Promoção</small>
                {user?.birthday ? (
                  <p className='flex items-center gap-2 mx-auto text-green-500 bg-green-300/10 w-full rounded-md p-2'>
                    <Check size={16} />
                    Liberada
                  </p>

                ) : (
                  <div className='flex flex-col gap-2 w-full'>
                    <p className='flex items-center gap-2 mx-auto text-red-500 bg-red-300/10 rounded-md p-2 w-full'>
                      <AlertCircle size={16} />
                      Não Liberada
                    </p>
                    <button onClick={handleLogoutUser} className='bg-red-500 text-white rounded-md py-2'>
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  )
}

