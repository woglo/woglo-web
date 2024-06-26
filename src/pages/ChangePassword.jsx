import { Formik,Field, Form, ErrorMessage } from "formik";
import * as yup from "yup"; 
// import { postResetPass } from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { postResetPass } from "../services/api/user/apiMethods";


function ChangePassword() {
    const initialValues = {
        password:"",
        confirmPassword:""
    };
    const navigate = useNavigate()

    const validationSchema = yup.object({
        password:yup.string().min(6,"Password must be at least 6 characters").required("Required"),
        confirmPassword:yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password')
    });

    const onSubmit = (values)=>{
        postResetPass(values)
        .then((response)=>{
            const data = response.data;
            if(response.status===200){
                toast.success(data.message);
                navigate('/login');
            }else{
                toast.error(data.message);
            }
        })
    }
  return (
    <div className='flex h-screen ml-10'>
    <div className='w-[50%] md:flex flex-col mt-20 items-center hidden'>
        <p className='text-[#837D7D] font-bold text-6xl mb-14 '>Unlock Your Route to Success!</p>
        <img src="../public/images/bgImg/login.svg" alt="" />
    </div>
    <div className='w-[90%] flex  items-center md:w-[50%] '>
    <div className='md:ml-36 md:-mt-10'>
        <p className='text-4xl font-bold'>Change Password</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className="mt-5 w-full md:w-[18.5rem]">
                <p className="text-[#837D7D]">New Password:</p>
                <Field className="mt-3 h-9 w-full border border-neutral-300" type="password" name="password" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
                <p className="mt-3 text-[#837D7D]">Confirm Password:</p>
                <Field className="mt-3 h-9 w-full border border-neutral-300" type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                <button className="mt-4 h-10 w-full bg-[#8B8DF2] text-white rounded-md" type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
    </div>
    </div>
  )
}

export default ChangePassword