import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase'
import Loading from '../Loading/Loading'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import logo from '../../assets/notimiser-logo.png'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => { setIsLoading(false) }, 1600);
  }, [])

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
        navigate("/dashboard");
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
      .then(async(res) => {
        setSubmitButtonDisabled(false)
        navigate("/dashboard")
        
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


  if (isLoading) {
    return (
      <div className="bg-background w-full overflow-hidden">
        <Loading />
      </div>
    )
  } else {
  return (
    <div className='h-screen sm:bg-pattern bg-cover bg-[#2abfff] flex flex-wrap overflow-x-hidden'>
      <div className="lg:w-[30%] sm:w-[80%] w-[90%] mx-auto my-20 justify-center">
      <img src={logo} alt="logo" className="mx-auto w-[30%]"/>
      <h1 className="flex justify-center text-4xl font-bold mx-auto p-5 text-white">Login</h1>
      <div className='flex-wrap justify-center mx-auto'>
      <input label="email" placeholder="Email" className='p-3 pl-5 text-lg bg-white border-2 border-white my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[100%]'  onChange={(event) => 
      setValues((prev) => ({ ...prev, email: event.target.value}))}/>
      <input label="password" placeholder="Password" className='p-3 pl-5 text-lg bg-white border-2 border-white my-1 rounded-lg text-[#2abfff] placeholder:text-[#2abfff] w-[100%]' onChange={(event) => 
      setValues((prev) => ({ ...prev, pass: event.target.value}))}/>
      <button disabled={submitButtonDisabled} onClick={handleSubmission} className='mt-5 p-3 w-[100%] border-[#04ffa4] rounded-lg border-2 bg-[#04FFA4] text-[#626060] font-extrabold text-xl'>Login</button>
      <button onClick={handleGoogleAuth} className=' my-2 mx-auto p-3 w-[100%] border-[#626060] rounded-lg border-2 bg-[#626060] text-white font-medium text-xl flex justify-center items-center'><FcGoogle/><p className='px-3'>Or sign-in with Google</p></button>
        <p className='my-3 text-center text-white text-lg'>
          Not a User? <span><Link to="/signup" className='text-black font-medium'>Register</Link></span>
        </p>
        <p className='my-20 text-center text-lg'><Link to="/">Return Home</Link></p>
      </div>

      <h3 className='text-red-700'>{errorMsg}</h3>
        </div>
    </div>
  )
}
}

export default Login