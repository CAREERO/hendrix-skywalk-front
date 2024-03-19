import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './videoCarousel.scss';

interface VideoCarouselProps {
  videos: string[]; // Array of video URLs
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="video-carousel">
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index}>
            <iframe
              title={`Video ${index + 1}`}
              width="100%"
              height="315"
              src={video}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
