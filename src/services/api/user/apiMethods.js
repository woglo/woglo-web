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

//@des     Forget Password OTP
//method   POST

export const forgetOtpVerification = (otp)=>{
    return new Promise((resolve,reject)=>{
        try {
            console.log("Otp from apimethod",{otp})
            apiCall("post",userUrls.forgetOtp,otp)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in forget Otp"});
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

//@des     Login
//method   POST

export const login = (email,password)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.login,{email,password})
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

//@des     forget-password
//method   POST

export const forgetPassword = (email)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.forgetPassword,{email})
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in forgetPassword"});
        }
    });
}

//@des     change-password
//method   POST

export const postResetPass = (values)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.resetPassword,values)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in forgetPassword"});
        }
    });
}

//@des     Account Setup
//method   POST

export const accountSetUp = (values)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.accountSetUp,values)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in forgetPassword"});
        }
    });
}

//@des     My Profile
//method   GET

export const myProfile = (values)=>{
    return new Promise((resolve,reject)=>{
        try {
            const url = `${userUrls.myProfile}/${values}`
            apiCall("get",url,"")
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in My Profile"});
        }
    });
}

//@des     Edit Profile
//method   POST

export const editProfile = (values)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.editProfile,values)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in edirProfile"});
        }
    });
}

//@des     Add Vehicle
//method   POST

export const addVehicle = (values)=>{
    return new Promise((resolve,reject)=>{
        try {
            apiCall("post",userUrls.addVehicle,values)
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in addVehicle"});
        }
    });
}

//@des     My Vehicles
//method   GET

export const myVehicles = (userId)=>{
    return new Promise((resolve,reject)=>{
        try {
            const url = `${userUrls.myVehicles}/${userId}`
            apiCall("get",url,"")
            .then((response)=>{
                resolve(response);
            })
            .catch((err)=>{
                reject(err);
            })
        } catch (error) {
            resolve({status:500,message:"Error in My Vehicles"});
        }
    });
}