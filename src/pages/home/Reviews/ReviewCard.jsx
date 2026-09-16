/* eslint-disable no-unused-vars */
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({review}) => {

    const { userName, review: testimonial, user_photoURL } = review;

    return (
<div className="card w-full max-w-sm bg-base-100 rounded-xl p-5 shadow-lg text-gray-700">
  {/* Quote Icon */}
  <div className="text-primary mb-2">
    <FaQuoteLeft className="text-3xl" />
  </div>

  {/* Testimonial Text */}
  <p className="text-gray-600 leading-relaxed text-sm mb-4">
    {testimonial}
  </p>

  {/* Dashed Divider */}
  <div className="border-b border-dashed border-primary mb-4"></div>

  {/* Author Info */}
  <div className="flex items-center gap-3">
    <div className="w-11 h-11 rounded-full bg-[#08484F] flex items-center justify-center">
      <img src={user_photoURL} alt="Awlad Hossin" className='rounded-full'/>
    </div>

    <div>
      <h4 className="font-bold text-base">
        {userName}
      </h4>
      <p className="text-gray-500 text-xs">
        Senior Product Designer
      </p>
    </div>
  </div>
</div>
  );
};

export default ReviewCard;