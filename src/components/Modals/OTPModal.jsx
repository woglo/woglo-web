import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { forgetOtpVerification, postOTP, resendOTP } from '../../services/api/user/apiMethods';
import HashLoader from "react-spinners/HashLoader";

function OTPModal({ forgetOtp, email, onClose }){
    const [OTP, setOtp] = useState(['', '', '', '', '', '']);
    const [timer,setTimer] = useState(60)
    const [loading,setLoading] = useState(false)
    const [resendVisible,setResendVisible] = useState(false)
    const otpInputs = Array.from({ length: 6 }, (_, i) => i); 
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer((prevTimer)=>{
                if(prevTimer===0){
                    setResendVisible(true);
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer-1
            })
        },1000)
        return()=>clearInterval(interval);
    },[timer,resendVisible]);


    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...OTP];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && !OTP[index] && index > 0) {
            const newOtp = [...OTP];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleResend =()=>{
        setTimer(60);
        setResendVisible(false);
        setOtp(['', '', '', '', '', '']);
        resendOTP()
        .then((response)=>{
            const data = response.data;
            if(response.status===200){
                toast.success(data.message);
            }else{
                toast.error(data.message);
            }
        })
    }

    const handleSubmit = ()=>{
        setLoading(true)
        const otp = OTP.join('');
        if(!forgetOtp){
            try {
                postOTP({otp})
                .then((response)=>{
                    const data = response.data;
                    if(response.status===200){
                        toast.success(data.message);
                        localStorage.setItem('userId',data.newUser._id);
                        navigate('/login')
                    }else{
                        toast.error(data.error);
                    }
                })
            } catch (error) {
                toast.error(error)
            } finally {
                setLoading(false)
            }
       
        }else{
            try {
                forgetOtpVerification({otp})
                .then((response)=>{
                    const data = response.data;
                    if(response.status===200){
                        toast.success(data.message);
                        navigate('/change-password')
                    }else{
                        toast.error(data.error);
                    }
                })
            } catch (error) {
                toast.error(error)
              } finally {
                setLoading(false)
              }
           
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500 bg-opacity-50">
            <div className="bg-white p-8 w-[500px] rounded-lg shadow-md">
                <span className="absolute top-0 right-0 m-4 text-gray-700 cursor-pointer" onClick={onClose}>
                    &times;
                </span>
                <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
                <p>An OTP has been sent to {email}.</p>
                <p className="mb-4">Please enter the OTP below:</p>
                <div className="grid grid-cols-6 gap-4">
                    {otpInputs.map((index) => (
                        <input
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            type="text"
                            value={OTP[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength={1}
                            className="w-full h-12 border border-gray-300 rounded-md px-4 text-center"
                        />
                    ))}
                    {timer > 0 && (
                        <p className= "w-[190px] text-gray-600 mt-2">Resend OTP in {timer} seconds</p>
                    )}
                    {timer === 0 && (
                        <button
                            className="mt-2 text-blue-500 hover:underline focus:outline-none"
                            onClick={handleResend}
                            disabled={!resendVisible}
                        >
                            Resend
                        </button>
                    )}
                </div>
                <div className="flex flex-col items-center ">
                {OTP.every((digit) => !isNaN(parseInt(digit))) && OTP.length === 6 && (
                <button
                type="submit"
                onClick={handleSubmit}
                className="w-[9rem] mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                disabled={loading}
                >
                    {loading ? <HashLoader size={20} className='mt-1' color="#ffffff" /> : "Submit OTP"}
            
        </button>
    )}
                
                </div>
            </div>
        </div>
    );
}

export default OTPModal