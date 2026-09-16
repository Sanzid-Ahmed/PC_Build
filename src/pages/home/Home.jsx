import React from 'react';
import Banner from './Banner/Banner';
import Collaborate from './Collaborate/Collaborate';
import Reviews from './Reviews/Reviews';
import ComponentPills from './ComponentPills/ComponentPills';
import AboutUs from './AboutUs/AboutUs';


const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />
            <Collaborate />
            <div className='max-w-7xl mx-auto'>
            <Reviews reviewsPromise={reviewsPromise}></Reviews> 
            <ComponentPills />
            <AboutUs />
            </div>
        </div>
    );
};

export default Home;