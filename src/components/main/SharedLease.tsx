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

// Define types for shared leases, users, and leases
interface User {
  name: string;
}

interface Lease {
  leaseType: string;
  monthlyRentAmount: number;
}

interface SharedLease {
  id: number;
  user: User;
  lease: Lease;
}

const SharedLeasesList = () => {
  // Use SharedLease type for the state
  const [sharedLeases, setSharedLeases] = useState<SharedLease[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedLeases = async () => {
      try {
        const response = await fetch('/api/sharedLease');
        if (!response.ok) {
          throw new Error('Failed to fetch shared leases');
        }
        const data: SharedLease[] = await response.json(); // Type the response data
        setSharedLeases(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedLeases();
  }, []);

  if (loading) {
    return <p>Loading shared leases...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="sm:min-w-[520px] w-[350px]">
      <Table>
        <TableCaption>A list of your recent Shared Leases.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Sent by</TableHead>
            <TableHead>Leaser Type</TableHead>
            <TableHead>Base Rent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sharedLeases.map((sharedLease, index) => (
            <TableRow key={sharedLease.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{sharedLease.user.name}</TableCell>
              <TableCell className="font-medium">{sharedLease.lease.leaseType}</TableCell>
              <TableCell className="font-medium">{sharedLease.lease.monthlyRentAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default SharedLeasesList;
