// src/components/Footer/Footer.tsx
import React from 'react';
import '../../../styles/footer.scss'; // Import styles for the footer

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>About Us</p>
          <p>Contact</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; Hendrix.World. All rights reserved 2024 .</p>
      </div>
    </footer>
  );
};

export default Footer;
