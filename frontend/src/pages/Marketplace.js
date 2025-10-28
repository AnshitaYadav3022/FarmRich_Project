import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import productsData from "../data/products";
import CartSidebar from "../components/CartSidebar";
import StickyCartBar from "../components/StickyCartBar";
import "./Marketplace.css";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Grains", "Meat", "Oils", "Eggs"];

  const filteredProducts = productsData.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (product) => {
    addToCart(product);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };


  return (
    <div className="marketplace-container">
      <h2 className="marketplace-title">Shop Fresh, Fast & Easy 🛒</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for fruits, vegetables, dairy..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);
          return (
            <div key={product.id} className="product-card">
              {/* Single Blinkit-style Discount Badge */}
              {product.discount && (
                <div className="discount-badge">{product.discount}% OFF</div>
              )}

              <img src={product.image} alt={product.name} className="product-image" />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="unit">{product.unit}</p>

                <div className="price">
                  <span className="discounted">₹{product.discountedPrice}</span>
                  <span className="original">₹{product.price}</span>
                </div>

                {/* Add / Quantity Buttons */}
                {!inCart ? (
                  <button className="add-btn" onClick={() => handleAdd(product)}>
                    Add
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(product.id, inCart.quantity - 1)}>
                      -
                    </button>
                    <span>{inCart.quantity}</span>
                    <button onClick={() => handleQuantityChange(product.id, inCart.quantity + 1)}>
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Cart Bar */}
      {/* Sticky Cart Bar */}
      <StickyCartBar onOpenCart={() => setIsCartOpen(true)} />

      {/* Sidebar Cart */}
      {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}

      </div>
  );
};

export default Marketplace;
