import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import ProductList from "../../components/ProductList/ProductList";
import api from "../../services/api";
import Gif from "../../assets/images/hendrix_ninja.gif";
import Spinner from "../../components/common/Spinner/Spinner";
import "../../pages/Home/home.scss";
import "./Layout.module.scss";

const HomePage = () => {
  const videoRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "http://localhost:8000/api/products/"
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

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="video-holder">
            <iframe
              title="Embedded Video"
              src="https://streamable.com/e/yeuk3h?autoplay=1&muted=1&nocontrols=1"
              allow="fullscreen;autoplay"
              allowFullScreen
              ref={videoRef}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                position: "absolute",
                left: "0px",
                top: "-10rem",
                overflow: "hidden",
                zIndex: -100,
              }}
            ></iframe>
            <div className="container-text">
              <h4 className="home-banner-text">How to be a YouTuber?</h4>
              <p className="home-banner-subtext">
                Want to know how to start your own YouTube channel?
              </p>
              <button className="video-play">Play and Learn</button>
            </div>
          </div>
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
              <h5 className="home-banner-merchtext">Check Out Our Merch</h5>
              <button className="shop-button" onClick={handleShopClick}>Shop Here</button>
            </div>
          </div>
          <div className="gif-container">
            <img src={Gif} alt="Your GIF" className="gif-image" />
          </div>
          <section className="productlist-section">
            <ProductList />
          </section>
        </div>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
