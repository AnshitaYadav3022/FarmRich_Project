// src/pages/Home.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaGlobe, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useSuppliesCart } from "../context/SuppliesCartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import productsData from "../data/products";
import suppliesData from "../data/supplies";


// Media imports
import farm1 from "../assets/videos/farm1.mp4";
import farm2 from "../assets/videos/farm2.mp4";
import farm3 from "../assets/videos/farm3.mp4";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";
import banner5 from "../assets/images/banner5.png";
import ourStoryImg from "../assets/images/ourstory.jpg";
import "./Home.css";

const Home = () => {
  const videoSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
  };

  const bannerSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const testimonialSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const testimonials = [
    { name: "Ramesh", img: 3, text: "FarmRich helped me choose the right crops!", rating: 5 },
    { name: "Kavita", img: 5, text: "The irrigation tips saved me money.", rating: 4 },
    { name: "Arjun", img: 7, text: "Sustainable farming tips are great!", rating: 5 },
    { name: "Priya", img: 9, text: "Marketplace made selling easy.", rating: 5 },
    { name: "Anil", img: 11, text: "Love the organic produce options!", rating: 4 },
    { name: "Sunita", img: 13, text: "Helpful insights for my farm.", rating: 5 },
    { name: "Rohit", img: 15, text: "Excellent support from FarmRich.", rating: 5 },
    { name: "Meena", img: 17, text: "Saved water with their guidance.", rating: 4 },
    { name: "Vikram", img: 19, text: "Boosted my yield significantly.", rating: 5 },
    { name: "Sanya", img: 21, text: "A must-have app for farmers!", rating: 5 },
  ];

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.3 }
  );

  if (window.featureCards?.length) {
    window.featureCards.forEach((card) => {
      if (card instanceof Element) observer.observe(card);
    });
  }

  return () => {
    if (window.featureCards?.length) {
      window.featureCards.forEach((card) => {
        if (card instanceof Element) observer.unobserve(card);
      });
    }
  };
}, []);


  return (
    <div className="home-container">
      {/* ================= HERO VIDEO CAROUSEL ================= */}
      <Slider {...videoSettings} className="video-carousel">
        {[farm1, farm2, farm3].map((video, i) => (
          <div key={i}>
            <video src={video} autoPlay loop muted playsInline className="video-slide" />
          </div>
        ))}
      </Slider>

      <div className="home-overlay">
        <h1 className="home-title">Welcome to FarmRich</h1>
        <p className="home-slogan">Connecting Farmers and Consumers with Trust</p>
      </div>

      {/* ================= FEATURE BUTTONS ================= */}
      <section className="feature-buttons">
        <div className="feature-btn marketplace">
          <div className="icon-circle green">🛍️</div>
          <h3>Marketplace</h3>
          <p>Buy fresh organic products directly.</p>
          <Link to="/marketplace" className="btn-link">Visit</Link>
        </div>
        <div className="feature-btn supplies">
          <div className="icon-circle orange">🌱</div>
          <h3>Supplies</h3>
          <p>Get modern tools & farming supplies.</p>
          <Link to="/supplies" className="btn-link">Shop</Link>
        </div>
        <div className="feature-btn chatbot">
          <div className="icon-circle blue">💬</div>
          <h3>Chatbot</h3>
          <p>Ask questions, get instant help with PlantPal.</p>
          <Link to="/chatbot" className="btn-link">Chat</Link>
        </div>
        <div className="feature-btn detection">
          <div className="icon-circle purple">🔍</div>
          <h3>Detection</h3>
          <p>Detect plant health and growth instantly.</p>
          <Link to="/detection" className="btn-link">Check</Link>
        </div>
      </section>

      {/* ================= BANNER CAROUSEL ================= */}
      <section className="banner-carousel">
        <Slider {...bannerSettings}>
          {[banner1, banner2, banner3, banner4, banner5].map((b, i) => (
            <div key={i}><img src={b} alt={`banner${i}`} /></div>
          ))}
        </Slider>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="our-story">
        <div className="our-story-content">
          <div className="our-story-text">
            <h2>🌿 Our Story</h2>
            <p>
              At FarmRich, we believe in connecting farmers and consumers through
              trust, transparency, and technology. Our mission is to empower
              farmers with modern solutions while delivering organic, healthy
              produce directly to consumers.
            </p>
          </div>
          <div className="our-story-image">
            <img src={ourStoryImg} alt="Our Story" />
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <FeaturedProducts />

      {/* ================= FEATURES ================= */}
      <section className="features">
        {[
          { title: "🌾 Smart Crop Info", desc: "Learn about the best crops for your region and soil type." },
          { title: "💧 Water Guidance", desc: "Efficient irrigation tips to save water & increase yield." },
          { title: "🌍 Sustainability", desc: "Eco-friendly farming techniques for a greener future." },
        ].map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            ref={(el) => {
              if (!window.featureCards) window.featureCards = [];
              window.featureCards[index] = el;
            }}
          >
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials">
        <h2 className="testimonials-title">🌟 Farmers Speak Out!</h2>
        <Slider {...testimonialSettings} className="testimonial-cards">
          {testimonials.map((t, index) => (
            <div className="testimonial-slide" key={index}>
              <div className="testimonial-card">
                <img src={`https://i.pravatar.cc/150?img=${t.img}`} alt={t.name} />
                <h4>{t.name}</h4>
                <p>{t.text}</p>
                <div className="stars">{"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}</div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= ANALYSIS ================= */}
      <section className="analysis">
        <h2>📊 Real-time Sales Insights</h2>
        <p className="analysis-subtitle">Live performance metrics to keep your farm business growing 🌱</p>
        <div className="analysis-cards">
          <div className="analysis-card green"><div className="analysis-icon">💰</div><h3>$12,400</h3><p>Total Sales</p></div>
          <div className="analysis-card blue"><div className="analysis-icon">📦</div><h3>320+</h3><p>Orders Delivered</p></div>
          <div className="analysis-card purple"><div className="analysis-icon">💫</div><h3>85%</h3><p>Returning Customers</p></div>
          <div className="analysis-card orange"><div className="analysis-icon">🌾</div><h3>150+</h3><p>Partner Farms</p></div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section footer-brand">
            <h3>FarmRich</h3>
            <p>Connecting Farmers & Consumers with Trust</p>
            <p>Email: support@farmrich.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
          <div className="footer-section footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/marketplace">Marketplace</a></li>
              <li><a href="/supplies">Supplies</a></li>
              <li><a href="/detection">Detection</a></li>
            </ul>
          </div>
          <div className="footer-section footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="#"><FaGlobe /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FarmRich. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// ================= Featured Products =================
const FeaturedProducts = () => {
  const [featuredItems, setFeaturedItems] = useState(productsData.slice(0, 4));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 4) % productsData.length;
      setFeaturedItems(productsData.slice(nextIndex, nextIndex + 4));
      setCurrentIndex(nextIndex);
    }, 4000); // changes every 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="featured-products">
      <h2>🌟 Featured Products</h2>
      <div className="product-grid">
        {featuredItems.map((item, index) => (
          <div className="product-card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p className="price">₹{item.price}</p>
            <Link to="/marketplace">
              <button className="btn-buy">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
