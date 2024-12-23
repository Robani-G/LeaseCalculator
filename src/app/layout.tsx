"use client"
import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import  { Toaster } from 'react-hot-toast';
import Header from "~/components/main/Header";
// export const metadata: Metadata = {
//   title: "Lease Calculator"
// ,
//   description: "Lease Calculator exam",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
          <QueryClientProvider client={queryClient}>

      <SessionProvider>
        <body className="flex flex-col items-center justify-center min-h-screen w-full">
        <Header/>

          <main className="flex items-center justify-center min-h-screen w-full">
          {children}

          </main>
        <Toaster
  position="bottom-right"
  reverseOrder={false}
/>     

        </body>

      </SessionProvider>
      </QueryClientProvider>

    </html>
  );
}