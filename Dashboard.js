import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  User,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";

import Overview from "./dashboard/Overview";
import MarketplaceOrders from "./dashboard/MarketplaceOrders";
import SuppliesOrders from "./dashboard/SuppliesOrders";
import Profile from "./dashboard/Profile";
import SettingsPage from "./dashboard/Settings";

import "./Dashboard.css";

const Dashboard = () => {
  const [active, setActive] = useState("overview");

  const sections = {
    overview: <Overview />,
    marketplace: <MarketplaceOrders />,
    supplies: <SuppliesOrders />,
    profile: <Profile />,
    settings: <SettingsPage />,
  };

  const menu = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "marketplace", label: "Marketplace Orders", icon: <ShoppingBag size={18} /> },
    { id: "supplies", label: "Supplies Orders", icon: <Package size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <Leaf size={26} className="logo-icon" /> <span>FarmRich</span>
        </div>

        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`menu-item ${active === item.id ? "active" : ""}`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <button
          className="logout-button"
          onClick={() => (window.location.href = "/login")}
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <motion.main
        key={active}
        className="main-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        {sections[active]}
      </motion.main>
    </div>
  );
};

export default Dashboard;
