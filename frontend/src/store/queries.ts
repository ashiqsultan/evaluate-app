import { useQuery } from '@tanstack/react-query';
import { Question } from '../types';

const getItemById = async (id: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`the id is ${id}`);
    }, 2000);
  });
};

export const useItemTypeById = (id: string) => {
  return useQuery({
    queryKey: ['itemType', id],
    queryFn: () => getItemById(id),
  });
};

export const fetchQuestions = async (): Promise<Question[]> => {
  // Simulating API call with mock data
  return [
    { id: '01', questionText: 'What is React?' },
    { id: '02', questionText: 'How does state management work in React?' },
    { id: '03', questionText: 'What are the benefits of using TypeScript with React?' },
  ];
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });
};
