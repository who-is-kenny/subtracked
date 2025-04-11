// src/components/SubscriptionList.tsx
import { useState } from "react";
import { Subscription } from "../types/SubscriptionType";

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function SubscriptionList({ subscriptions, setSubscriptions }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    const updated = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updated);
  };

  return (
    <ul className="subscription-list">
      {subscriptions.map((sub) => (
        <li
          key={sub.id}
          className={`subscription-item ${
            expandedId === sub.id ? "expanded" : ""
          }`}
          onClick={() => handleToggle(sub.id)}
        >
          <div className="subscription-name">{sub.name}</div>
          {expandedId === sub.id && (
            <div className="subscription-details">
              <p>Price: ${sub.price}</p>
              <p>Billing Cycle: {sub.billingCycle}</p>
              <p>Next Payment: {sub.startDate.toLocaleDateString()}</p>
              <p>Status: {sub.status}</p>
              <p>Category: {sub.category}</p>
              <p>Notes: {sub.notes}</p>
              <button onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the toggle
                handleDelete(sub.id);
              }}>
                Remove
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default SubscriptionList;
