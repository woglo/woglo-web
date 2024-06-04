import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import BookNow from './BookNow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function PersonalDetails({ isOpen, onClose,cab }) {{/*packageDetails*/}
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [details,setDetails] = useState({})
  const [isModalOpen,setIsModalOpen] = useState(false)

//   const handleNameChange = (e) => {
//     const nameValue = e.target.value;
//     const onlyCharacters = /^[a-zA-Z\s]*$/;

//     if (nameValue.length === 0) {
//         setName('');
//         validateForm('', email, phone);
//       }
//     if (onlyCharacters.test(nameValue)) {
//         setName(nameValue);
//       if (nameValue.length >= 2 && nameValue.length <= 50) {
//         setName(nameValue);
//         validateForm(nameValue, email, phone);
//       }
//     } else if (nameValue.length === 0) {
//       setName('');
//       validateForm('', email, phone);
//     }
//   };
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     validateForm(name, e.target.value, phone);
//   };

//   const handlePhoneChange = (e) => {
//     const phoneValue = e.target.value;
//     const onlyDigits = /^\d*$/;
//     setPhone(phoneValue);
//     if (phoneValue.length === 10 && onlyDigits.test(phoneValue)) {
//       setPhone(phoneValue);
//       validateForm(name, email, phoneValue);
//     }
//   };

//   const validateForm = (name, email, phone) => {
//     if (name && phone) {
//       setIsFormValid(true);
//     } else {
//       setIsFormValid(false);
//     }
//   };

const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
  
    // Validate name
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setNameError('Name should only contain characters');
      setIsFormValid(false);
    } else if (value.length < 3) {
      setNameError('Name should be at least 3 characters long');
      setIsFormValid(false);
    } else if (value.length > 50) {
      setNameError('Name should not exceed 50 characters');
      setIsFormValid(false);
    } else {
      setNameError('');
      setIsFormValid( phoneError === '' && value.length > 1 && phone.length === 10);
    }
  };
  
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);
  
    // Validate phone number
    if (!/^\d+$/.test(value)) {
      setPhoneError('Phone number should only contain digits');
      setIsFormValid(false);
    } else if (value.length !== 10) {
      setPhoneError('Phone number should be exactly 10 digits');
      setIsFormValid(false);
    } else {
      setPhoneError('');
      setIsFormValid(nameError === '' && name.length > 1 && value.length === 10);
    }
  };

  const handleSubmit = async () => {
    setIsFormValid(false)
    const person = {
      name: name,
      phone: phone,
      email: email || ""
    };
    setDetails(person)
    setIsModalOpen(true)
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 rounded-lg shadow-lg p-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <button onClick={onClose} className="float-right">
        <FontAwesomeIcon icon={faX} className='mr-2 text-red-500'/>
      </button>
      <div className="bg-white rounded-lg p-6">
        <div className="bg-cover bg-center h-36 rounded-t-lg" style={{ backgroundImage: 'url("https://source.unsplash.com/random/800x600?beach")' }}></div>
        <div className="p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center text-teal-500">
            <FaUser className="mr-2" />
            Personal Details
          </h2>
          <div className="mb-4">
            <label htmlFor="name" className="flex items-center mb-2 text-gray-700">
              <FaUser className="mr-2 text-teal-500" />
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className={`w-full px-4 py-2 rounded-lg border ${
                nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-teal-600'
              }  focus:outline-none focus:ring-2`}
              value={name}
              onChange={handleNameChange}
              required
            />  
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="flex items-center mb-2 text-gray-700">
              <FaEnvelope className="mr-2 text-teal-500" />
              Email(optional)
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg border border-gray-400  focus:outline-none focus:ring-2 focus:ring-teal-600"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="flex items-center mb-2 text-gray-700">
              <FaPhone className="mr-2 text-teal-500" />
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 rounded-lg border ${
                phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-teal-600'
              } focus:outline-none focus:ring-2`}
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            {phoneError && <p className="text-red-500 mt-1">{phoneError}</p>}
          </div>
          <button
            type="submit"
            className={`bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>
      {isModalOpen && <BookNow isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} data={details} cab={cab}/>}
    </Modal>
  )
}

export default PersonalDetails;
