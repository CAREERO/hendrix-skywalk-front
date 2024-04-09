import React, { useRef, useEffect } from 'react';
import '../../styles/home.scss'; // Import the video banner styles
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
// import ProductList from '../../components/Shop/ProductList/ProductList';
import api from '../../services/api';
import Gif from '../../assets/images/hendrix_ninja.gif'; // Adjust the path based on your project structure

const HomePage = () => {
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${process.env.REACT_APP_API_TARGET}/api`);
        console.log(response.data.message); // Log the message from Django
      } catch (error) {
        console.error('Error fetching data from Django:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <Header />
      <div >
        <iframe
          title="Embedded Video"
          src="https://streamable.com/e/yeuk3h?autoplay=1"
          allow="fullscreen;autoplay"
          allowFullScreen
          ref={videoRef}
          style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}
        ></iframe>
        <div>
          <h3 className='home-banner-text'>How to be a<br />YouTuber?</h3>
          <p className='home-banner-subtext'>Want to know how to start<br />
            your own YouTube channel?
          </p>
          <button className="Vid-button">Play and Learn</button>
        </div>
      </div>
      <div className="image-gallery">
        <img src="https://i.imgur.com/ZFPYkJp.png" alt="Footer Decoration" className="footer-image" />
        <img src="https://i.imgur.com/yBB4QXd.png" alt="Flowers Decoration" className="flowers-image" />
        <h4 className='home-banner-merchtext'>Check Out<br />Our Merch<br />
          <button className="shop-button">Shop Here</button>
        </h4>
      </div>
      <div className="gif-container">
        <img src={Gif} alt="Your GIF" className="gif-image" />
      </div>
      <section className="productlist-section">

      </section>
     
      <Footer /> 
    </div>
  );
};

export default HomePage;
