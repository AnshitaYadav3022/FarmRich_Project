import React from "react";
import { ShoppingCart } from "lucide-react";
import { useSuppliesCart } from "../context/SuppliesCartContext"; // <-- use your Supplies cart context
import "./SuppliesCartBar.css";

const SuppliesCartBar = ({ onOpenCart }) => {
  const { cart } = useSuppliesCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  if (cart.length === 0) return null; // hide when empty

  return (
    <div className="supplies-floating-cart-container">
      <button className="supplies-floating-cart-btn" onClick={onOpenCart}>
        <ShoppingCart size={20} style={{ marginRight: "6px" }} />
        <span>
          <strong>{totalItems} item{totalItems > 1 ? "s" : ""}</strong>
          <br />₹{totalPrice}
        </span>
      </button>
    </div>
  );
};

export default SuppliesCartBar;
