import { useQuery } from '@tanstack/react-query';

const fetchusers = async () => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const useusers = () => {
  return useQuery({
    queryKey: ['users'], // The key for the query
    queryFn: fetchusers,  // The function to fetch the data
  });
};
