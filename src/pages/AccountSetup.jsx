import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../helpers/cloudinaryUpload';
import { accountSetUp } from '../services/api/user/apiMethods';
import { toast } from 'sonner';
import HashLoader from "react-spinners/HashLoader";
import { useDispatch } from 'react-redux';
import { loginData } from '../utils/reducers/authSlice';

function AccountSetup() {
  const navigate = useNavigate()
    const initialValues = {
        phone: "",
        address: "",
        profileImage: null,
    };

    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
    
    const validationSchema = yup.object({
        phone: yup.string()
            .min(10, "Phone number must be 10 digits")
            .max(10, "Phone number must be 10 digits")
            .required("Required"),
        address: yup.string().required("Required"),
        profileImage: yup.mixed()
            .required("Required")
            .test(
                "fileSize",
                "File size is too large",
                value => value && value.size <= 1024 * 1024 // 1MB
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            ),
    });

    const onSubmit = async(values) => {
      setLoading(true)
        console.log(values);
        const uploadedImg = await uploadImageToCloudinary(values.profileImage)
        values.profileImage = uploadedImg
        try {
          accountSetUp(values).then((res)=>{
            const data = res.data
            if(res.status==200){
              console.log("data",data)
              dispatch(loginData(data.updatedUser))
              navigate('/cabs')
  
            }
          })
        } catch (error) {
          toast.error(error)
        } finally {
          setLoading(false)
        }
        
        console.log("uploadedImg",uploadedImg)
    };

    return (
        <div className='h-screen'>
            <p className='text-black mt-10 text-center font-bold text-4xl'>Finish Account Set-up</p>

            <div className='flex md:ml-10'>
                <div className='md:w-[50%] md:flex flex-col mt-20 hidden'>
                    <img className='w-[80%] -mt-6' src="../public/images/bgImg/acc setup.png" alt="" />
                </div>
                <div className='w-[100%] p-5 md:w-[50%] md:p-0'>
                    <div className='md:ml-36 mt-20'>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                            {({ setFieldValue }) => (
                                <Form className="mt-5 w-full md:w-[18.5rem]">
                                    <p className="text-[#837D7D]">Address:</p>
                                    <Field as="textarea" className="mt-3 h-24 w-full border border-neutral-300" name="address" />
                                    <ErrorMessage name="address" component="div" className="text-red-500" />
                                    <p className="mt-3 text-[#837D7D]">Phone:</p>
                                    <Field className="mt-3 h-9 w-full border border-neutral-300" type="number" name="phone" />
                                    <ErrorMessage name="phone" component="div" className="text-red-500" />
                                    {image && 
                                    <img className='w-28 h-28 border border-black ml-auto mr-auto mt-3 rounded-full' src={image} alt="" />
                                  }
                                    <p className="mt-3 text-[#837D7D]">Profile Image:</p>
                                    <div className="mt-3 w-full h-9 border border-neutral-300 relative rounded-md">
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
                                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                        />
                                        <label
                                            htmlFor="profileImage"
                                            className="absolute inset-0 w-full h-full bg-white flex items-center justify-center cursor-pointer rounded-md"
                                        >
                                            Choose an image
                                        </label>
                                    </div>
                                    <ErrorMessage name="profileImage" component="div" className="text-red-500" />
                                    <button className="mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md hover:shadow-md" type="submit" disabled={loading}>
                                    {loading ? <HashLoader size={20} className='mt-1' color="#ffffff" /> : "Continue"}
                                      </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSetup;
