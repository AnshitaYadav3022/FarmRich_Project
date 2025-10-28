import React, { useEffect, useState } from "react";
import aboutBg from "../assets/images/aboutus.png";
import { FaTractor, FaSeedling, FaUsers, FaStore, FaChartLine, FaGlobe } from "react-icons/fa";
import CountUp from "react-countup";
import "./About.css";
import { Link } from "react-router-dom";


export default function About() {
  const [statVisible, setStatVisible] = useState([false, false, false, false]);
  const [faqActive, setFaqActive] = useState([false, false, false]);

  // IntersectionObserver for flashcards & stats
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setStatVisible((s) => {
              if (s[idx]) return s;
              const copy = [...s];
              copy[idx] = true;
              return copy;
            });
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll(".anim-card").forEach((el) => cardObserver.observe(el));
    document.querySelectorAll(".stat-card").forEach((el) => statObserver.observe(el));

    return () => {
      cardObserver.disconnect();
      statObserver.disconnect();
    };
  }, []);

  const toggleFAQ = (i) => {
    setFaqActive((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="about-page">
      {/* Background */}
      <div
        className="bg-image"
        style={{ backgroundImage: `url(${aboutBg})` }}
      />

      <main className="about-container">
        {/* Hero */}
        <header className="hero">
          <h1 className="hero-title">About FarmRich</h1>
          <div className="hero-text">
            <p>
            <b>  Fresh from Farm to You –<i> No Middlemen, Just Goodness.</i></b>
            </p>
            <p>
              At FarmRich, we believe farming is about more than harvests — it’s about community,
              dignity and sustainability. We bridge the gap between farmers and consumers,
              delivering fresh produce straight from the fields to your table while equipping farmers with modern tools and market access.
            </p>
            <p>
              FarmRich started with a simple idea: bridging the gap between hardworking farmers and conscious consumers. 
              Founded in 2023 by a team passionate about agriculture, technology, and social impact, we wanted to empower farmers with modern tools and insights while giving consumers fresh, honest, and locally-sourced produce.
            </p>
            <p>
              For farmers, we’re more than a marketplace. Explore top-quality farming tools, equipment, and supplies, all in one place. 
              Plus, with our crop disease detection feature, growing healthy crops has never been smarter.
              Modern supply chains often cut into farmers’ earnings and leave consumers with overpriced or low-quality products. 
              FarmRich solves this by removing middlemen, providing direct market access, and supporting sustainable farming practices.
              Consumers gain access to honest pricing and quality produce, while
              farmers gain empowerment through data, tools and direct trade. FarmRich isn’t just a website – it’s a modern farming community.
            </p>
            <p>
              Our journey is just beginning. 
              We plan to expand FarmRich to more regions, introduce smart farming analytics, sustainable farming training programs, and innovative delivery solutions — all aimed at making agriculture smarter, greener, and more accessible.
            </p>
            <p>
              <b>Farm. Connect. Grow. Enjoy.</b>
            </p>
          </div>
        </header>

        {/* Flashcards */}
        <section className="cards-section">
          <div className="anim-card card">
            <FaTractor className="card-icon" />
            <h3>Empowering Farmers</h3>
            <p>AI tools, training and direct-market access so farmers earn more.</p>
          </div>
          <div className="anim-card card">
            <FaSeedling className="card-icon" />
            <h3>Sustainable Farming</h3>
            <p>Promoting eco-friendly practices that protect soil and biodiversity.</p>
          </div>
          <div className="anim-card card">
            <FaUsers className="card-icon" />
            <h3>Building Community</h3>
            <p>Connecting local farmers with consumers and support networks.</p>
          </div>
        </section>

        {/* Stats */}
        <section className="stats-section">
          <div className="stat-card" data-index="0">
            <FaStore className="stat-icon" />
            <div className="stat-number">{statVisible[0] ? <CountUp end={3000} duration={2} /> : 0}+</div>
            <div className="stat-label">Active Buyers</div>
          </div>
          <div className="stat-card" data-index="1">
            <FaChartLine className="stat-icon" />
            <div className="stat-number">{statVisible[1] ? <CountUp end={10000} duration={2} /> : 0}+</div>
            <div className="stat-label">Crops Analyzed</div>
          </div>
          <div className="stat-card" data-index="2">
            <FaUsers className="stat-icon" />
            <div className="stat-number">{statVisible[2] ? <CountUp end={5000} duration={2} /> : 0}+</div>
            <div className="stat-label">Farmers Empowered</div>
          </div>
          <div className="stat-card" data-index="3">
            <FaGlobe className="stat-icon" />
            <div className="stat-number">{statVisible[3] ? <CountUp end={95} duration={2} /> : 0}%</div>
            <div className="stat-label">Support Satisfaction</div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="mvv-section">
          <h2 className="section-heading">Our Mission, Vision & Values</h2>
          <div className="mvv-cards">
            <div className="mvv-card">
              <h3>🌱 Mission</h3>
              <p>
                Empower farmers with AI-driven insights, tools, and a supportive community for sustainable productivity.
              </p>
            </div>
            <div className="mvv-card">
              <h3>🌍 Vision</h3>
              <p>
                Build a world where technology bridges the gap between farmers and innovation for sustainable agriculture.
              </p>
            </div>
            <div className="mvv-card">
              <h3>🤝 Values</h3>
              <p>Transparency, sustainability, inclusivity, and innovation drive everything we do.</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <h2 className="section-heading">Our Journey</h2>
          <ul className="timeline">
            <li><span className="year">2023</span><p>FarmRich was founded to make agriculture smarter.</p></li>
            <li><span className="year">2024</span><p>Launched AI crop detection and marketplace.</p></li>
            <li><span className="year">2025</span><p>Expanded community features, chatbot assistant, and supply chain support.</p></li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq">
            {["How does the AI crop detection work?",
              "Is FarmRich free to use?",
              "How do I buy or sell on the marketplace?"
            ].map((q, i) => (
              <div className={`faq-item ${faqActive[i] ? "active" : ""}`} key={i}>
                <div className="faq-question" onClick={() => toggleFAQ(i)}>{q}</div>
                <div className="faq-answer">
                  {i === 0 && "Our AI uses advanced image recognition to analyze crop health."}
                  {i === 1 && "Most features are free, with premium options available."}
                  {i === 2 && "Register, create a profile, and list or browse products easily."}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
        <h2>Join Us in Revolutionizing Farming 🚜</h2>
        <p>Be part of the change — explore our platform, connect with farmers, and experience the future of agriculture today!</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </section>
      </main>
    </div>
  );
}
