import React from "react";
import "./SuppliesOrders.css";

const fakeSupplies = [
  { id: "S-001", item: "Fertilizer Bag", qty: 5, status: "Delivered", date: "2025-10-02" },
  { id: "S-002", item: "Tractor Fuel", qty: 10, status: "Pending", date: "2025-09-29" },
  { id: "S-003", item: "Seeds Pack", qty: 20, status: "Cancelled", date: "2025-09-26" },
];

const SuppliesOrders = () => {
  return (
    <div>
      <h2 className="page-title">Supplies Orders</h2>
      <div className="orders-cards">
        {fakeSupplies.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">{order.id}</span>
              <span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span>
            </div>
            <p><strong>Item:</strong> {order.item}</p>
            <p><strong>Quantity:</strong> {order.qty}</p>
            <p><strong>Date:</strong> {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuppliesOrders;
