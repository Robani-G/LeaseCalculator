"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import Link from 'next/link'
// import { MdOutlineAnalytics } from "react-icons/md";
import { TbMath } from "react-icons/tb";


export default function Header() {
    const { data: session } = useSession()
    const userInitial = session?.user?.name?.[0]?.toUpperCase() ?? 'U';
    if (session) {

  return (
    <div className="h-14 w-full flex justify-between items-center p-4">
      <Link href="/">
    <TbMath    className='h-14 w-7 mr-5 text-gray-700' />
</Link>
      <div className='flex '>

<Link href="../SharedLease">
    <HiOutlineInboxArrowDown className='h-14 w-7 mr-5' />
</Link>
      <DropdownMenu>
  <DropdownMenuTrigger> <Avatar className="flex">
          <AvatarImage src={session?.user.image || 'default-profile.png'} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>        <button onClick={() => signOut()}>Sign out</button>
    </DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
      </div>

</div>

  
  )
}
return (
  <>
    <div className="h-14 w-full flex justify-between items-center p-2">
    <Link href="/">
    <TbMath    className='h-14 w-7 mr-5 text-gray-700' />
</Link>
      <Button onClick={() => signIn()}>Sign In</Button>

</div>
  </>
)

}
