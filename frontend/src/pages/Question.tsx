import { useItemTypeById } from '../store/queries';
const Question = () => {
  const { data, isLoading } = useItemTypeById('id');
  return (
    <>
      <h1>Question</h1>
      <p>{isLoading ? 'Loading...' : data}</p>
    </>
  );
};

export default Question;
