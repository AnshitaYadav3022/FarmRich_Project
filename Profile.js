import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      <h2 className="page-title">User Profile</h2>
      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Profile"
          className="profile-img"
        />
        <h3 className="profile-name">John Doe</h3>
        <p className="profile-email">johndoe@example.com</p>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
