import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import ProductList from "../../components/ProductList/ProductList";
import api from "../../services/api";
import Gif from "../../assets/images/hendrix_ninja.gif";
import Spinner from "../../components/common/Spinner/Spinner";
import "../../pages/Home/home.scss";
import BannerVideo from "../../components/Form/BannerVideo";

const HomePage = () => {
  const videoRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_API_BASE_PROD}/api/products/`
        );
        console.log(response.data.message);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Django:", error);
      }
    };
    fetchData();
  }, []);

  const handleShopClick = () => {
    navigate("/shop"); // Navigate to Shop Page
  };

  const videoSrc: string = require('../../assets/videos/video_banner.mp4');

  return (
    <>
      <Header />
      <div className="main-content">
        {loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <BannerVideo videoSrc={videoSrc}/>
            <div className="image-gallery">
              <img
                src="https://i.imgur.com/ZFPYkJp.png"
                alt="Footer Decoration"
                className="footer-image"
              />
              <img
                src="https://i.ibb.co/QrnTdtP/ninjastar.png"
                alt="Flowers Decoration"
                className="ninjastar-image"
              />
              <div className="shop-here">
                <h5 className="home-banner-merchtext">Check Out <br /> Our Merch</h5>
                <button className="shop-button" onClick={handleShopClick}>Shop Here</button>
              </div>
            </div>
            <div className="gif-container">
              <img src={Gif} alt="Your GIF" className="gif-image" />
            </div>
            <section className="productlist-section">
              <ProductList />
            </section>
            <Footer />
          </div>
        )}
      </div>

    </>
  );
};

export default HomePage;
