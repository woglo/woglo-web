import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import { FaUserEdit, FaEye } from 'react-icons/fa';
import { myProfile } from '../services/api/user/apiMethods';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import ViewProfileDetails from '../components/Modals/ViewProfileDetails';
import EditProfile from '../components/Modals/EditProfile';



function Profile() {
    const user = useSelector((state)=>state.auth.userDetails)
    const [isProfileModalOpen,setIsProfileModalOpen] = useState(false)
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
    useEffect(()=>{
        try {
            myProfile(user._id).then((res)=>{
                const data = res.data
                if(res.status!=200){
                    toast.error(data.error)
                }
            })
        } catch (error) {
            toast.error("An error occurred while fetching data.");
        }
        },[])

        const handleViewProfileDetails = ()=>{
            setIsProfileModalOpen(!isProfileModalOpen)
        }

        const handleEditProfile = ()=>{
          setIsEditProfileModalOpen(!isEditProfileModalOpen)
      }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="hidden md:block z-10 sticky top-0">
        <NavBar />
      </div>
      <div className="flex">
        <div className="sticky top-5 h-screen">
          <SideBar />
        </div>
        <main className="flex-1 p-8 mt-14"> {/* Main content area */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-blue-400 to-indigo-500">
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white" />
            </div>
            <div className="relative px-6 py-10">
              <div className="absolute -top-20 left-10">
                <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-xl">
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="ml-56">
                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600 mt-2">{user.ownershiptype==='single'?'Individual':'Agency'}</p>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out" onClick={handleViewProfileDetails}>
                  <FaEye className="mr-2" /> View Profile Details
                </button>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out" onClick={handleEditProfile}>
                  <FaUserEdit className="mr-2" /> Edit Profile
                </button>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
              <p className="text-gray-600">
                {/* Safety is my top priority. I have been driving for 10 years and ensure a safe and comfortable experience for my passengers. */}
                {user.bio?user.bio:"---No data---"}
              </p>
            </div>
            <div className='flex justify-between mt-5 mb-5'>
              <div className='bg-slate-100 w-72 h-36 flex rounded-lg overflow-hidden ml-6'>
                <img src="/images/bgImg/By my car-rafiki.png" alt="" className="h-full w-1/2 object-cover" />
                <div className='flex flex-col items-center justify-center flex-1'>
                  <p className='font-semibold text-xl'>Total Vehicle</p>
                  <p className='font-semibold'>10</p>
                </div>
              </div>
              <div className='bg-slate-100 w-72 h-36 flex rounded-lg overflow-hidden mr-6'>
                <img src="/images/bgImg/Order ride-amico.png" alt="" className="h-full w-1/2 object-cover" />
                <div className='flex flex-col items-center justify-center flex-1'>
                  <p className='font-semibold text-xl'>Total Trip</p>
                  <p className='font-semibold'>20</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {isProfileModalOpen && <ViewProfileDetails isOpen={isProfileModalOpen} onClose={handleViewProfileDetails} user={user}/>}
      {isEditProfileModalOpen && <EditProfile isOpen={isEditProfileModalOpen} onClose={handleEditProfile} user={user}/>}
    </div>
    
  );
}

export default Profile;
