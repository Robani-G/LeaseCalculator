"use client"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "../components/ui/button"
import Home from '../app/Home/page'; // Relative path to the root `page.js`

export default function HomePage() {
  // const { data: session } = useSession()

  return (
   
   <>
   <div className="w-full">
   <Home/>
   </div>
  
   
   </>
  );
}
