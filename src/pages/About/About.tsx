// src/pages/About/About.tsx
import React from 'react';
import Header from '../../components/common/Header/Header';
// import VideoCarousel from '../../components/common/VideoCarousel/VideoCarousel';
import Footer from '../../components/common/Footer/Footer';
import '../../styles/about.scss';

const About: React.FC = () => {
  // const videos = [
  //   'https://www.youtube.com/watch?v=j1gi4sT7AHY',
  //   'https://www.youtube.com/watch?v=j1gi4sT7AHY',
  //   // Add more video URLs as needed
  // ];

  return (
    <div>
      <Header />

      {/* Pictures and details */}
      <section className="about-section">
        <div className="frame-container">
          <div className="image-container">
            <img src="https://i.ibb.co/ScwmDLx/image.jpg" alt="image_frame" className="frame-1" />
          </div>
          <div className='hendrix-1'>
            <img src="https://i.ibb.co/yQyVzZB/IMG-2579-removebg-preview-1.png" alt="IMG-2579-removebg-preview-1" className='hendrix-img-1' />
          </div>
          <div className="text-content">
            <h2>Hendrix</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, elit sed finibus
              rhoncus, sem sem ultrices mauris.
            </p>
          </div>
        </div>

        <div className="frame-container">
          <div className="text-content">
            <h2>Hendrix's Family</h2>
            <p>
              Integer ultricies bibendum leo, vel hendrerit est vulputate a. Vestibulum vel tortor vitae
              nisi bibendum ultrices.
            </p>
          </div>
          <div className="image-container">
            <img src="https://i.ibb.co/ScwmDLx/image.jpg" alt="image_fame2" className="frame-2" />
          </div>
          <div className='hendrix-2'>
            <img src="https://i.ibb.co/qy8v2Gp/image-53.png" alt="hendrix" className='hendrix-img-2' />
          </div>
        </div>
      </section>

      <svg
        id="wave"
        style={{ transform: "rotate(180deg)", transition: "0.3s" }}
        viewBox="0 0 1440 230"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(243, 106, 62, 1)" offset="0%"></stop>
            <stop stopColor="rgba(255, 179, 11, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style={{ transform: 'translate(0, 0px)', opacity: 1 }}
          fill="url(#sw-gradient-0)"
          d="M0,65L15,58.5C30,52,60,39,90,39C120,39,150,52,180,62.8C210,74,240,82,270,75.8C300,69,330,48,360,39C390,30,420,35,450,39C480,43,510,48,540,49.8C570,52,600,52,630,45.5C660,39,690,26,720,34.7C750,43,780,74,810,82.3C840,91,870,78,900,62.8C930,48,960,30,990,23.8C1020,17,1050,22,1080,30.3C1110,39,1140,52,1170,56.3C1200,61,1230,56,1260,54.2C1290,52,1320,52,1350,56.3C1380,61,1410,69,1440,67.2C1470,65,1500,52,1530,41.2C1560,30,1590,22,1620,26C1650,30,1680,48,1710,58.5C1740,69,1770,74,1800,80.2C1830,87,1860,95,1890,82.3C1920,69,1950,35,1980,28.2C2010,22,2040,43,2070,49.8C2100,56,2130,48,2145,43.3L2160,39L2160,130L2145,130C2130,130,2100,130,2070,130C2040,130,2010,130,1980,130C1950,130,1920,130,1890,130C1860,130,1830,130,1800,130C1770,130,1740,130,1710,130C1680,130,1650,130,1620,130C1590,130,1560,130,1530,130C1500,130,1470,130,1440,130C1410,130,1380,130,1350,130C1320,130,1290,130,1260,130C1230,130,1200,130,1170,130C1140,130,1110,130,1080,130C1050,130,1020,130,990,130C960,130,930,130,900,130C870,130,840,130,810,130C780,130,750,130,720,130C690,130,660,130,630,130C600,130,570,130,540,130C510,130,480,130,450,130C420,130,390,130,360,130C330,130,300,130,270,130C240,130,210,130,180,130C150,130,120,130,90,130C60,130,30,130,15,130L0,130Z"
        />
      </svg>
      <section className="videolist-section">
        <h2 className='video-heading'>Video Showcase</h2>
        <p>No videos uploaded yet</p>
        {/* <VideoCarousel videos={videos} /> */}
      </section>
      <Footer />
    </div>
  );
};

export default About;


