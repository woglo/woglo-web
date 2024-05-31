import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from "yup"
import { Link } from 'react-router-dom'

function AccountSetup() {
    const initialValues = {
        email:"",
        password:"",
        address:""
    };
    
    const validationSchema = yup.object({
            email:yup.string().email("Invalid email address").required("Required"),
            password:yup.string().min(6,"Password must be at least 6 characters").required("Required"),
            address:yup.string().required("Required"),
        });
        const onSubmit = () => {
    
              };
    return (
        <div className=' h-screen'>
            <p className='text-[#837D7D] mt-10 text-center font-bold text-4xl '>Finish Account Set-up</p>

        
        <div className='flex ml-10'>
        <div className='w-[50%] flex flex-col mt-20 items-center'>
            <img className='w-[83%] -mt-4' src="../public/images/bgImg/acc setup.png" alt="" />
        </div>
        <div className='w-[50%]'>
          <div className='ml-36 mt-20'>
           
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue }) => (
                <Form className="mt-5 w-full md:w-[18.5rem]">
                    <p className="text-[#837D7D]">Address:</p>
                    <Field as="textarea" className="mt-3 h-24 w-full border border-neutral-300" name="address" />
                    <ErrorMessage name="address" component="div" className="text-red-500" />
                    <p className="mt-3 text-[#837D7D]">Phone:</p>
                    <Field className="mt-3 h-9 w-full border border-neutral-300" type="password" name="password" />
                    <ErrorMessage name="password" component="div" className="text-red-500" />
                    <p className="mt-3 text-[#837D7D]">Profile Image:</p>
                    <div className="mt-3 w-full h-9 border border-neutral-300 relative rounded-md">
            <input
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("profileImage", event.currentTarget.files[0]);
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
                    <button className="mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md hover:shadow-md" type="submit">Continue</button>
                </Form>
        )}
            </Formik>
            </div>
        </div>
        </div>
        </div>
      )
}

export default AccountSetup