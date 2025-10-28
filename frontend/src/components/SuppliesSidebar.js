import React from "react";
import { useSuppliesCart } from "../context/SuppliesCartContext";
import { useNavigate } from "react-router-dom";
import "./SuppliesSidebar.css"; // ✅ separate CSS

const SuppliesSidebar = ({ isOpen, onClose }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useSuppliesCart();
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    onClose();
    navigate("/supplies-checkout");
  };

  return (
    <div className="supplies-cart-overlay">
      <div className="supplies-cart-sidebar open">
        <div className="supplies-cart-header">
          <h2>Your Supplies Cart</h2>
          <button className="supplies-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="supplies-cart-items">
          {cart.length === 0 ? (
            <p className="supplies-empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="supplies-cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="supplies-cart-item-img"
                />
                <div className="supplies-cart-item-details">
                  <h4>{item.name}</h4>
                  <p>
                    ₹{item.discountedPrice}{" "}
                    <span className="supplies-original-price">₹{item.price}</span>
                  </p>
                  <div className="supplies-quantity-controls">
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
                  className="supplies-remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="supplies-bill-section">
            <div className="supplies-bill-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="supplies-bill-row">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="supplies-bill-total">
              <strong>Total</strong>
              <strong>₹{total}</strong>
            </div>

            {savings > 0 && (
              <p className="supplies-savings-line">
                🎉 You saved <strong>₹{savings}</strong> on this order!
              </p>
            )}

            <button className="supplies-checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliesSidebar;
