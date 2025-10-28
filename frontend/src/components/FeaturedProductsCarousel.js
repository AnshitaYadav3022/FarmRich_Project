import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useSuppliesCart } from "../context/SuppliesCartContext";
import productsData from "../data/products";
import suppliesData from "../data/supplies";
import "./FeaturedProductsCarousel.css";

export default function FeaturedProductsCarousel() {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToSuppliesCart } = useSuppliesCart();

  const allProducts = [
    ...productsData.map((p) => ({ ...p, type: "marketplace" })),
    ...suppliesData.map((p) => ({ ...p, type: "supplies" })),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 4) % allProducts.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [allProducts.length]);

  useEffect(() => {
    const newProducts = allProducts.slice(startIndex, startIndex + 4);
    if (newProducts.length < 4) {
      newProducts.push(
        ...allProducts.slice(0, 4 - newProducts.length)
      );
    }
    setVisibleProducts(newProducts);
  }, [startIndex, allProducts]);

  return (
    <div className="featured-carousel">
      <h2 className="featured-heading">🌾 Featured Products</h2>
      <div className="featured-grid">
        {visibleProducts.map((item, index) => (
          <div key={index} className="featured-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button
              onClick={() =>
                item.type === "marketplace"
                  ? addToCart(item)
                  : addToSuppliesCart(item)
              }
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
