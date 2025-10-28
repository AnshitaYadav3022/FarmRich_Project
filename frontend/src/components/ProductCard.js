import React from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const inCart = cart.find((item) => item.id === product.id);

  return (
    <div className="product-card">
      {product.discount && (
        <div className="discount-badge">
          <i className="fa-solid fa-bookmark"></i> {product.discount}% OFF
        </div>
      )}
      <img src={product.image} alt={product.name} className="product-img" />
      <h4>{product.name}</h4>
      <p className="unit">{product.unit}</p>
      <p className="price">
        ₹{product.discounted}
        <span className="original-price">₹{product.price}</span>
      </p>

      {inCart ? (
        <div className="quantity-controls">
          <button onClick={() => updateQuantity(product.id, inCart.quantity - 1)}>
            -
          </button>
          <span>{inCart.quantity}</span>
          <button onClick={() => updateQuantity(product.id, inCart.quantity + 1)}>
            +
          </button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => addToCart(product)}>
          Add
        </button>
      )}
    </div>
  );
};

export default ProductCard;
