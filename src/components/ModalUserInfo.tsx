"use client"
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import dayjs from "dayjs"

import { useUser } from "@/context/userContext";

export function ModalUserInfo() {
  const { user, setUser } = useUser()
  const [isMount, setMount] = useState(false)

  const [savingUser, setSavingUser] = useState(false)

  async function handleSaveUser(e: any): Promise<void> {
    e.preventDefault()

    setSavingUser(true)

    try {
      const response = await fetch('https://dbftools.tech/api/tools/search-cpf/' + e.target.cpf.value)
      const data = await response.json()

      const currentDate = dayjs();
      const userBirthday = dayjs(data.dataNascimento);
      const birthdayThisYear = userBirthday.set('year', currentDate.year());

      if (currentDate.isAfter(birthdayThisYear)) {
        birthdayThisYear.add(1, 'year');
      }

      const daysUntilBirthday = birthdayThisYear.diff(currentDate, 'day');

      const user = {
        name: data.nome,
        birthday: daysUntilBirthday <= 30
      }

      setUser(user)
      localStorage.setItem("@user", JSON.stringify(user))
    } catch (error) {
      throw new Error('Erro ao buscar CPF')
    } finally {
      setSavingUser(false)
    }
  }

  useEffect(() => {
    setMount(true)
  }, [])

  return isMount && (
    <Dialog.Root open={!user.name}>
      <Dialog.Overlay className="bg-black/50 w-screen h-screen fixed z-40 inset-0" />

      <Dialog.Content className="px-12 py-8 bg-white overflow-hidden fixed flex flex-col justify-center items-center w-[90%] max-w-96 h-[400px] top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-50 rounded-md">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center mt-4">
            <strong className="text-xl">Informe seu cpf</strong>
            <p className="text-sm">Buscaremos sua data de nascimento através do cpf</p>
          </div>
        </div>

        <form onSubmit={handleSaveUser} className="w-full flex flex-col gap-2 mt-4">
          <input
            type="text"
            name="cpf"
            className="border-black/50 border-2 rounded-md px-4 py-2"
            placeholder="Digite o seu cpf."
          />
          <button
            className="bg-blue-900 border-0 text-white rounded-md py-2"
            disabled={savingUser}
          >
            Buscar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Root >
  )
}
