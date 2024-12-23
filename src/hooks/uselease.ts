// hooks/useLeases.ts
import { useQuery } from '@tanstack/react-query';

const fetchLeases = async () => {
  const response = await fetch('/api/leases');
  if (!response.ok) {
    throw new Error('Failed to fetch leases');
  }
  return response.json();
};

export const useLeases = () => {
  return useQuery({
    queryKey: ['leases'], // The key for the query
    queryFn: fetchLeases,  // The function to fetch the data
  });
};
