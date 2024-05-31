import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"

import Home from '../pages/Home'
import Cabs from '../pages/Cabs'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'
import Gallery from '../pages/Gallery'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AccountSetup from '../pages/AccountSetup'

function UserRoute() {
  return (
    <>
    <Routes>
            <Route path="/" element={<Cabs />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cabs" element={<Cabs />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/gallery' element={<Gallery />} />
            {/* <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/account-setup' element={<AccountSetup />} /> */}


            </Routes>
    </>
  )
}

export default UserRoute