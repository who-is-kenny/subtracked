// src/components/SubscriptionList.tsx
import { useState } from "react";
import { Subscription } from "../types/SubscriptionType";

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function SubscriptionList({ subscriptions, setSubscriptions }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Subscription | null>(null);

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    const updated = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updated);
  };

  const handleEdit = (id: string) => {
    const subscriptionToEdit = subscriptions.find((sub) => sub.id === id);
    if (subscriptionToEdit) {
      setEditingId(id);
      setEditFormData({ ...subscriptionToEdit });
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData) {
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === editingId ? { ...editFormData, id: sub.id } : sub
      );
      setSubscriptions(updatedSubscriptions);
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  if (editingId) {
    // Render the edit form when editing
    return (
      <form className="edit-form" onSubmit={handleEditSubmit}>
        <h2>Edit Subscription</h2>
        <input
          type="text"
          name="name"
          value={editFormData?.name || ""}
          onChange={handleEditChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="price"
          value={editFormData?.price || ""}
          onChange={handleEditChange}
          placeholder="Price"
          required
        />
        <select
          name="billingCycle"
          value={editFormData?.billingCycle || ""}
          onChange={handleEditChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Weekly">Weekly</option>
        </select>
        <textarea
          name="notes"
          value={editFormData?.notes || ""}
          onChange={handleEditChange}
          placeholder="Notes"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </form>
    );
  }

  // Render the subscription list when not editing
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
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the toggle
                  handleDelete(sub.id);
                }}
              >
                Remove
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the toggle
                  handleEdit(sub.id);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default SubscriptionList;
