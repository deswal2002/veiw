import axios from "axios";
import Cookies from 'js-cookie';
const backend_url =process.env.REACT_APP_BACKEND_URL

export const getBookmarkByUser=async ()=>{
    try {
        const token=Cookies.get('token')
        const userName=Cookies.get('userName')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${backend_url}/bookmark/getBookmark/${userName}`);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updatebookmark= async (bookmark)=>{
    try {
        const token=Cookies.get('token')
        const userName=Cookies.get('userName')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(`${backend_url}/bookmark/updateBookmark/${userName}`,bookmark);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const postBookmark=async (bookmark)=>{
    try {
        const response = await axios.post(`${backend_url}/bookmark/postbookmark`,bookmark);
        return response
    } catch (error) {
        console.log(error)
    }
}