"use client"
import { z } from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { publishQuestion } from "@/graphql/mutation/publishQuestion";

const questionSchema = z.object({
  user: z.string().min(1, "Informe sua rua"),
  ask: z.string().min(1, "Informe o seu bairro"),
});

type QuestionInput = z.infer<typeof questionSchema>;

interface FormQuestionProps {
  children: ReactNode
  setQuestions: Dispatch<any>
}

export function FormQuestion({ children, setQuestions }: FormQuestionProps) {
  const param = useParams()
  const slug = param.slug as string

  const { register, handleSubmit, reset } = useForm<QuestionInput>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      ask: "",
      user: ""
    }
  })

  async function showFields(values: QuestionInput) {
    try {
      const { createQuestion } = await publishQuestion({
        ask: values.ask,
        user: values.user,
        slug
      })

      setQuestions((state: any) => {
        return [
          ...state,
          {
            id: createQuestion.id,
            ask: createQuestion.ask,
            created: createQuestion.createdAt,
            user: createQuestion.user,
            response: ""
          }
        ]
      });

      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/20 w-screen h-screen fixed z-40 inset-0" />

        <Dialog.Content className="bg-white  overflow-hidden fixed max-w-[800px] w-full top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-50 rounded-md">
          <header className='bg-blue-900 p-4 flex items-center text-white justify-between'>
            <Dialog.Title>Dúvidas sobre o produto</Dialog.Title>
            <Dialog.Close>
              <button>
                <X />
              </button>
            </Dialog.Close>
          </header>

          <div className="p-4">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(showFields)}>
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Nome completo
                </label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-md p-2"
                  {...register("user")}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Qual é a dúvida sobre o produto? *
                </label>

                <textarea className="border-[1px] border-gray-400 rounded-md p-2" {...register("ask")} />
              </div>

              <button className="bg-blue-900 text-white font-bold py-2 rounded-md">Enviar dúvida</button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}