import React from 'react'
import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar.jsx';

const Layout = () => {
    return(
        <>
        {/* Outlet is the child that is passed to this Layout*/}
        {/* <Navbar /> */}
        <Outlet />
        </>
    )
}

export default Layout