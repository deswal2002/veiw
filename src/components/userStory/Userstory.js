import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import style from './Userstory.module.css'
import { update, update_addstory } from '../../FileSlice'
import Cookies from 'js-cookie';
import box from '../../assests/Image/box.svg'
function Userstory(props) {
  const userName = Cookies.get('userName')
  const dispatch = useDispatch()
  const [show, setshow] = useState(false)
  const isURL = (str) => {
    const urlPattern = /^(https?:\/\/)?([\w.]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/;
    return urlPattern.test(str);
  };
  return (
    <>
      {props.post.filter(num => num.userName === userName).length === 0 ? <></> : <>
        <div className={style.box}>
          <div className={style.text}>Your Stories</div>
          <div className={style.top}>
            <div className={style.storys}>
              {props.post.filter(num => num.userName === userName)?.map((obj, index) => (
                <>
                  {show ? <></> : index < 4 && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => dispatch(update(obj, true))}>
                    <p className={style.heading} onDragLeave={() => console.log("ll")}>{obj.heading[0]}</p>
                    <p className={style.description}>{obj.description[0]}</p>
                    {userName === obj.userName && <div className={style.edit} onClick={() => dispatch(update_addstory(obj))}>
                      <div>
                        <img src={box} />
                      </div>
                      <div><p>Edit</p></div>
                    </div>}
                  </div>)}
                  {show && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => dispatch(update(obj, true))}>
                    <p className={style.heading} onDragLeave={() => console.log("ll")}>{obj.heading[0]}</p>
                    <p className={style.description}>{obj.description[0]}</p>
                    {userName === obj.userName && <div className={style.edit} onClick={() => dispatch(update_addstory(obj))}>
                      <div>
                        <img src={box} />
                      </div>
                      <div><p>Edit</p></div>
                    </div>}
                  </div>)}
                </>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "2%", marginBottom: "2%" }}>
            {show ? <></> : props.post.filter(num => num.userName === userName).length > 4 && <div className={style.button} onClick={() => setshow(true)}>See more</div>}
          </div>
        </div>
      </>}

    </>

  )
}

export default Userstory