import React from 'react'
import Navbar from '../Navbar/Navbar'
import Seeallstory from '../allstory/Seeallstory'
import { useSelector } from 'react-redux'
import Storyveiw from '../showStory/Storyveiw'
import Addstory from '../Addstory/Addstory'
function Homes() {


  return (
    <>
      {useSelector((state) => state.File_save.check) ? <Storyveiw /> : <></>}
      {useSelector((state) => state.File_save.addstory) ? <><Addstory /></> : <></>}
      <Navbar />
      <Seeallstory />
    </>
  )
}

export default Homes