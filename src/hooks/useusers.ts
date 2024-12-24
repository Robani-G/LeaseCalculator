import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  // Add other fields based on your user data
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users');
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Renamed function to useUsers to follow the React custom hook naming convention
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
