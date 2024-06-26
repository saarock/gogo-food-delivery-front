import { Outlet } from 'react-router-dom'
import { Header } from './components'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import useLoadAddtoCardOnState from './hooks/useLoadAddtoCardOnState';
import useLocationTrack from './hooks/useLocationTrack';
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
const Layout = () => {


    useLoadAddtoCardOnState()



    
    return (
        <>
            <ToastContainer position="top-left" />
            <Header />
            <Outlet />
        </>
    )
}

export default Layout