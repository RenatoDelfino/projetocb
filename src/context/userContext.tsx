
"use client"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"

interface UserContextProps {
  user: any;
  setUser: Dispatch<SetStateAction<{}>>;
}

interface UserProviderProps {
  children: ReactNode
}

export const userContext = createContext<UserContextProps>({
  user: {},
  setUser: () => { }
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return { name: "", birthday: false }
    }

    const data = JSON.parse(localStorage.getItem("@user") as string);
    return data ? data : { name: "", birthday: false }
  })

  return (
    <userContext.Provider value={{ setUser, user }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => useContext(userContext)