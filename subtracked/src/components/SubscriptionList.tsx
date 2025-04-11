// src/components/SubscriptionList.tsx
import { Subscription } from '../types/SubscriptionType';

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function SubscriptionList({ subscriptions, setSubscriptions }: Props) {
  const handleDelete = (id: string) => {
    const updated = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updated);
  };

  return (
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            {sub.name} - ${sub.price} - {sub.billingCycle} - Next:{" "}
            {sub.startDate.toLocaleDateString()} - {sub.status} - {sub.category}{" "}
            - {sub.notes}
            {/* Remove button */}
            <button
              onClick={() => handleDelete(sub.id)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
  );
}

export default SubscriptionList;
