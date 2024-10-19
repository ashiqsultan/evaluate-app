import { useItemTypeById } from '../store/queries';
import { Button } from '../components/ui/button';
const Home = () => {
  const { data, isLoading } = useItemTypeById('id');
  return (
    <>
      <h1>This is Home Page</h1>
      <p>{isLoading ? 'Loading...' : data}</p>
      <Button>Click me</Button>
    </>
  );
};

export default Home;
