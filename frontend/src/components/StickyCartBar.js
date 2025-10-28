import React from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import "./StickyCartBar.css";

const StickyCartBar = ({ onOpenCart }) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  if (cart.length === 0) return null; // hide when empty

  return (
    <div className="floating-cart-container">
      <button className="floating-cart-btn" onClick={onOpenCart}>
        <ShoppingCart size={20} style={{ marginRight: "6px" }} />
        <span>
          <strong>{totalItems} item{totalItems > 1 ? "s" : ""}</strong>
          <br />₹{totalPrice}
        </span>
      </button>
    </div>
  );
};

export default StickyCartBar;
