import { useQuery } from '@tanstack/react-query';

interface Lease {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  // Add other properties based on your lease data
}

const fetchLeases = async (): Promise<Lease[]> => {
  const response = await fetch('/api/leases');
  if (!response.ok) {
    throw new Error('Failed to fetch leases');
  }
  return response.json();
};

// Renamed function to useLeases to follow the React custom hook naming convention
export const useLeases = () => {
  return useQuery({
    queryKey: ['leases'],
    queryFn: fetchLeases,
  });
};
