import { useState } from "react";
import { useNavigate } from "react-router-dom";

type StatusDurations = {
  yellow: number; // Days for "Less than a month"
  red: number; // Days for "Less than a week"
};

function Settings() {
  const [durations, setDurations] = useState<StatusDurations>(() => {
    const savedDurations = localStorage.getItem("statusDurations");
    return savedDurations
      ? JSON.parse(savedDurations)
      : { yellow: 30, red: 7 }; // Default durations
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
        <label className="settings-label">
          <span>
            <strong>Red</strong> (Less than this many days):
          </span>
          <input
            type="number"
            value={durations.red}
            onChange={(e) => handleDurationChange("red", Number(e.target.value))}
            min="1"
          />
          <span className="color-box red"></span>
        </label>
        <label className="settings-label">
          <span>
            <strong>Yellow</strong> (Less than this many days):
          </span>
          <input
            type="number"
            value={durations.yellow}
            onChange={(e) => handleDurationChange("yellow", Number(e.target.value))}
            min={durations.red + 1} // Ensure yellow is greater than red
          />
          <span className="color-box yellow"></span>
        </label>
        <label className="settings-label">
          <span>
            <strong>Green</strong> (More than {durations.yellow} days):
          </span>
          <span className="color-box green"></span>
        </label>
      </div>
      <button className="save-settings" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default Settings;