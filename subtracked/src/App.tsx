import { useState } from "react";
import "./App.css";
import { Subscription } from "./types";

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // const [count, setCount] = useState(0)
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
    </>
  );
}

export default App;
