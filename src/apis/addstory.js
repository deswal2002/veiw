import axios from "axios";
import Cookies from 'js-cookie';
const backend_url =process.env.REACT_APP_BACKEND_URL

export const postStory=async (story)=>{
    try {
        const token=Cookies.get('token')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(`${backend_url}/story/storyPost`,story);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const allStory=async ()=>{
    try{
        const response =await axios.get(`${backend_url}/story/storyGet`)
        return response;
    }catch(error){
        console.log(error)
    }
}

export const updateStory=async (storyId,story)=>{
    try {
        const token=Cookies.get('token')
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(`${backend_url}/story/updatestory/${storyId}`,story);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getStoryById=async (storyId)=>{
    try {
        const response = await axios.get(`${backend_url}/story/storyGetbyId/${storyId}`);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error)
    }
}
 

