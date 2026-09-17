import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import GlobalPopup from '../components/globalPopup/GlobalPopup';

const RootLayout = () => {
    return (
        <div className='xl:w-10/12 mx-auto'>
            <Navbar />
            <GlobalPopup />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;