import { useQuery } from '@tanstack/react-query';

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
