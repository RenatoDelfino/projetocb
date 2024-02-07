"use client"
import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"

export function Address() {
  const [isMounted, setIsMounted] = useState(false)
  const [address, setAddress] = useState<string>("")

  useEffect(() => {
    const addressExists = localStorage.getItem("@address")

    if (addressExists) {
      setAddress(JSON.parse(addressExists))
    }

    setIsMounted(true)
  }, [])

  return (
    <div className="mt-8 rounded-md overflow-hidden">
      <header className="bg-[#E9F4FF] flex flex-col justify-between p-4 gap-2 md:flex-row md:items-center">
        <strong className="text-blue-900 font-extra-bold">Frete e taxa de entrega</strong>
      </header>

      {
        isMounted && (
          <div className={`bg-delivery border-[#E9F4FF] border-[1px] flex items-center justify-between px-4 py-2`}>
            <div className="flex items-center gap-2">
              <MapPin size={12} color="blue" />
              <div className="text-xs block text-blue-900 bg-blue-100/20">{address}</div>
            </div>

            <strong className="text-green-500">
              Grátis
            </strong>
          </div>
        )
      }
    </div>
  )
}