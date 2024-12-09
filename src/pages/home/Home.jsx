import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/woman-reading.png";
import ctaRocket from "../../assets/cta-rocket.png";
import testimonial from "../../data/testimonialData";

const Home = () => {
  return (
    <div className="homepage-container container-fluid">
      {/* Hero Section */}
      <section className="hero-group container">
        <div className="hero-item">
          <h1>Achieve Financial Independence</h1>
          <p>
            Your journey to financial freedom starts here. Discover tools,
            books, and courses to grow your wealth and secure your future.
          </p>
          <Link to="/store" className="hero-button">
            Explore Our Store
          </Link>
        </div>
        <img
          src={heroImage}
          alt="Financial Freedom"
          className="hero-image img-fluid"
        />
      </section>

      {/* Featured Books/Courses */}
      <section className="featured-container">
        <h2>Featured Resources</h2>
        <div className="featured-group container">
          <div className="featured-item">
            <img src="https://via.placeholder.com/200" alt="Book 1" />
            <h3>The Intelligent Investor</h3>
            <p>
              Learn timeless principles of value investing by Benjamin Graham.
            </p>
            <Link to="/store/1" className="featured-button">
              View Details
            </Link>
          </div>
          <div className="featured-item">
            <img src="https://via.placeholder.com/200" alt="Course 1" />
            <h3>Financial Freedom Blueprint</h3>
            <p>
              A comprehensive course to take control of your finances and
              future.
            </p>
            <Link to="/store/2" className="featured-button">
              View Details
            </Link>
          </div>
          <div className="featured-item">
            <img src="https://via.placeholder.com/200" alt="Tool 1" />
            <h3>Budgeting Tool</h3>
            <p>
              Plan, track, and optimize your spending with our interactive tool.
            </p>
            <Link to="/store/3" className="featured-button">
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonial-container">
        <h2>What Our Users Say</h2>

        <div className="testimonial-group container">
          {testimonial.map((testimony) => (
            <div className="testimonial-item" key={testimony.title}>
              <p className="testimonial-item-testiony">{testimony.testimony}</p>
              <div className="testimonial-item-profile">
                <div className="testimonial-item-image">
                  <img
                    src={`./testimonialAvatar/${testimony.avatar}`}
                    alt={testimony.title}
                    className="img-fluid"
                  />
                </div>
                <div className="testimonial-item-profile-name">
                  <h4>{testimony.title}</h4>
                  <p>{testimony.poition}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-container">
        <div className="cta-group container">
          <img src={ctaRocket} alt="cta rocket" className="img-fluid" />
          <div className="cta-item">
            <h2>Ready to Take the First Step?</h2>
            <p>
              Explore our resources and start your journey to financial
              independence today!
            </p>
            <Link to="/store" className="cta-button">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
