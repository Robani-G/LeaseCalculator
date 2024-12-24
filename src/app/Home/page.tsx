import React from 'react'


import Leaseform from '~/components/main/Leaseform'
import LeaseList from '~/components/main/LeaseTable'
import { useSession } from 'next-auth/react'
import SharedLeasesList from '~/components/main/SharedLease'
export default function Page() {
      const { data: session } = useSession();
  
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
