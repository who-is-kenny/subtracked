import { useState } from "react";
import { useNavigate } from "react-router-dom";

type StatusDurations = {
  green: number; // Days for "More than a month"
  yellow: number; // Days for "Less than a month"
  red: number; // Days for "Less than a week"
};

function Settings() {
  const [durations, setDurations] = useState<StatusDurations>(() => {
    const savedDurations = localStorage.getItem("statusDurations");
    return savedDurations
      ? JSON.parse(savedDurations)
      : { green: 30, yellow: 7, red: 3 }; // Default durations
  });

  const handleDurationChange = (status: keyof StatusDurations, value: number) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [status]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem("statusDurations", JSON.stringify(durations));
    navigate("/"); // Redirect to home page after saving
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <p>Customize the duration thresholds for subscription statuses:</p>
      <div className="settings-section">
        <label>
          <span>Green (More than this many days):</span>
          <input
            type="number"
            value={durations.green}
            onChange={(e) => handleDurationChange("green", Number(e.target.value))}
            min="1"
          />
        </label>
        <label>
          <span>Yellow (Less than this many days):</span>
          <input
            type="number"
            value={durations.yellow}
            onChange={(e) => handleDurationChange("yellow", Number(e.target.value))}
            min="1"
          />
        </label>
        <label>
          <span>Red (Less than this many days):</span>
          <input
            type="number"
            value={durations.red}
            onChange={(e) => handleDurationChange("red", Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <button className="save-settings" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Settings;