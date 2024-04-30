import React, { useEffect, useState } from 'react'
import style from './Seeallstory.module.css'
import food from "../../assests/Image/food.jpg"
import education from "../../assests/Image/education.png"
import health from "../../assests/Image/health.png"
import travel from "../../assests/Image/travel.png"
import all from "../../assests/Image/all.png"
import movie from "../../assests/Image/movie.jpg"
import { allStory } from '../../apis/addstory'
import Post from '../post/Post'
import { Category } from '../../utils/Category';
import Cookies from 'js-cookie';
import Userstory from '../userStory/Userstory'
import { useSelector } from 'react-redux'

function Seeallstory() {
  let news = 0
  const userName = Cookies.get('userName')
  const [post, setpost] = useState([])
  const [All, setAll] = useState(false)
  const [otherStory, setotherStory] = useState(false)
  const [storyName, setstoryName] = useState("")
  const detialStory = [
    {
      name: "food",
      image: food
    },
    {
      name: "travel",
      image: travel
    },
    {
      name: "health and fitness",
      image: health
    },
    {
      name: "education",
      image: education
    },
    {
      name: "movies",
      image: movie
    }
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await allStory();
        setpost(response.data.data)
      } catch (error) {
        console.log(error)
      };
    };

    fetchData();

  }, [userName, news, useSelector((state) => state.File_save.addstory)])
  if (useSelector((state) => state.File_save.update)) {
    news = news + 1;
  }
  return (
    <>

      <div className={style.sclored}>
        <div className={style.box} style={{ backgroundImage: `url(${all})`, border: All ? "5px solid #00ACD2" : "" }} onClick={() => (setAll(true), setotherStory(false))}>
          <div className={style.text}>All</div>
        </div>
        {detialStory.map((obj) => (
          <div className={style.box} style={{ backgroundImage: `url(${obj.image})`, border: otherStory && storyName == obj.name ? "5px solid #00ACD2" : "" }} onClick={() => (setotherStory(true), setstoryName(obj.name), setAll(false))}>
            <div className={style.text}>{obj.name}</div>
          </div>
        ))}
      </div>
      {userName && otherStory ? <></> : <Userstory post={post} name={storyName} />}
      {useSelector((state) => state.File_save.yourstory) ? <></> : otherStory ? <Post post={post} name={storyName} /> : <></>}
      {useSelector((state) => state.File_save.yourstory) ? <></> : otherStory ? <></> : Category.map((obj) => (
        <Post post={post} name={obj} />
      ))}
    </>
  )
}

export default Seeallstory