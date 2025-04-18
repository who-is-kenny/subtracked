// src/components/SubscriptionList.tsx
import { useState } from "react";
import { useEffect } from "react";
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
      const { name, value } = e.target;
      setEditFormData({
        ...editFormData,
        [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
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

  const getWarningClass = (endDate: Date) => {
    const today = new Date();
    const timeDiff = new Date(endDate).getTime() - today.getTime();
    const daysRemaining = timeDiff / (1000 * 60 * 60 * 24);
  
    const savedDurations = JSON.parse(localStorage.getItem("statusDurations") || "{}");
    const yellowThreshold = savedDurations.yellow || 7; // Default: 7 days
    const redThreshold = savedDurations.red || 3; // Default: 3 days
  
    if (daysRemaining <= redThreshold) {
      return "dot-red"; // Less than red threshold
    } else if (daysRemaining <= yellowThreshold) {
      return "dot-yellow"; // Less than yellow threshold
    } else {
      return "dot-green"; // Default to green
    }
  };

  useEffect(() => {
    const previousStatuses = JSON.parse(localStorage.getItem("previousStatuses") || "{}");

    const updatedStatuses = subscriptions.map((sub) => {
      const status = getWarningClass(sub.endDate);

      // Notify if the status has changed
      if (previousStatuses[sub.id] && previousStatuses[sub.id] !== status) {
        let temp = "";
        if (status === "dot-red") {
          temp = "Red";
        } else if (status === "dot-yellow") {
          temp = "Yellow";
        } else if (status === "dot-green") {
          temp = "Green";
        }
        sendNotification(sub.name, temp);
      }

      return { id: sub.id, status };
    });

    // Save the updated statuses to localStorage
    const statusMap = updatedStatuses.reduce<Record<string, string>>((acc, sub) => {
      acc[sub.id] = sub.status;
      return acc;
    }, {});
    localStorage.setItem("previousStatuses", JSON.stringify(statusMap));
  }, [subscriptions]);

  const sendNotification = (subscriptionName: string, newStatus: string) => {
    if (Notification.permission === "granted") {
      new Notification("Subscription Status Changed", {
        body: `${subscriptionName} is now ${newStatus}.`,
        icon: "/path/to/icon.png", // Replace with your actual icon path
      });
    } else {
      console.log("Notifications are disabled or not supported.");
    }
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
        <input
          type="date"
          name="startDate"
          value={editFormData?.startDate.toISOString().split("T")[0] || ""}
          onChange={handleEditChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={editFormData?.endDate.toISOString().split("T")[0] || ""}
          onChange={handleEditChange}
          required
        />
        <select
          name="status"
          value={editFormData?.status || ""}
          onChange={handleEditChange}
        >
          <option value="Active">Active</option>
          <option value="Active_cancelled">Active_cancelled</option>
          <option value="Inactive">Inactive</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          name="category"
          value={editFormData?.category || ""}
          onChange={handleEditChange}
          placeholder="Category"
          required
        />
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
          <div className="subscription-name">
            {sub.name}
            <span className={`status-dot ${getWarningClass(sub.endDate)}`}></span>
          </div>
          {expandedId === sub.id && (
            <div className="subscription-details">
              <p><strong>Price:</strong> ${sub.price}</p>
              <p><strong>Billing Cycle:</strong> {sub.billingCycle}</p>
              <p><strong>Start Date:</strong> {sub.startDate.toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {sub.endDate.toLocaleDateString()}</p>
              <p><strong>Status: </strong>{sub.status}</p>
              <p><strong>Category:</strong> {sub.category}</p>
              <p><strong>Notes: </strong>{sub.notes}</p>
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
