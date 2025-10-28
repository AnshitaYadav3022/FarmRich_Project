import React, { useState } from "react";
import { useSuppliesCart } from "../context/SuppliesCartContext";
import suppliesData from "../data/supplies";
import SuppliesSidebar from "../components/SuppliesSidebar";
import SuppliesCartBar from "../components/SuppliesCartBar";
import "./Supplies.css";

const Supplies = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, updateQuantity, removeFromCart } = useSuppliesCart();

  const categories = [
    "All",
    "Fertilizers",
    "Seeds",
    "Pesticides",
    "Equipment",
    "Soil",
    "Tools",
  ];

  const filteredSupplies = suppliesData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (item) => {
    addToCart(item);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="supplies-container">
      <h2 className="supplies-title">Farm Supplies & Essentials 🌾</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search fertilizers, seeds, tools..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Supplies Grid */}
      <div className="product-grid">
        {filteredSupplies.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);

          return (
            <div key={product.id} className="product-card">
              {product.discount && (
                <div className="discount-badge">{product.discount}% OFF</div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="product-image rounded"
              />

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="unit">{product.unit}</p>

                <div className="price">
                  <span className="discounted">₹{product.discountedPrice}</span>
                  <span className="original">₹{product.price}</span>
                </div>

                {!inCart ? (
                  <button className="add-btn" onClick={() => handleAdd(product)}>
                    Add
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, inCart.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{inCart.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, inCart.quantity + 1)
                      }
                    >
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
      <SuppliesCartBar onOpenCart={() => setIsCartOpen(true)} />

      {/* Sidebar Cart */}
      {isCartOpen && (
        <SuppliesSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
};

export default Supplies;
