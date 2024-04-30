import React, { useEffect, useState } from 'react'
import style from './Post.module.css'
import { useDispatch } from 'react-redux'
import { update, update_addstory } from '../../FileSlice'
import box from '../../assests/Image/box.svg'
import Cookies from 'js-cookie';

function Post(props) {

  const userName = Cookies.get('userName')
  const dispatch = useDispatch()
  const [show, setshow] = useState(false)
  const isURL = (str) => {

    const urlPattern = /^(https?:\/\/)?([\w.]+\.[a-zA-Z]{2,})(:[0-9]+)?(\/.*)?$/;
    return urlPattern.test(str);
  };
  return (
    <>

      <div className={style.box}>
        <div className={style.text} >Top Stories About {props.name}</div>
        <div className={style.top}>
          <div className={style.storys}>
            {props.post.filter(num => num.category === props.name).length === 0 && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginRight: "5%" }}><div className={style.noStory}>No stories Available</div></div>}
            {props.post.filter(num => num.category === props.name)?.map((obj, index) => (
              <>
                {show ? <></> : index < 4 && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => dispatch(update(obj, true))}>
                  <p className={style.heading} >{obj.heading[0]}</p>
                  <p className={style.description} >{obj.description[0]}</p>
                  {userName === obj.userName && <div className={style.edit} onClick={() => dispatch(update_addstory(obj))}>
                    <div>
                      <img src={box} />
                    </div>
                    <div><p>Edit</p></div>
                  </div>
                  }
                </div>)}
                {show && (<div className={style.box1} style={{ backgroundImage: isURL(obj.image[0]) ? `url(${obj?.image[0]})` : `url('https://vectorified.com/images/white-website-icon-png-26.png')` }} onClick={() => dispatch(update(obj, true))}>
                  <p className={style.heading} >{obj.heading[0]}</p>
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
          {show ? <></> : props.post.filter(num => num.category === props.name).length > 4 && <div className={style.button} onClick={() => setshow(true)}>See more</div>}
        </div>
      </div>
    </>
  )
}

export default Post