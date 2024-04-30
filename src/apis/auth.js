import axios from "axios";
import { postBookmark } from "./bookmarkandlike";
const backend_url =process.env.REACT_APP_BACKEND_URL

export const register = async ({userName,password})=>{
    try {
        const response= await axios.post(`${backend_url}/auth/register`,{userName,password})
        if(response.data.message==='User registered successfully'){
            const resp=await postBookmark({userName:userName,bookmark:[],like:[]})
            if(resp.data.message==="client bookmark and likes are save successfully"){
                const res =await login({userName,password})
                return res
            } 
        }
    } catch (error) {
        console.log(error)
        return error.response.data
    }
    
}
 export const login= async ({userName,password})=>{
    try {
        
        const response= await axios.post(`${backend_url}/auth/login`,{userName,password})
        if(response.data.token){
            document.cookie = `userName=${userName}; path=/`;
            document.cookie = `token=${response.data.token}; path=/`;
        }
        return response.data
    } catch (error) {
        console.log(error)
    }
 }


