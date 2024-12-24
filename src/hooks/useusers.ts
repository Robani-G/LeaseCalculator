import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  // Add other fields based on your user data
}

const fetchusers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const useusers = () => {  // Correct naming for custom hook
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchusers,
  });
};
