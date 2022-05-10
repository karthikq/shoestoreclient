/** @format */

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards, FreeMode, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageSlider = ({ imagesArray, imgClass }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <React.Fragment>
      {!imagesArray ? (
        <h2>Loading</h2>
      ) : imagesArray.length >= 2 ? (
        <React.Fragment>
          <Swiper
            effect={"cards"}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, EffectCards]}
            className="mySwiper">
            {imagesArray?.map((item) => (
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
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper">
            {imagesArray?.map((item) => (
              <SwiperSlide key={item}>
                <img src={item} alt="error" className="thumbs-slider_img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </React.Fragment>
      ) : (
        imagesArray?.map((item) => (
          <img src={item} key={item} alt="error" className={imgClass} />
        ))
      )}
    </React.Fragment>
  );
};

export default ImageSlider;
