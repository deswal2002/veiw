import React, { useState, useEffect } from 'react'
import style from './Navbar.module.css'
import Cookies from 'js-cookie';
import Register from '../register/Register';
import bookmark from '../../assests/Image/bookmark.svg'
import im from '../../assests/Image/im.jpg'
import vector from '../../assests/Image/vector.svg'
import { useDispatch, useSelector } from 'react-redux'
import { close_updates, new_update, update_addstory, update_reslog, update_yourstory } from '../../FileSlice';
import { useNavigate } from 'react-router-dom'
import whitecross from '../../assests/Image/blackcross.svg'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = Cookies.get('userName')
  const resLog = useSelector((state) => state.File_save.reslog)
  const [show, setshow] = useState(false)
  const [resShow, setresShow] = useState(false)
  const name = useSelector((state) => state.File_save.name)

  const deleteCookie = () => {
    Cookies.remove('userName')
    Cookies.remove('token')
    setshow(false)
    dispatch(new_update(false))
  }
  useEffect(() => { }, [resLog, name])

  return (
    <>
      {resLog ? <><Register name={name} /></> : <></>}
      {userName ? <></> : resShow && <div className={style.newbox}>
        <img className={style.whitecross} src={whitecross} onClick={() => setresShow(false)} />
        <div className={style.login1} onClick={() => dispatch(update_reslog("Login"))}>Login</div>
        <div className={style.register1} onClick={() => dispatch(update_reslog("Register"))}>Register</div>
      </div>}
      <div className={style.navbar}>
        <p className={style.swip}>SwipTory</p>
        {userName ? <>

          <div className={style.b1} onClick={() => (console.log("ll"), navigate("/bookmark"))}>
            <div ><img src={bookmark} className={style.book} /></div>
            <div className={style.mark}>Bookmarks</div>
          </div>
          <div className={style.b2} onClick={() => dispatch(update_addstory())}>Add Story</div>
          <img src={im} className={style.image} />
          <img src={vector} className={style.vec} onClick={() => setshow(!show)} />
          {show ? <div className={style.box}>
            <img className={style.whitecross1} src={whitecross} onClick={() => setshow(false)} />
            <div style={{ display: "flex", flexDirection: "row", gap: "10%", height: "5%" }}>
              <div><img src={im} className={style.img} /></div>
              <div><p className={style.p}>{userName}</p></div>
            </div>
            <div className={style.yourStory} onClick={() => (dispatch(update_yourstory()), setshow(false))}>your Story</div>
            <div className={style.b3} onClick={() => dispatch(update_addstory())}>Add Story</div>
            <div onClick={() => (navigate("/bookmark"), dispatch(close_updates()), setshow(false))} className={style.bookmark1}>
              <div ><img src={bookmark} className={style.bookimg} /></div>
              <div className={style.mark}>Bookmarks</div>
            </div>
            <div className={style.log1} onClick={() => deleteCookie()}>Logout</div>
          </div> : <></>}
        </> : <><div className={style.register2} onClick={() => dispatch(update_reslog("Register"))}>Register Now</div>
          <div className={style.sign2} onClick={() => dispatch(update_reslog("Login"))}>Sign In</div>
          <div>
            <img className={style.vector1} onClick={() => setresShow(true)} src={vector} />

          </div>
        </>}

      </div>
    </>
  )
}

export default Navbar
