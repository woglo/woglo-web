import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTaxi, faInfoCircle, faEnvelope, faImage, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-teal-600 fixed w-full top-0 left-0 z-30 shadow-lg">
      <div className="flex items-center justify-between p-2">
        <img
          className="w-26 h-14 cursor-pointer"
          src="./images/image (2).png"
          alt="Logo"
          onClick={() => navigate('/home')}
        />
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div className={`flex-col md:flex md:flex-row md:items-center gap-10 md:mr-20 text-white text-lg font-semibold ${isOpen ? 'flex' : 'hidden'}`}>
          <div onClick={() => navigate('/home')} className="md:flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faHome} />
            <p>Home</p>
          </div>
          <div onClick={() => navigate('/cabs')} className="md:flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faTaxi} />
            <p>Cabs</p>
          </div>
          <div onClick={() => navigate('/about-us')} className="md:flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faInfoCircle} />
            <p>About Us</p>
          </div>
          <div onClick={() => navigate('/contact-us')} className="md:flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Contact Us</p>
          </div>
          <div onClick={() => navigate('/gallery')} className="md:flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={faImage} />
            <p>Gallery</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;