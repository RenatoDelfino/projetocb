"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { listQuestions } from "@/graphql/queries/getQuestions";

import { FormQuestion } from "./FormQuestion";

const months = [
  "Janeiro",
  "Fervereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]

export function Questions() {
  const param = useParams()
  const slug = param.slug as string

  const [questions, setQuestions] = useState<any>([])
  const [filteredQuestions, setFilteredQuestions] = useState<any>([])
  const [loadingQuestions, setLoadingQuestions] = useState(true)

  useEffect(() => {
    listQuestions({ slug })
      .then(response => setQuestions(response.questions))
      .finally(() => setLoadingQuestions(false))
  }, [])

  useEffect(() => {
    setFilteredQuestions(questions)
  }, [questions])

  function handleSearchQuestions(event: any) {
    event.preventDefault()

    const task = event.target.ask.value

    if (!task) {
      setFilteredQuestions(questions)
      return
    }

    setFilteredQuestions(questions.filter((question: any) => question.ask.toLowerCase().includes(task.toLowerCase())))
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-blue-900 font-extra-bold">Tire suas dúvidas sobre o produto</h3>

        <form className="w-full" onSubmit={handleSearchQuestions}>
          <input
            className="w-full bg-input border-input px-4 text-sm border-[1px] py-4 rounded-md"
            placeholder="Pesquise pela sua dúvida aqui"
            name="ask"
          />
        </form>
      </div>

      <div className="flex flex-col">
        <h4 className="text-blue-900 font-bold">{filteredQuestions.length} perguntas sobre esse produto</h4>

        <ul className="flex flex-col gap-4 mt-4">
          {loadingQuestions ? (
            <QuestionsLoading />
          ) : <>
            {
              filteredQuestions.map((question: any) => {
                const dateFormatted = new Date(question.created)

                const day = dateFormatted.getDate();
                const month = months[dateFormatted.getMonth()];
                const year = dateFormatted.getFullYear();

                return (
                  <li className="border-dashed border-b-gray-300 border-b-2 pb-4 flex flex-col gap-2" key={question.id}>
                    <strong className="text-[#595959]">{question.ask}</strong>
                    <small>Perguntado por {question.user} em {day} de {month} de {year}</small>

                    {question.response && (
                      <p className="w-full bg-[#F2F2F2] text-black px-2 py-4 text-sm">
                        {question.response}
                      </p>
                    )}
                  </li>
                )
              })
            }

          </>
          }


        </ul>

        <div className="flex flex-col gap-4 w-full py-6 bg-blue-50 mt-8 items-center">
          <strong>Não encontrou a dúvida que procurava?</strong>

          <FormQuestion setQuestions={setQuestions}>
            <button className="bg-blue-900 px-20 h-12 text-white rounded-md">Faça uma pergunta</button>
          </FormQuestion>
        </div>
      </div>
    </section>
  )
}

function QuestionsLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      <h4 className="h-4 bg-black/10 w-full rounded-md" />

      <ul>
        <li className="border-dashed border-b-gray-300 border-b-2 pb-4 flex flex-col gap-2">
          <strong className="text-[#595959]" />
          <small className="h-2 bg-black/10 w-full rounded-md" />
          <p className="w-full bg-black/10 h-12 rounded-md" />
        </li>
      </ul>
    </div>
  )
}