"use client"
import { useEffect, useState } from 'react';
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
   
const SharedLeasesList = () => {
  const [sharedLeases, setSharedLeases] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedLeases = async () => {
      try {
        const response = await fetch('/api/sharedLease');
        if (!response.ok) {
          throw new Error('Failed to fetch shared leases');
        }
        const data = await response.json();
        setSharedLeases(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    void fetchSharedLeases(); // Add `void` to mark the promise as intentionally ignored
  }, []);
  

  if (loading) {
    return <p>Loading shared leases...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    // <div>
    //   <h2>Shared Leases</h2>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Lease ID</th>
    //         <th>Lease Type</th>
    //         <th>User</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {sharedLeases.map((sharedLease) => (
    //         <tr key={sharedLease.id}>
    //           <td>{sharedLease.lease.id}</td>
    //           <td>{sharedLease.lease.leaseType}</td>
    //           <td>{sharedLease.user.name}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <Card className="sm:min-w-[520px] w-[350px]">

    <Table>
    <TableCaption>A list of your recent Shared Leases.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">#</TableHead>
        <TableHead>Sent by</TableHead>
        <TableHead>Leaser Type</TableHead>
        <TableHead >Base Rent</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sharedLeases.map((sharedLease,index:number) => (
        <TableRow key={sharedLease.id}>
        <TableCell className="font-medium">{index +1 }</TableCell>
          <TableCell>{sharedLease.user.name}</TableCell>
          <TableCell className="font-medium">{sharedLease.lease.leaseType}</TableCell>     
               <TableCell className="font-medium ">{sharedLease.lease.monthlyRentAmount}</TableCell>

        
        </TableRow>
      ))}
    </TableBody>
   
  </Table>
  </Card>
  );
};

export default SharedLeasesList;
