import React, { useEffect ,useState} from 'react'
import Bookmarks from '../../components/bookmark/Bookmarks'
import { getBookmarkByUser } from '../../apis/bookmarkandlike'
import { allStory } from '../../apis/addstory'
import { useSelector } from 'react-redux'
import Storyveiw from '../../components/showStory/Storyveiw'
function Bookmark() {
  const [story,setstory]=useState([])
  const [bookmarks,setbookmark] =useState([])
  useEffect(()=>{
    const run =async ()=>{
      const response= await allStory()
      setstory(response.data.data)
      const res = await getBookmarkByUser()
      setbookmark(res.data.data)
    }
    run()
  },[])
  
  console.log(story)
  console.log(bookmarks)  
  
  return (
    <>
    {useSelector((state) => state.File_save.bookmarkstory) ?<Storyveiw/>:<></>}
    <Bookmarks story={story} bookmarks={bookmarks}/>
    </>
  )
}

export default Bookmark