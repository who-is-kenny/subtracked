// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import SubscriptionList from '../components/SubscriptionList';
import { Subscription } from '../types/SubscriptionType';

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function Home({ subscriptions, setSubscriptions }: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Subscriptions</h1>
      <SubscriptionList subscriptions={subscriptions} setSubscriptions={setSubscriptions} />
      <button onClick={() => navigate('/add')}>Add Subscription</button>
    </div>
  );
}

export default Home;
