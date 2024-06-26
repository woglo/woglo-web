import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTaxi, faInfoCircle, faEnvelope, faImage, faBars, faTimes, faSignOut, faSignIn } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../utils/reducers/authSlice';

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state)=>state.auth.userDetails)
  console.log(user)
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const getNavItemClass = (path) => (
    `md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out ${location.pathname === path ? 'text-yellow-400' : 'hover:text-yellow-400'}`
  );

  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/login')
  }

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
      <div onClick={() => navigate('/home')} className={getNavItemClass('/home')}>
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </div>
      <div onClick={() => navigate('/cabs')} className={` ${location.pathname==='/'?'md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out text-yellow-400':getNavItemClass('/cabs')}`}>
        <FontAwesomeIcon icon={faTaxi} />
        <p>Cabs</p>
      </div>
      <div onClick={() => navigate('/about-us')} className={getNavItemClass('/about-us')}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <p>About Us</p>
      </div>
      <div onClick={() => navigate('/contact-us')} className={getNavItemClass('/contact-us')}>
        <FontAwesomeIcon icon={faEnvelope} />
        <p>Contact Us</p>
      </div>
      <div onClick={() => navigate('/gallery')} className={getNavItemClass('/gallery')}>
        <FontAwesomeIcon icon={faImage} />
        <p>Gallery</p>
      </div>
      {user && Object.keys(user).length !== 0 ? (
       <div className="relative" onClick={toggleDropdown}>
       <div className='md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:text-yellow-400'>
         <img className='rounded-full w-10 h-10' src={user.profileImage} alt="" />
         
       </div>
       {isDropdownOpen && (
         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
           <div className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer" onClick={() => { navigate('/profile'); setIsOpen(false); }}>
             Profile
           </div>
           <div onClick={handleLogout} className='block px-4 py-2 text-gray-800 hover:bg-gray-100 md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:text-red-500'>
          <FontAwesomeIcon icon={faSignOut} className='text-red-500' />
          <p>Logout</p>
        </div>
         </div>
       )}
     </div>
      //    <div onClick={handleLogout} className='md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:text-red-500'>
      //    <FontAwesomeIcon icon={faSignOut} className='text-red-500' />
      //    <p>Logout</p>
      //  </div>
      ):
      (
        <div onClick={()=>navigate('/login')} className='md:flex items-center gap-2 cursor-pointer transition duration-300 ease-in-out hover:text-yellow-400'>
         <FontAwesomeIcon icon={faSignIn}  />
         <p>Login</p>
       </div>
      )}
     
    </div>
      </div>
    </nav>
  );
}

export default NavBar;
