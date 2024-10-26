import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";


export function getUserDetails(token){
    const user = jwtDecode(token);
    return user;
}


export function useGetToken(){
    const token = useSelector(state=>state.user.token);
    
    const getAccessToken = () =>{
        return token || null;
    }

    return {getAccessToken};
}

