import React, {  useState } from 'react'
import style from "./Addstory.module.css"
import cross from '../../assests/Image/cross.svg'
import Cookies from 'js-cookie';
import { Category } from '../../utils/Category';
import { postStory } from '../../apis/addstory';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { close_updates } from '../../FileSlice';
import { updateStory } from '../../apis/addstory';
function Addstory() {
    const userName = Cookies.get('userName')
    const dispatch = useDispatch()
    const state = useSelector((state) => state.File_save.StoryId)
    const [slideNo, setslideNo] = useState(1)
    const [error, seterror] = useState(false)
    const [slide, setslide] = useState({
        userName: userName,
        slides: state?.slides || [1, 2, 3],
        heading: state?.heading || [],
        description: state?.description || [],
        image: state?.image || [],
        category: state?.category || "",
        bookmark: false,
        like: state?.like || 0
    })

    const addstorys = async () => {
        
        if (!slide.userName ||
            !slide.slides ||
            !slide.heading ||
            !slide.description ||
            !slide.image ||
            !slide.category
        ) {
            seterror(!error)
            return;
        }
        if (state) {
            const response = await updateStory(state?._id, slide)
            if (response.data.message === "story details updated successfully") {
                dispatch(close_updates())
            }
        } else {
            const response = await postStory(slide)
            if (response.data.message === "client story save successfully") {
                dispatch(close_updates())
            }
        }
    }

    const newStory = (e) => {
        let h;
        if (e.target.name === 'description') {
            h = [...slide.description]
        }
        if (e.target.name === 'heading') {
            h = [...slide.heading]
        }
        if (e.target.name === 'image') {
            h = [...slide.image]
        }
        h[slideNo - 1] = e.target.value
        setslide({ ...slide, [e.target.name]: h })

    }

    const remove = () => {
        let addnewSlide = []
        for (let i = 0; i < slide.slides.length - 1; i++) {
            addnewSlide[i] = slide.slides[i]
        }
        setslide({ ...slide, slides: addnewSlide })

    }
    const add = () => {
        let addnewSlide = slide.slides
        addnewSlide[addnewSlide.length] = addnewSlide[addnewSlide.length - 1] + 1
        setslide({ ...slide, slides: addnewSlide })

    }


    return (
        <div className={style.black}>
            <div className={style.white}>
                <img src={cross} alt='cross' className={style.cross} onClick={() => dispatch(close_updates())} />
                <p className={style.slidenum} >Add upto 6 slides</p>
                <p className={style.feed}> Add story to feed</p>
                <div className={style.slide}>
                    <div className={style.slid}>
                        {state?.slide || slide.slides.map((obj) => (
                            <>

                                {obj < 4 && (<div className={style.box} style={{ border: obj === slideNo ? "2px solid #73ABFF" : "" }} onClick={() => setslideNo(obj)}><p style={{ fontSize: "1rem", fontWeight: "700" }}>Slide {obj}</p></div>)}
                                {obj > 3 && (<><div className={style.box1} style={{ border: obj === slideNo ? "2px solid #73ABFF" : "" }} onClick={() => setslideNo(obj)} ><div style={{ fontSize: "1rem", fontWeight: "700", marginLeft: "20%", marginTop: "20%" }}>Slide {obj}</div> <div className={style.smallcross} onClick={() => remove()}><img alt='cross' src={cross} style={{ width: "100%", marginLeft: "50%" }} onClick={() => remove()} /></div></div></>)}

                            </>
                        ))}

                        {slide.slides.length < 6 && (<div className={style.box} onClick={() => add()}><p style={{ fontSize: "1rem", fontWeight: "700" }}>Add +</p></div>)}
                    </div>
                    <div style={{ width: "100%", paddingTop: "5%" }}>
                        <div>
                            <span style={{ fontSize: "1.2rem", fontWeight: "700" }} className={style.head}>Heading :</span>
                            <input className={style.input} placeholder='Your heading' type='text' name='heading' onChange={(e) => newStory(e)} value={slide?.heading[slideNo - 1] ? slide.heading[slideNo - 1] : ""} />
                        </div>
                        <div style={{ marginTop: "3%" }}>
                            <label style={{ fontSize: "1.2rem", fontWeight: "700" }} className={style.head}>Description :</label>
                            <textarea className={style.input4} placeholder='Story Description' name='description' onChange={(e) => newStory(e)} value={slide?.description[slideNo - 1] ? slide.description[slideNo - 1] : ""}></textarea>
                        </div>
                        <div style={{ marginTop: "3%" }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "50vh" }} className={style.head}>Image :</span>
                            <input className={style.input2} placeholder='Add Image url' type='text' onChange={(e) => newStory(e)} name='image' value={slide?.image[slideNo - 1] ? slide.image[slideNo - 1] : ""} />
                        </div>
                        <div style={{ marginTop: "3%" }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: "700" }} className={style.head}>Category :</span>
                            <select className={style.input3} value={slide.category} type='text' name='category' onChange={(e) => setslide({ ...slide, [e.target.name]: e.target.value })}>
                                <option>Select category</option>
                                {Category.map((obj) => (
                                    <option>{obj}</option>
                                ))}
                            </select>
                            {error ? <p style={{ color: "red" }}>Fill all the detials</p> : <></>}
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", marginTop: "10%", width: "70vh" }}>
                    <div className={style.newbox} onClick={() => slideNo !== 0 ? setslideNo(slideNo - 1) : ""}>Previous</div>
                    <div className={style.newbox1} onClick={() => slideNo !== slide.slides.length ? setslideNo(slideNo + 1) : ""}>Next</div>
                    <div className={style.newbox2} onClick={() => addstorys()}>Post</div>
                </div>
            </div>
        </div>
    )
}

export default Addstory