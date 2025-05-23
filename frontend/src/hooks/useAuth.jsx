import { useContext } from "react";
import { AuthContext } from "../Context/Authentication";

const useAuth = () =>{
    return useContext(AuthContext)
}

export default useAuth;