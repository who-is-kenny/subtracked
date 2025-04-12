// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import SubscriptionList from "../components/SubscriptionList";
import { Subscription } from "../types/SubscriptionType";

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function Home({ subscriptions, setSubscriptions }: Props) {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Subscriptions</h1>
      <SubscriptionList
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
      />
      <button className="add" onClick={() => navigate("/add")}>
        +
      </button>
      <button className="settings" onClick={() => navigate("/settings")}>
        Settings
      </button>
    </div>
  );
}

export default Home;
