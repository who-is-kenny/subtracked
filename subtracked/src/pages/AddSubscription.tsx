import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subscription } from "../types/SubscriptionType";

type Props = {
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
};

function AddSubscriptionForm({ subscriptions, setSubscriptions }: Props) {
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

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSub = { ...formData, id: crypto.randomUUID() };
    setSubscriptions([...subscriptions, newSub]);

    navigate("/"); // go back to home page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Subscription</h2>
      
      <label className="form-label">Name:</label>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <label className="form-label">Price:</label>
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
        required
      />
      
      <label className="form-label">Billing Cycle:</label>
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
      
      <label className="form-label">Start Date:</label>
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
      
      <label className="form-label">End Date:</label>
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
      
      <label className="form-label">Status:</label>
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
      
      <label className="form-label">Category:</label>
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
      />
      
      <label className="form-label">Notes:</label>
      <textarea
        placeholder="Notes (optional)"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />
      
      <button type="submit">Add Subscription</button>
      <button type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </form>
  );
}

export default AddSubscriptionForm;
