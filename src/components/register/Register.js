import React, { useState } from 'react'
import style from './Register.module.css'
import cross from '../../assests/Image/cross.svg'
import { login, register } from '../../apis/auth';
import { useDispatch } from 'react-redux'
import { close_updates, new_update } from '../../FileSlice';
import eye from '../../assests/Image/eye.png'
import closeeye from '../../assests/Image/closed-eyes.png'

function Register(props) {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [detials, setdetials] = useState({
        userName: "",
        password: ""
    })
    const [error, seterror] = useState("")
    const saveDetials = (e) => {
        setdetials({ ...detials, [e.target.name]: e.target.value })
    }
    const submit = async () => {
        if (detials.userName && detials.password) {
            let response
            if (props.name === 'Register') {
                response = await register({ ...detials })
            } else {
                response = await login({ ...detials })
            }
            dispatch(new_update(true))
            console.log(response?.errorMessage)
            if (response?.token) {
                dispatch(close_updates())
            }
            seterror(response?.errorMessage)
        } else {
            seterror("Fill all the detials")
        }
    }

    return (
        <div className={style.black}>
            <div className={style.white}>
                <img src={cross} className={style.cross} onClick={() => dispatch(close_updates())} />
                <div className={style.swiptory}><p className={style.p1}>{props.name} to SwipTory</p></div>
                <div className={style.box}>
                    <label className={style.l1}>Username</label>
                    <input name='userName' placeholder='Enter username' type='text' className={style.i1} onChange={(e) => saveDetials(e)} />
                    <label className={style.l2}>password</label>
                    <span onClick={() => setShowPassword(!showPassword)} className={style.eye}><img className={style.eye1} src={showPassword ? closeeye : eye}></img></span>
                    <input name='password' placeholder='Enter password' type={showPassword ? 'text' : 'password'} className={style.i2} onChange={(e) => saveDetials(e)} />
                    <p className={style.error}>{error}</p>
                    <div className={style.submit} onClick={() => submit()}>{props.name}</div>
                </div>
            </div>
        </div>
    )
}

export default Register