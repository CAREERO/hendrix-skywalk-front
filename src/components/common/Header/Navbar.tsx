// src/components/common/Header/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/navbar.scss'; // Import the specific styles for the Navbar

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='nav-container'>
            <div className="burger-icon" onClick={toggleMenu}>
                &#9776;
            </div>

            <div className="main-header">
                <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/shop">Merch</Link>
                    </li>
                    <li className="logo-container">
                        <Link to="/">
                            <img src="https://i.ibb.co/Ms1Ybp3/logo.png" alt="Logo" className="logo-image" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/rewards">Rewards</Link>
                    </li>
                    <li>
                        <Link to="/videos">Videos</Link>
                    </li>
                </ul>
                <div className="icons">
                    <Link to="/shopping-cart">
                        <span role="img" aria-label="Shopping Cart">
                            🛒
                        </span>
                    </Link>
                    <Link to="/profile">
                        <span role="img" aria-label="Profile">
                            👤
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
