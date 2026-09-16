import React, { useEffect, useState } from "react";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    reviewsPromise.then((data) => {
      setReviews(data);
    });
  }, [reviewsPromise]);

  return (
    <div>
      <div className="text-center mb-24">
        <h3 className="text-3xl font-bold my-8">
          Reviews
        </h3>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Sint quidem tempora modi. Optio labore aut, laudantium
          explicabo culpa asperiores sunt assumenda, possimus corrupti
          ab ipsam voluptatibus sapiente sed error unde?
        </p>
      </div>

      <Swiper
        loop={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        className="mySwiper"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review.id || index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;