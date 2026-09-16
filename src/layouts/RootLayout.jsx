import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';

const RootLayout = () => {
    return (
        <div className='xl:w-10/12 mx-auto'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;