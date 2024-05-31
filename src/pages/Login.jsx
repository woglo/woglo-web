import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from "yup"
import { Link } from 'react-router-dom'

function Login() {
  const initialValues = {
    email:"",
    password:""
};

const validationSchema = yup.object({
        email:yup.string().email("Invalid email address").required("Required"),
        password:yup.string().min(6,"Password must be at least 6 characters").required("Required")
    });
    const onSubmit = () => {

          };

  return (
    <div className='flex h-screen ml-10'>
    <div className='w-[50%] flex flex-col mt-20 items-center hidden'>
        <p className='text-[#837D7D] font-bold text-6xl mb-14 '>Unlock Your Route to Success!</p>
        <img src="../public/images/bgImg/login.svg" alt="" />
    </div>
    <div className='w-[90%] flex justify-center items-center md:w-[50%] '>
      <div className='md:ml-36 md:mt-20'>
        <p className='text-5xl font-bold mb-10'>Login</p>
        <p className='text-[#795f5f] text-sm'>Welcome back! Please login to your account</p>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="mt-5 w-full md:w-[18.5rem]">
                <p className="text-[#837D7D]">Email:</p>
                <Field className="mt-3 h-9 w-full border border-neutral-300" type="text" name="email" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
                <p className="mt-3 text-[#837D7D]">Password:</p>
                <Field className="mt-3 h-9 w-full border border-neutral-300" type="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <Link className="flex mt-2 text-xs text-[#837D7D] w-full md:w-[96px]" to="/forget-password">Forget Password?</Link> 
                <button className="mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md hover:shadow-md" type="submit">Login</button>
                <Link className="flex mt-2 text-xs text-[#837D7D] w-full" to="/signup">New User? Signup</Link> 
            </Form>
        </Formik>
        </div>
    </div>
    </div>
  )
}

export default Login