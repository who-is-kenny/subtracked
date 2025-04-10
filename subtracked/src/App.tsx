import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import { Subscription } from "./types";

function App() {
  // helper functions to save and load data from local storage
  const saveToLocalStorage = (data: Subscription[]) => {
    localStorage.setItem("subscriptions", JSON.stringify(data));
  };
  const loadFromLocalStorage = (): Subscription[] => {
    try {
      const data = localStorage.getItem("subscriptions");
      if (!data) return [];

      const parsed = JSON.parse(data) as Subscription[];

      // Convert startDate and endDate back to Date object or else doesnt work
      // when loading from local storage
      return parsed.map((sub) => ({
        ...sub,
        startDate: new Date(sub.startDate),
        endDate: new Date(sub.endDate),
      }));
    } catch (error) {
      console.error("Failed to parse subscriptions from localStorage:", error);
      return [];
    }
  };

  const [subscriptions, setSubscriptions] =
    useState<Subscription[]>(loadFromLocalStorage);

  const [formData, setFormData] = useState<Subscription>({
    id: "",
    name: "",
    price: 0,
    billingCycle: "Monthly",
    startDate: new Date(),
    endDate: new Date(),
    status: "Active",
    category: "",
    notes: "",
  });

  useEffect(() => {
    saveToLocalStorage(subscriptions);
  }, [subscriptions]);

  const handleDelete = (id: string) => {
    const updatedSubscriptions = subscriptions.filter(
      (subscription) => subscription.id !== id
    );
    setSubscriptions(updatedSubscriptions);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newSubscription = {
            ...formData,
            id: crypto.randomUUID(), // generate unique ID
          };
          setSubscriptions([...subscriptions, newSubscription]);

          // Reset form
          setFormData({
            id: "",
            name: "",
            price: 0,
            billingCycle: "Monthly",
            startDate: new Date(),
            endDate: new Date(),
            status: "Active",
            category: "",
            notes: "",
          });
        }}
      >
        <h2>Add Subscription</h2>

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          required
        />

        <select
          value={formData.billingCycle}
          onChange={(e) =>
            setFormData({
              ...formData,
              billingCycle: e.target.value as Subscription["billingCycle"],
            })
          }
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Weekly">Weekly</option>
        </select>

        <input
          type="date"
          value={formData.startDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormData({
              ...formData,
              startDate: new Date(e.target.value),
            })
          }
          required
        />

        <input
          type="date"
          value={formData.endDate.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormData({
              ...formData,
              endDate: new Date(e.target.value),
            })
          }
          required
        />

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as Subscription["status"],
            })
          }
        >
          <option value="Active">Active</option>
          <option value="Active_cancelled">Active_cancelled</option>
          <option value="Inactive">Inactive</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <button type="submit">Add Subscription</button>
      </form>

      {/* Add the subscription list here 
    use this to test if there form is working*/}
      <h2>Subscriptions</h2>
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
    </>
  );
}

export default App;
