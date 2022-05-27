/** @format */

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, FreeMode, Thumbs, Lazy } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageSlider = ({ imagesArray, imgClass }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <React.Fragment>
      {imagesArray?.length === 0 ? (
        <h2>Loading</h2>
      ) : imagesArray?.length >= 2 ? (
        <React.Fragment>
          <Swiper
            effect={"cards"}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, EffectCards, Lazy]}
            className="mySwiper">
            {imagesArray &&
              imagesArray?.map((item) => (
                <SwiperSlide key={item}>
                  <img src={item} alt="error" className={imgClass} />
                </SwiperSlide>
              ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            effect={"cards"}
            slidesPerView={imagesArray?.length}
            freeMode={true}
            spaceBetween={0}
            watchSlidesProgress={true}
            modules={[FreeMode]}
            className="mySwiper">
            {imagesArray &&
              imagesArray?.map((item) => (
                <SwiperSlide key={item} className="slider-div">
                  <img src={item} alt="error" className="thumbs-slider_img" />
                </SwiperSlide>
              ))}
          </Swiper>
        </React.Fragment>
      ) : imagesArray ? (
        imagesArray?.map((item) => (
          <img src={item} key={item} alt="error" className={imgClass} />
        ))
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ImageSlider;
