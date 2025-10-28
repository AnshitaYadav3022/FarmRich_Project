import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // 👈 Add this
import "./CartSidebar.css";

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); // 👈 Add this

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.discountedPrice) * Number(item.quantity),
    0
  );
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryCharge;

  const savings = cart.reduce(
    (acc, item) => acc + (item.price - item.discountedPrice) * item.quantity,
    0
  );

  // 👇 Checkout button handler
  const handleCheckout = () => {
    onClose(); // close sidebar
    navigate("/checkout"); // go to checkout page
  };

  return (
    <div className="cart-overlay">
      <div className="cart-sidebar open">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.discountedPrice}{" "}
                    <span className="original-price">₹{item.price}</span>
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(item.quantity - 1, 0))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="bill-section">
            <div className="bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="bill-row">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="bill-total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

            {savings > 0 && (
              <p className="savings-line">
                🎉 You saved <strong>₹{savings}</strong> on this order!
              </p>
            )}

            {/* ✅ Add navigation */}
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
