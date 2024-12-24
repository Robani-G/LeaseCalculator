// app/leases/page.tsx

'use client';
import { useleases } from "~/hooks/uselease";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { LucideSend } from "lucide-react";
import { useusers } from "~/hooks/useusers";
import toast from "react-hot-toast";

const LeaseTable = () => {

  const { data: leases, isLoading: leasesLoading, error: leasesError } = useleases();
  const { data: users, isLoading: usersLoading, error: usersError } = useusers();
  const [loading, setLoading] = useState(false);

  if (leasesError instanceof Error) {
    return <p>Error loading leases: {leasesError.message}</p>;
  }
  if (usersError instanceof Error) {
    return <p>Error loading users: {usersError.message}</p>;
  }

  if (leasesLoading || usersLoading) {
    return <p>Loading data...</p>;
  }
  const shareLease = (leaseId: string, userId: string) => {
    setLoading(true);

    // Simulate an API call to share the lease
    fetch('/api/sharedLease', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ leaseId, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Lease shared successfully');
      })
      .catch((error) => {
        toast.error('Failed to share lease');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  

  return (
  
    <Card className="sm:min-w-[520px] w-[350px]">

    <Table>
      <TableCaption>A list of your recent Leases.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead>#</TableHead>
          <TableHead className="w-[100px]">Base Rent</TableHead>
          <TableHead  className="hidden lg:table-head">AIR</TableHead>
          <TableHead>Security Deposit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
           {leases?.map((lease: any,index:number) => (
          <TableRow key={lease.id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell className="font-medium">{lease.monthlyRentAmount}</TableCell>
            <TableCell className="hidden lg:table-cell">{lease.annualRentIncrease} %</TableCell>
            <TableCell><Badge variant="outline">{lease.leaseType}</Badge>
 
            </TableCell>

          <TableCell className="text-right">   
          <DropdownMenu>
  <DropdownMenuTrigger><FaShareAlt />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
  {usersLoading ? (
  <p>Loading users...</p>
) : (
  users?.map((user: any, index: number) => (
    <React.Fragment key={index}>
      <DropdownMenuLabel className=''><button className='flex items-center justify-center min-w-28' onClick={() => shareLease(lease.id, user.id)} disabled={loading}>{user.name} <LucideSend  className='h-4 w-6' />
      </button></DropdownMenuLabel>
      <DropdownMenuSeparator />
 
    </React.Fragment>
  ))
)}


  </DropdownMenuContent>
</DropdownMenu>

</TableCell> 
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
    </Card>
  );
};

export default LeaseTable;
