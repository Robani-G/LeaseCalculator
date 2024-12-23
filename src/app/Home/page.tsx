import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '~/components/ui/button'
import Leaseform from '~/components/main/Leaseform'
import Invoice from '~/components/main/Invoice'
import LeaseList from '~/components/main/LeaseTable'
import { useSession } from 'next-auth/react'
import SharedLeasesList from '~/components/main/SharedLease'
export default function page() {
      const { data: session } = useSession()
  
  return (
    <>
    <div className='flex flex-col items-center'>
    <Leaseform />
    {session && (
      <>
<div className="sm:flex sm:flex-col lg:flex-row sm:gap-4 lg:gap-4">
<LeaseList />
  <SharedLeasesList />
</div>
            </>
)}
      
    </div>
   
        

    </>
  )
}
