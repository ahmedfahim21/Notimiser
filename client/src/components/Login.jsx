import {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import InputControl from './InputControl'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { GoogleButton } from "react-google-button"
import {auth} from './../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {

  const navigate = useNavigate()

  const [values, setValues] = useState({
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
        navigate("/");
      }).catch((error) => {
        setErrorMsg(error.message);
      });
  }

  const handleSubmission = () => {
    if(!values.email || !values.pass) {
      setErrorMsg("Fill all fields !!")
      return
    }
    setErrorMsg("")
    console.log(values)

    if(values.email && values.pass) {
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async() => {
        setSubmitButtonDisabled(false)
        navigate("/")
        
      })
      .catch(
        (err) => {
          setSubmitButtonDisabled(false)
          setErrorMsg(err.message)
        }
      )
    }
    else
      handleGoogleAuth();
  }



  return (
    <div className='w-fit mx-auto p-10 '>
      <h1 className="flex justify-center text-5xl text-white m-2">Login</h1>

      <InputControl label="email" placeholder="Email"  onChange={(event) => 
      setValues((prev) => ({ ...prev, email: event.target.value}))}></InputControl>


      <InputControl label="password" placeholder="Password" onChange={(event) => 
      setValues((prev) => ({ ...prev, pass: event.target.value}))}></InputControl>

      <div>
        <button disabled={submitButtonDisabled} onClick={handleSubmission} className='m-2 p-3 w-[500px] rounded-lg border-2 border-[#45F662] text-[#45F662]'>Login</button>
        <GoogleButton onClick={handleGoogleAuth}/>
        <h3 className='text-red-700'>{errorMsg}</h3>
        <p>
          Not a User? <span><Link to="/signup">REGISTER</Link></span>
        </p>
      </div>

      <Link to="/">Return Home</Link>
    

    </div>
  )
}

export default Login