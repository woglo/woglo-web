import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import * as yup from "yup"
import OTPModal from '../components/Modals/OTPModal';
import { useState } from 'react';
import { forgetPassword } from '../services/api/user/apiMethods';

function ForgetPassword() {
    const [email,setEmail] = useState('');
    const [showOTPModal,setShowOTPModal] = useState(false);
    const initialValues = {
        email:""
    };
    
    const validationSchema = yup.object({
        email:yup.string().email("Invalid email address").required("Required")
    });
    const onSubmit = (values)=>{
       forgetPassword(values.email)
       .then((response)=>{
        const data = response.data;
        setEmail(values.email);
        if(response.status===200){
            setShowOTPModal(true);
            toast.success(data.message);
        }else{
            toast.error(data.message);
        }
    })
    };
  return (
    <div className='flex h-screen ml-10'>
        <div className='w-[50%] md:flex flex-col mt-20 items-center hidden'>
        <p className='text-[#837D7D] font-bold text-6xl mb-14 '>Unlock Your Route to Success!</p>
        <img src="../public/images/bgImg/login.svg" alt="" />
    </div>
    <div className='w-[90%] flex  items-center md:w-[50%] '>
      <div className='md:ml-36 md:mt-0'>
      <p className=' text-4xl font-bold'>Forget Password?</p>
      <p className='mt-7 text-[#837D7D]'>Enter your email</p>
        
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="mt-5 w-full md:w-[18.5rem]">
                <Field name="email" className="mt-3 h-9 w-full border border-neutral-300" type="text"  />
                <ErrorMessage name="email" component="div" className="text-red-500" />
            
                <button className=" mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md">Submit</button>
            </Form>
        </Formik>
        </div>
    </div>
        {showOTPModal && <OTPModal forgetOtp={true} email={email} onClose={()=>setShowOTPModal(false)} />}
    </div>
  )
}
export default ForgetPassword