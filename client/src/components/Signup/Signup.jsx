import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputControl from '../InputControl/InputControl'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {auth} from '../../firebase'
import { GoogleButton } from "react-google-button"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: ""
  })

  const [errorMsg, setErrorMsg] = useState("")

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleGoogleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/dashboard");
      }).catch((error) => {
        setErrorMsg(error.message);
      });
  }
  
  const handleSubmission = () => {
    if(!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields !!")
      return
    }
    setErrorMsg("")
    console.log(values)

    if(values.email && values.pass) {
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async(res) => {
        setSubmitButtonDisabled(false)
        const user = res.user
        await updateProfile(user, {
          displayName: values.name,
        })

        navigate("/dashboard")
        console.log(user);
      })
      .catch(
        (err) => {
          setSubmitButtonDisabled(false)
          setErrorMsg(err.message)
        }
      )
    }else
      handleGoogleAuth();
  }

  return (
    <div className='w-fit mx-auto p-10'>
      <h1 className="flex justify-center text-5xl text-white m-2">Signup</h1>

      <InputControl label="text" placeholder="Name" onChange={(event) => setValues((prev) => ({...prev, name: event.target.value}))}></InputControl>
      <InputControl label="email" placeholder="Email" onChange={(event) => setValues((prev) => ({...prev, email: event.target.value}))}></InputControl>
      <InputControl label="password" placeholder="Password" onChange={(event) => setValues((prev) => ({...prev, pass: event.target.value}))}></InputControl>

      
      <button onClick={handleSubmission} disabled={submitButtonDisabled} className='m-2 p-3 w-[500px] rounded-lg border-2 border-[#45F662] text-[#45F662]'>Register</button>
      <GoogleButton onClick={handleGoogleAuth}/>
        <h3 className='text-red-700'>{errorMsg}</h3>
        <p>
          Already a User? <span><Link to="/login">LOGIN</Link></span>
        </p>
      

      <Link to="/">Return Home</Link>
    </div>
  )
}

export default Signup