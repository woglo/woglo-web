import { faUser, faPlane, faTaxi, faHotel, faUmbrellaBeach, faPersonBiking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  return (
    <aside className="w-64 bg-gradient-to-r from-blue-900 to-teal-600 pt-16 min-h-screen">
      <div className='mt-20 flex flex-col items-center gap-6'>
        {/* <h2 className='text-2xl font-bold text-white mb-4'>Travel Buddy</h2> */}
        <NavItem icon={faUser} text="My Profile"link="/profile" />
        {/* <NavItem icon={faPlane} text="Flights" /> */}
        <NavItem icon={faTaxi} text="Vehicles" link="/my-vehicles"/>
         <NavItem icon={faPersonBiking} text="Drivers" />
        {/*<NavItem icon={faUmbrellaBeach} text="Beaches" /> */}
      </div>
    </aside>
  );
}

function NavItem({ icon, text, link }) {
  const navigate = useNavigate()
  
  return (
    <div className='w-full group'>
      <p onClick={()=>navigate(link)} className='font-semibold text-lg cursor-pointer text-white py-3 px-6 transition-all duration-300 ease-in-out hover:bg-white hover:text-indigo-600 rounded-lg mx-2 flex items-center'>
        <FontAwesomeIcon icon={icon} className="mr-3 w-6 h-6" />
        {text}
      </p>
    </div>
  );
}

export default SideBar;