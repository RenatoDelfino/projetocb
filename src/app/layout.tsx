"use client"
import "./globals.css";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Nunito } from "next/font/google";

import { UserProvider } from "@/context/userContext";

import { Header } from "@/components/Header";
import { ModalUserInfo } from "@/components/ModalUserInfo";

const nunito = Nunito({ subsets: ["latin"] });

const client = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    fetch("https://myip.wtf/json")
      .then(response => response.json())
      .then(response => {
        localStorage.setItem("@address", JSON.stringify(response['YourFuckingLocation']))
      })
  }, [])

  return (
    <UserProvider>
      <QueryClientProvider client={client}>
        <html lang="en" className="scroll-smooth">
          <body className={nunito.className}>
            <Header />
            {children}
            <ModalUserInfo />
          </body>
        </html>
      </QueryClientProvider>
    </UserProvider>
  );
}
