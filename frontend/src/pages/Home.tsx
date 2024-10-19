import { useItemTypeById } from '../store/queries';
const Home = () => {
  const { data, isLoading } = useItemTypeById('id');
  return (
    <>
      <h1>This is Home Page</h1>
      <p>{isLoading ? 'Loading...' : data}</p>
    </>
  );
};

export default Home;
