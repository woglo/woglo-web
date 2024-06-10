import { userUrls } from "../../../constants/routes";
import { apiCall } from "./apiCalls";


//@des     Register
//method   POST

export const postRegister = (userData)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.register,userData)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Erron in postRegister"});
        }
    });
}

//@des     Verify OTP
//method   POST

export const postOTP = (otp)=>{
    return new Promise((resolve,reject)=>{
        try {
            console.log("Otp from apimethod",{otp})
            apiCall("post",userUrls.registerOtp,otp)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in postOTP"});
        }
    });
} 

//@des     Resend OTP
//method   POST

export const resendOTP = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.resendOtp,"")
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in postOTP"});
        }
    });
}