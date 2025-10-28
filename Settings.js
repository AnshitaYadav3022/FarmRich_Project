import React from "react";
import "./Settings.css";

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <h2 className="page-title">Settings</h2>
      <div className="settings-card">
        <div className="setting-item">
          <span>Notifications</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="setting-item">
          <span>Dark Mode</span>
          <input type="checkbox" />
        </div>
        <div className="setting-item">
          <span>Newsletter</span>
          <input type="checkbox" defaultChecked />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
