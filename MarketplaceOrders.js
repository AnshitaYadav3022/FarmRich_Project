import React from "react";
import "./MarketplaceOrders.css";

const fakeOrders = [
  { id: "M-001", item: "Wheat", qty: 50, price: 1250, status: "Delivered", date: "2025-10-02" },
  { id: "M-002", item: "Basmati Rice", qty: 20, price: 500, status: "Pending", date: "2025-10-01" },
  { id: "M-003", item: "Almond Milk", qty: 10, price: 300, status: "Cancelled", date: "2025-09-29" },
    { id: "M-004", item: "Watermelon", qty: 10, price: 300, status: "Dispatched", date: "2025-09-29" },
];

const MarketplaceOrders = () => {
  return (
    <div>
      <h2 className="page-title">Marketplace Orders</h2>
      <div className="orders-cards">
        {fakeOrders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">{order.id}</span>
              <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <p><strong>Item:</strong> {order.item}</p>
            <p><strong>Quantity:</strong> {order.qty}</p>
            <p><strong>Price:</strong> ₹{order.price}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceOrders;
