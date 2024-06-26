import { faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import { uploadImageToCloudinary } from '../../helpers/cloudinaryUpload';
import { editProfile } from '../../services/api/user/apiMethods';
import { toast } from 'sonner';
import { loginData } from '../../utils/reducers/authSlice';
import { useDispatch } from 'react-redux';

function EditProfile({ isOpen, onClose, user }) {
    const dispatch = useDispatch()
  const [image, setImage] = useState(user.profileImage);

  const initialValues = {
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address,
    ownership: user.ownershiptype,
    profileImage: user.profileImage,
    about:""
  };

  const validationSchema = yup.object({
    name: yup.string()
      .trim()
      .matches(/^[A-Za-z\s]+$/, "Name must contain only characters")
      .min(3, "Name must be at least 3 characters")
      .max(25, "Name cannot be more than 25 characters")
      .required("Required"),
    address: yup.string().required("Required").trim().min(10, "Invalid address"),
    phone: yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Required"),
      about:yup.string().trim().min(6,"Type something more")
  });

  const onSubmit = async(values) => {
    console.log('Form data', values);
    const uploadedImg = await uploadImageToCloudinary(values.profileImage)
        values.profileImage = uploadedImg
        try {
            editProfile(values).then((res)=>{
                const data = res.data
                if(res.status===200){
                    console.log("data",data)
                    dispatch(loginData(data.updatedUser))
                    toast.success("Profile updated !")

                }
            })
        } catch (error) {
            console.log(error)
        }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl rounded-lg shadow-xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      ariaHideApp={false}
    >
      <div className='bg-gray-100 p-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold text-gray-800'>Add Vehicle</h2>
          <button onClick={onClose} className='text-gray-600 hover:text-gray-800 transition-colors'>
            <FontAwesomeIcon icon={faMultiply} size='lg' />
          </button>
        </div>
      </div>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ setFieldValue }) => (
          <Form className='p-6'>
            <div className='flex flex-col sm:flex-row gap-6 mb-6'>
              <div className='flex flex-col items-center'>
                <img 
                  className='w-32 h-32 rounded-full object-cover border-4 border-gray-200' 
                  src={image} 
                  alt="Profile" 
                />
                <div className="mt-4 relative">
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("profileImage", file);
                      setImage(URL.createObjectURL(file));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="profileImage"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Change Photo
                  </label>
                </div>
              </div>
              
              <div className='flex-1 grid gap-4'>
                <div>
                  <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2' type="text" name="name" id="name" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100' type="email" name="email" id="email" disabled />
                </div>
                <div>
                  <label htmlFor="phone" className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2' type="text" name="phone" id="phone" />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2' type="text" name="address" id="address" />
                  <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="address" className='block text-sm font-medium text-gray-700 mb-1'>About</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2' type="text" name="about" id="about" />
                  <ErrorMessage name="about" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="ownership" className='block text-sm font-medium text-gray-700 mb-1'>Ownership Type</label>
                  <Field className='w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100' type="text" name="ownership" id="ownership" disabled />
                </div>
              </div>
            </div>
            
            <div className='flex justify-end mt-6'>
              <button type="button" onClick={onClose} className='mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'>Cancel</button>
              <button type="submit" className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'>Save Changes</button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EditProfile;