import { useItemTypeById } from '../store/queries';
import QuestionEdit from '../components/QuestionEdit';
import QuestionList from '../components/QuestionList';
const Question = () => {
  const { data, isLoading } = useItemTypeById('id');
  return (
    <>
      <h1>QuestionList</h1>
      <QuestionList />
      <h1>QuestionEDIT</h1>
      <QuestionEdit />
      <p>{isLoading ? 'Loading...' : data}</p>
    </>
  );
};

export default Question;
