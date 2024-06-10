import { toast } from "sonner";
import { api } from "./api";

export const apiCall = async(method,url,data)=>{
    try {
        let response;

        switch(method){
            case "post":
                response = await api.post(url,data);
                break;
            case "get":
                response = await api.get(url,data);
                break;
            case "put":
                response = await api.put(url,data);
                break;
            case "patch":
                response = await api.patch(url,data);
                break;
            case "delete":
                response = await api.delete(url);
                break;
            default:
                throw new Error("Invalid HTTP method");
        }
        return response;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
            //   toast.error("User is blocked");
            } else {
              toast.error(error.response.data.message); 
            }
          } else {
            toast.error("An error occurred"); 
          }
          throw error; 
        }
    
}