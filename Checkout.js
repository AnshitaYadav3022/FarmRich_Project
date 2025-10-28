import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.discountedPrice) * Number(item.quantity),
    0
  );
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryCharge;
  const savings = cart.reduce(
    (acc, item) =>
      acc + (item.price - item.discountedPrice) * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setShowSuccess(true);

    // Auto close popup + redirect after 2.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/"); // redirect to home page
    }, 2500);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        {/* 🧾 CART SUMMARY */}
        <section className="checkout-section">
          <h2>🧾 Order Summary</h2>
          {cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      ₹{item.discountedPrice} × {item.quantity}
                    </span>
                  </div>
                  <p className="item-total">
                    ₹{item.discountedPrice * item.quantity}
                  </p>
                </div>
              ))}

              <div className="summary-total">
                <div>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div>
                  <span>Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="total-line">
                  <strong>Total</strong>
                  <strong>₹{total}</strong>
                </div>
                {savings > 0 && (
                  <p className="savings">🎉 You saved ₹{savings} on this order!</p>
                )}
              </div>
            </>
          )}
        </section>

        {/* 🏠 ADDRESS FORM */}
        <section className="checkout-section">
          <h2>🏠 Delivery Details</h2>
          <form className="address-form">
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Phone Number" required />
            <input type="text" placeholder="Street Address" required />
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="Pincode" required />
          </form>
        </section>

        {/* 💳 PAYMENT OPTIONS */}
        <section className="checkout-section">
          <h2>💳 Payment Options</h2>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" defaultChecked /> Cash on Delivery
            </label>
            <label>
              <input type="radio" name="payment" /> UPI / Wallet
            </label>
            <label>
              <input type="radio" name="payment" /> Credit / Debit Card
            </label>
          </div>
        </section>

        {/* ✅ PLACE ORDER */}
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          ✅ Place Order
        </button>
      </div>

      {/* 🎉 SUCCESS POPUP */}
      {showSuccess && (
        <div className="success-popup">
          <div className="popup-content">
            <div className="success-icon">✅</div>
            <h3>Order Placed Successfully!</h3>
            <p>Your order will be delivered soon 🚚</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
