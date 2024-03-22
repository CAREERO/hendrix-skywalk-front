import React, { useRef, useEffect } from "react";
import Header from "../../components/common/Header/Header";
import Footer from "../../components/common/Footer/Footer";
import ProductList from "../../components/Shop/ProductList/ProductList";
import api from "../../services/api"; // Import the api module
import Gif from "../../assets/images/hendrix_ninja.gif";
import "../../pages/Home/home.scss";

import "./Layout.module.scss"; // Adjust the import path as needed

const HomePage = () => {
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/api/products/"
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error fetching data from Django:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div
          className="video-holder"
        // style={{
        //   position: "relative",
        //   width: "100%",
        //   height: "0px",
        //   paddingBottom: "56.20%",
        //   zIndex: -100,
        // }}
        >
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
              zIndex: -100, // Remove this line
            }}
          ></iframe>
          <div className="container-text">
            <h4 className="home-banner-text">
              How to be a<br />
              YouTuber?
            </h4>
            <p className="home-banner-subtext">
              Want to know how to start
              <br />
              your own YouTube channel?
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
            <h5 className="home-banner-merchtext">
              Check Out
              <br />
              Our Merch
              <br />
              <button className="shop-button">Shop Here</button>
            </h5>
          </div>
        </div>
        <div className="gif-container">
          <img src={Gif} alt="Your GIF" className="gif-image" />
        </div>
        <section className="productlist-section">
          <ProductList />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
