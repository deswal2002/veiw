import React, { useEffect } from 'react'
import Storyveiw from '../../components/showStory/Storyveiw'
import { useParams } from "react-router-dom";
import { getStoryById } from '../../apis/addstory';
import { useDispatch } from 'react-redux';
import { update } from '../../FileSlice';
import { useSelector } from 'react-redux';
function Story() {
  let {storyId} = useParams();
  const dispatch = useDispatch()
  useEffect(()=>{
    const run =async()=>{
      try {
        const response=await getStoryById(storyId)
        console.log(response.data.data)
        dispatch(update(response.data.data,true))
      } catch (error) {
        console.log(error)
      }
    }
    run()
  },[])
  console.log(storyId)
  return (
    <>
    {useSelector((state) => state.File_save.check)?<Storyveiw/>:<></>}
    
    </>
  )
}

export default Story