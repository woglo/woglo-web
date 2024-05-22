import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

function AboutUs() {
  return (
    <>
      <NavBar />
      <div className="relative h-[80vh]">
        <img
          className="w-full h-[80vh] object-cover"
          src="./images/Abt.png"
          alt="Scenic View"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <h2 className="text-white text-4xl md:text-6xl tracking-wide font-bold text-center">
            About Our Travel Venture
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
              Woglo Technologies is pioneering the revolution of the tourism industry through innovative technological solutions. We are proud to receive this prestigious award from the Ministry of Tourism, Startup India, and Kerala Startup Mission for our efforts.
            </p>
            <div className="flex flex-wrap justify-center items-center md:justify-start gap-6">
              <img
                className="w-[130px] h-[80px]"
                src="./images/image (4).png"
                alt="Footer Logo 1"
              />
              <img
                className="w-[200px] h-[140px]"
                src="./images/image (5).png"
                alt="Footer Logo 2"
              />
              <img
                className="w-[130px] h-[140px]"
                src="./images/image (6).png"
                alt="Footer Logo 3"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-lg p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105 animate-fadeIn">
              <p className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Our Impact
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col items-center ml-auto mr-auto md:mr-8 mb-6 md:mb-0">
                  <p className="text-5xl font-bold text-white ">90</p>
                  <p className="text-lg font-semibold text-white">Total Trips</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-5xl font-bold text-white">86</p>
                  <p className="text-lg font-semibold text-white">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;