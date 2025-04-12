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

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const savedNotifications = localStorage.getItem("notificationsEnabled");
    return savedNotifications ? JSON.parse(savedNotifications) : false; // Default: notifications off
  });

  const handleDurationChange = (status: keyof StatusDurations, value: number) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [status]: value,
    }));
  };

  const handleNotificationToggle = () => {
    if (Notification.permission === "default") {
      // Ask for notification permission
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled((prev) => !prev);
        } else {
          alert("Notifications are disabled. Please enable them in your browser settings.");
        }
      });
    } else if (Notification.permission === "granted") {
      // Toggle notifications if permission is already granted
      setNotificationsEnabled((prev) => !prev);
    } else {
      // Handle case when notifications are denied
      alert("Notifications are disabled. Please enable them in your browser settings.");
    }
  };

  const navigate = useNavigate();

  const handleSave = () => {
    localStorage.setItem("statusDurations", JSON.stringify(durations));
    localStorage.setItem("notificationsEnabled", JSON.stringify(notificationsEnabled));

    // Send a notification to confirm the save action
    if (notificationsEnabled) {
    if (Notification.permission === "granted") {
      new Notification("Settings Saved", {
        body: "Your settings have been successfully saved.",
        icon: "/path/to/icon.png", // Replace with your actual icon path
      });
    } else {
      console.log("Notifications are disabled or not supported.");
    }
    }

    navigate("/"); // Redirect to home page after saving
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <h2>Warning Threshold</h2>
      <p>Customize the duration thresholds for subscription statuses</p>
      <div className="settings-section">
        <label className="settings-label">
          <span className="status-text">
            <strong>Red</strong> &nbsp; (Less than this many days)
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
          <span className="status-text">
            <strong>Yellow</strong> &nbsp; (Less than this many days)
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
          <span className="status-text">
            <strong>Green</strong> &nbsp; (More than {durations.yellow} days)
          </span>
          <span className="placeholder"></span>
          <span className="color-box green"></span>
        </label>
      </div>
      <h2>Notifications</h2>
      <p>Notifications will be sent when warning status changes</p>
      <div className="settings-section">
        <label className="settings-label">
          <span className="status-text">
            <strong>Enable Notifications:</strong></span>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
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