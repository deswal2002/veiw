import React, { useState, useEffect } from 'react'
import style from './Storyveiw.module.css'
import { useSelector } from 'react-redux'
import whiteCross from '../../assests/Image/whiteCross.svg'
import share from '../../assests/Image/share.svg'
import bookmark from '../../assests/Image/bookmark.svg'
import heart from '../../assests/Image/heart.svg'
import left from '../../assests/Image/left.svg'
import right from '../../assests/Image/right.svg'
import { useDispatch } from 'react-redux'
import { close_updates, update_reslog } from '../../FileSlice'
import { getBookmarkByUser } from '../../apis/bookmarkandlike'
import bluecross from '../../assests/Image/bluecross.svg'
import { updatebookmark } from '../../apis/bookmarkandlike'
import Cookies from 'js-cookie';
import redHeart from '../../assests/Image/redHeart.svg'
import { updateStory } from '../../apis/addstory'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Storyveiw() {
  const { storyId } = useParams()
  const navigate = useNavigate()
  const userName = Cookies.get('userName')
  const dispatch = useDispatch()
  const [story, setstory] = useState(useSelector((state) => state.File_save.StoryId))
  const [arrayIndex, setArrayIndex] = useState(0);
  const [bookMark, setbookMark] = useState(false)
  const [likes, setlike] = useState(false)
  const [bookmarkDetials, setbookmarkDetials] = useState({})
  const [likeNo, setlikeNo] = useState(story.like)
  useEffect(() => {
    const interval = setInterval(() => {
      if (arrayIndex < story?.slides?.length) {
        setArrayIndex(prevIndex => prevIndex + 1);
      }
    }, 8000);
    console.log(arrayIndex)
    if (arrayIndex === story?.slides?.length) {
      exit()
    }
    return () => clearInterval(interval);


  }, [arrayIndex, story?.slides?.length]);

  const slideCheck = (index) => {
    if (index < arrayIndex) {
      return style.si_finished
    } else if (index == arrayIndex) {
      return style.si
    } else {
      return style.start
    }
  }
  useEffect(() => {

    if (userName) {
      const run = async () => {
        const response = await getBookmarkByUser()
        setbookmarkDetials(response.data.data)
      }
      run()
    }

  }, [])


  useEffect(() => {

    if (bookmarkDetials?.bookmark?.includes(story._id)) {
      setbookMark(true)
    }
    if (bookmarkDetials?.like?.includes(story._id)) {
      setlike(true)
    }
  }, [bookmarkDetials])

  const back = () => {
    if (arrayIndex != 0) {
      setArrayIndex(arrayIndex - 1)
    }
  }

  const update = () => {
    if (arrayIndex != story.slides.length - 1) {
      setArrayIndex(arrayIndex + 1)
    }
  }
  const addBookmark = async () => {
    if (userName) {
      const present = bookmarkDetials.bookmark?.filter(num => num === story._id)

      if (present?.length !== 0) {
        const final = bookmarkDetials.bookmark?.filter(num => num !== story._id)
        setbookmarkDetials({ ...bookmarkDetials, [bookmark]: final })
        await updatebookmark({ userName: bookmarkDetials.userName, bookmark: final, like: bookmarkDetials.like })

      } else {
        const len = bookmarkDetials.bookmark?.length
        const final = bookmarkDetials.bookmark
        final[len] = story._id
        setbookmarkDetials({ ...bookmarkDetials, [bookmark]: final })
        await updatebookmark({ userName: bookmarkDetials.userName, bookmark: final, like: bookmarkDetials.like })

      }
      setbookMark(!bookMark)
    } else {
      dispatch(close_updates())
      navigate("/")
      dispatch(update_reslog("Login"))
    }

  }
  const addLike = async () => {
    if (userName) {
      const present = bookmarkDetials.like?.filter(num => num === story._id)
      console.log(present)
      if (present?.length !== 0) {
        const final = bookmarkDetials.like?.filter(num => num !== story._id)
        await updatebookmark({ userName: bookmarkDetials.userName, bookmark: bookmarkDetials.bookmark, like: final })
      } else {
        console.log("pp")
        const len = bookmarkDetials.like?.length
        const final = bookmarkDetials.like
        final[len] = story._id
        await updatebookmark({ userName: bookmarkDetials.userName, bookmark: bookmarkDetials.bookmark, like: final })

      }
      setlike(!likes)
      console.log(likes)
      if (likes === true) {
        if (likeNo !== 0) {
          const like = likeNo - 1
          setlikeNo(like)
          await updateStory(story._id, { userName: story.userName, slides: story.slides, heading: story.heading, description: story.description, image: story.image, category: story.category, bookmark: story.bookmark, like: like })
        }
      } else {
        const like = likeNo + 1
        setlikeNo(like)
        await updateStory(story._id, { userName: story.userName, slides: story.slides, heading: story.heading, description: story.description, image: story.image, category: story.category, bookmark: story.bookmark, like: like })

      }
    } else {
      dispatch(close_updates())
      navigate("/")
      dispatch(update_reslog("Login"))

    }

  }
  const exit = () => {
    if (storyId) {
      dispatch(close_updates())
      navigate("/")
    } else {
      dispatch(close_updates())
    }
  }

  return (
    <div className={style.black}>
      <div style={{ marginRight: "5%" }} className={style.left} onClick={() => back()}> <img src={left} /></div>
      <div className={style.story} style={{ backgroundImage: `url(${story.image === undefined ? "" : story?.image[arrayIndex]})` }}>
        <div style={{ width: "90%", display: "flex", marginTop: "8%", marginLeft: "5%", gap: "2%", height: "5%" }}>
          {story?.slides?.map((a, b) => (
            <div className={style.bar}>
              <div className={`${slideCheck(b)}`}></div>
            </div>
          ))}
        </div>

        <div className={style.crosslike}>
          <div onClick={() => exit()}><img src={whiteCross} className={style.cross} /></div>
          <div onClick={() => navigator.clipboard.writeText(`http://localhost:3000/Story/${story._id}`)}><img src={share} className={style.share} /></div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className={style.h1} onClick={() => back()}></div>
          <div className={style.h2} onClick={() => update()}></div>
        </div>
        <div>
          <div className={style.heading}>{story.heading === undefined ? "" : story?.heading[arrayIndex]}</div>
          <div className={style.description}>{story.description === undefined ? "" : story?.description[arrayIndex]}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: "4%", marginLeft: "15%", gap: "60%" }}>
          <div><img src={bookMark ? bluecross : bookmark} className={style.bookmark} onClick={() => addBookmark()} /></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={likes ? redHeart : heart} className={style.heart} onClick={() => addLike()} />
            <p className={style.no}>{likeNo}</p>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "5%" }} className={style.right} onClick={() => update()}><img src={right} /></div>
    </div>
  )
}

export default Storyveiw