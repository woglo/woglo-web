import { faEnvelope, faLocation, faLocationDot, faMultiply, faPencil, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import ReactModal from 'react-modal'
import Modal from 'react-modal';

function ViewProfileDetails({isOpen,onClose,user}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 rounded-lg  pt-1 pl-6 pr-1 pb-6"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      ariaHideApp={false}
    >
        <div className='flex justify-between items-center mt-5'>
            <p className='font-semibold text-2xl'>{user.name}</p>
            <FontAwesomeIcon icon={faMultiply} className='mr-3' size='2x'/>
        </div>
        <hr className='-ml-6 mt-2'></hr>
        <div className='flex justify-between items-center mt-5'>
            <p className=' text-xl'>Contact Info</p>
            <FontAwesomeIcon icon={faPencil} className='mr-5' size='1x'/>
        </div>
        <div className='flex gap-10 items-center mt-5'>
            <FontAwesomeIcon icon={faEnvelope} className='mr-5' size='1x'/>
            <div className='flex flex-col justify-start'>
            <p className=' text-xl'>Email</p>
            <p>{user.email}</p>
            </div>
        </div>
        <div className='flex gap-10 items-center mt-5'>
            <FontAwesomeIcon icon={faPhone} className='mr-5' size='1x'/>
            <div className='flex flex-col justify-start'>
            <p className=' text-xl'>Phone</p>
            <p>{user.phone}</p>
            </div>
        </div>
        <div className='flex gap-10 items-center mt-5'>
            <FontAwesomeIcon icon={faLocationDot} className='mr-5' size='1x'/>
            <div className='flex flex-col justify-start'>
            <p className=' text-xl'>Address</p>
            <p>{user.address}</p>
            </div>
        </div>
        <div className='flex gap-10 items-center mt-5'>
            <FontAwesomeIcon icon={faUser} className='mr-5' size='1x'/>
            <div className='flex flex-col justify-start'>
            <p className=' text-xl'>Ownership Type</p>
            <p>{user.ownershiptype}</p>
            </div>
        </div>
        
    </Modal>
)
}

export default ViewProfileDetails