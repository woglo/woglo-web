import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope, faHome, faImage, faInfoCircle, faTaxi, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="bg-transparent absolute w-full top-0 left-0 z-30">
                <div className={`flex items-center justify-between p-4 ${isOpen ? 'bg-gradient-to-r from-blue-900 to-teal-600' : ''} md:flex`}>
                    <img
                        className="w-26 h-14 md:ml-5 ml-auto mr-auto cursor-pointer"
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
                    <div className={`flex-col md:flex md:flex-row md:items-center gap-10 md:mr-20 text-white text-lg font-semibold ${isOpen ? 'flex ' : 'hidden'} md:flex`}>
                    <div onClick={() => navigate('/home')} className={`flex items-center gap-2 ${location.pathname === '/home' || location.pathname === '/' ? 'text-yellow-400' : ''} hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out`}>
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </div>
                        <div onClick={() => navigate('/cabs')} className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
                            <FontAwesomeIcon icon={faTaxi} />
                            <p>Cabs</p>
                        </div>
                        <div onClick={() => navigate('/about-us')} className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <p>About Us</p>
                        </div>
                        <div onClick={() => navigate('/contact-us')} className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>Contact Us</p>
                        </div>
                        <div onClick={() => navigate('/gallery')} className="flex items-center gap-2 hover:text-yellow-400 cursor-pointer transition duration-300 ease-in-out">
                            <FontAwesomeIcon icon={faImage} />
                            <p>Gallery</p>
                        </div>
                    </div>
                </div>
            </nav>

      <div className="relative h-screen">
  <img
    className="w-full h-full object-cover"
    src="https://images.unsplash.com/photo-1580818135730-ebd11086660b?q=80&w=1457&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Scenic View"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10 "></div>
  <div className="absolute inset-0 flex flex-col md:ml-10 justify-center z-20 max-w-2xl mx-auto px-8">
    <h2 className="text-white text-5xl md:text-6xl  font-bold leading-tight">
    Find Your Dream Trip <br /> with Woglo
    </h2>
    <p className="text-white text-2xl md:text-3xl mt-6">
    Explore the world with us and experience <br /> unforgettable adventures.
    </p>
    <button className="bg-teal-500 hover:bg-teal-600 text-white mt-8 text-lg px-6 py-3 rounded-full transition duration-300">
      Plan Your Trip
    </button>
  </div>
</div>


      <div className="max-w-4xl mx-auto mt-10 p-6">
  <p className="text-3xl text-center font-bold text-teal-600 mb-8">Plan Your Getaway</p>

  <div className="bg-white rounded-lg shadow-lg p-8">
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <label htmlFor="from" className="text-gray-700 font-semibold mb-2 block">
          From
        </label>
        <select
          id="from"
          className="w-64 md:w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          name="country"
        >
          <option value="kochi">Kochi</option>
        </select>
      </div>

      <div className="md:w-1/2">
        <label htmlFor="to" className="text-gray-700 font-semibold mb-2 block">
          To
        </label>
        <select
          id="to"
          className="w-64 md:w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          name="country"
        >
          <option value="trivandrum">Trivandrum</option>
          <option value="bangalore">Bangalore</option>
         
        </select>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <label htmlFor="departure" className="text-gray-700 font-semibold mb-2 block">
          Departure Date
        </label>
        <input
          id="departure"
          className="w-64 md:w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="date"
          name="departure-date"
        />
      </div>

      <div className="md:w-1/2">
        <label htmlFor="arrival" className="text-gray-700 font-semibold mb-2 block">
          Arrival Date
        </label>
        <input
          id="arrival"
          className="w-64 md:w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          type="date"
          name="arrival-date"
        />
      </div>
    </div>

    <div className="mb-8">
      <label htmlFor="transport" className="text-gray-700 font-semibold mb-2 block">
        Transportation
      </label>
      <select
        id="transport"
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
        name="transport-mode"
      >
        <option value="car">5 seater</option>
        <option value="bus">7 seater</option>
        <option value="train">9 seater</option>
        <option value="flight" selected>
          10 seater
        </option>
      </select>
    </div>

    <div className="flex justify-center relative group">
  <button 
    className="bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-md hover:from-teal-600 hover:to-teal-800 transition"
    disabled
  >
    Get Estimate
  </button>
  <div className="absolute bottom-full mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-xs rounded py-1 px-2">
  🚫This feature is under development
  </div>
</div>
  </div>
</div>

<div className="relative">
  <img
    className="w-full h-[550px] object-cover"
    src="https://www.shutterstock.com/image-photo/close-hand-woman-using-smartphone-600nw-2003601542.jpg"
    alt="Assistance"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
  <div className="absolute inset-0 flex flex-col md:ml-20 justify-center z-20 max-w-2xl mx-auto px-8">
    <h2 className="text-white text-4xl md:text-6xl tracking-wide font-bold leading-tight">
      Need Assistance?
    </h2>
    <p className="text-white text-xl md:text-3xl mt-5 font-semibold">
      Don't worry, our friendly agents are here to help. <br /> Get in touch, and we'll be with you shortly.
    </p>
    <button className="bg-gradient-to-r from-teal-500 to-teal-700 text-white mt-8 text-lg px-6 py-3 rounded-full hover:from-teal-600 hover:to-teal-800 transition duration-300">
      Call Us: +91-9446688095
    </button>
  </div>
</div>

      <Footer />
    </>
  );
}

export default Home;
