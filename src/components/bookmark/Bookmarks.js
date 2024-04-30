import React, { useEffect, useState } from 'react'
import style from './bookmark.module.css'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { update_story } from '../../FileSlice'
import Userstory from '../userStory/Userstory'
import Addstory from '../Addstory/Addstory'
import Navbar from '../Navbar/Navbar'

function Bookmarks(props) {

  const dispatch = useDispatch()
  const [show, setshow] = useState(false)
  const isURL = (str) => {

    const urlPattern = /^(https?:\/\/)?([\w.]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/;
    return urlPattern.test(str);
  };

  return (
    <>
      {useSelector((state) => state.File_save.addstory) ? <><Addstory /></> : <></>}
      <Navbar />
      {useSelector((state) => state.File_save.yourstory) ? <></> : <div className={style.box}>
        <div className={style.text}>Your Bookmarks</div>
        <div style={{ marginTop: "2%", marginLeft: "5%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: '2rem', width: "100%" }}>
            {props.story.filter(num => props.bookmarks?.bookmark?.includes(num._id)).length === 0 && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginRight: "5%" }}><div className={style.noStory}>No stories Available</div></div>}
            {props.story.filter(num => props.bookmarks?.bookmark?.includes(num._id))?.map((obj, index) => (
              <>
                {show ? <></> : index < 4 && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => (console.log("ll"), dispatch(update_story(obj, true)))}>
                  <p className={style.heading} >{obj.heading[0]}</p>
                  <p className={style.description} >{obj.description[0]}</p>
                </div>)}
                {show && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => dispatch(update_story(obj, true))}>
                  <p className={style.heading} >{obj.heading[0]}</p>
                  <p className={style.description}>{obj.description[0]}</p>
                </div>)}
              </>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "2%", marginBottom: "2%" }}>
          {show ? <></> : props.story.filter(num => props.bookmarks?.bookmark?.includes(num._id)).length > 4 && <div className={style.button} onClick={() => setshow(true)}>See more</div>}
        </div>
      </div>}
      {useSelector((state) => state.File_save.yourstory) ? <Userstory post={props.story} /> : <></>}
    </>
  )
}

export default Bookmarks