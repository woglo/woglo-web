import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup"
import { Link } from 'react-router-dom';
import { postRegister } from '../services/api/user/apiMethods';
import { toast } from 'sonner';
import OTPModal from '../components/Modals/OTPModal';

function Signup() {
  const [isOtpModalOpen,setIsOtpModalOpen] = useState(false)
  const [email,setEmail] = useState('')
    const initialValues = {
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        ownershipType:""
    }
    const validationSchema = yup.object({
        name:yup.string().trim().matches(/^[A-Za-z\s]+$/, "Name must contain only characters")
        .min(3,"Name must be at least 3 character").required("Required").max(25,"Name cannot be more than 25 characters"),
        email:yup.string().trim().email("Invalid email address").required("Required"),
        password:yup.string().min(6,"Password must be at least 6 characters").required("Required"),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
        ownershipType: yup.string()
        .oneOf(["single", "agency"], "You must select an ownership type")
        .required("Required"),
    })
        const onSubmit = (values) => {
          console.log("Data---",values)
          setEmail(values.email)
          postRegister(values).then((res)=>{
            const data = res.data
            if(res.status===200){
              setIsOtpModalOpen(true)
            }
          })
              };
    
      return (
        <div className='flex h-screen ml-10 '>
        <div className='w-[50%] flex flex-col mt-20 items-center hidden md:block'>
            <p className='text-[#837D7D] font-bold text-6xl mb-14'>Unlock Your Route to Success!</p>
            <img src="../public/images/bgImg/signup.png" alt="not" />
        </div>
        <div className='w-[90%] flex justify-center items-center md:w-[50%]'>
          <div className='md:ml-36 mt-10'>
            <p className='text-5xl font-bold mb-10'>Signup</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className=" w-full md:w-[18.5rem]">
            <p className="text-[rgb(131,125,125)]">Name:</p>
            <Field className="mt-3 h-9 w-full border border-neutral-300" type="text" name="name" />
            <ErrorMessage name="name" component="div" className="text-red-500" />
            <p className="text-[#837D7D]">Email:</p>
            <Field className="mt-3 h-9 w-full border border-neutral-300" type="text" name="email" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <p className="text-[#837D7D]">Password:</p>
            <Field className="mt-3 h-9 w-full border border-neutral-300" type="text" name="password" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
            <p className="text-[#837D7D]">Confirm Password:</p>
            <Field className="mt-3 h-9 w-full border border-neutral-300" type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
        <div className="mt-3">
          <label className="mr-4">
            <Field className=" mr-2" type="radio" name="ownershipType" value="single" />
            Single
          </label>
          <label>
            <Field className="ml-20 mr-2" type="radio" name="ownershipType" value="agency" />
            Agency
          </label>
          <ErrorMessage name="ownershipType" component="div" className="text-red-500" />
        </div>
            <button  type="submit" className="mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md hover:shadow-md">Signup</button>
            <Link className="flex mt-2 text-xs text-[#837D7D] w-full md:w-[196px]" to="/login">Already have an account? SignIn</Link>
            
            </Form>
            </Formik>
            </div>
        </div>
        {isOtpModalOpen && <OTPModal email={email} onClose={()=>setIsOtpModalOpen(false)}/>}
        </div>
      )
}

export default Signup