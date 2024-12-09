import React from "react";
import "./Footer.css";

const Footer = () => {
  const thisYear = new Date();

  return (
    <footer>
      <div className="footer-container container">
        <div className="footer-group">
          <a href="#" className="footer-logo">
            INNO
          </a>
          <div className="footer-link-group">
            <a href="#" className="footer-link">
              Terms & Conditions
            </a>
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Cookies
            </a>
            <a href="#" className="footer-link">
              Refunds
            </a>
            <a href="#" className="footer-link">
              License
            </a>
          </div>
        </div>
        <p> Copyright © {thisYear.getFullYear()} Inno</p>
      </div>
    </footer>
  );
};

export default Footer;
