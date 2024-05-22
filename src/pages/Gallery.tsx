import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Gallery() {
  const galleryImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1421&q=80',
    "./images/cars/image (4).png",
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
    "./images/cars/image (5).png",
    "./images/cars/image (6).png"
  ];

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Travel Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
              <img
                src={image}
                alt={`Travel Image ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;