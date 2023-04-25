import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'

const Home = (props) => {
  const [userName, setUserName] = useState([{}])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
      }
      else {
        setUserName("")
      }
    })
  
  }, [])
  return (
    <div>
      <div>
        <nav className='flex justify-between'>

        <div className='text-5xl text-white'>
          Notimiser
        </div>

    <div className='flex'>
        <h1 className='m-2 p-2'>
          <Link to="/login">Login</Link>
        </h1>

        <h1 className='m-2 p-2'>
          <Link to="/signup">Signup</Link>
        </h1>
    </div>

        </nav>
        
        <p className='text-2xl'>
          Edit this homepage, this will be the landing page as of now we will use this for simpler nav
        </p>
        {/* <h2>
          {props.name ? `Welcome - ${props.name}` : "Login Please"}
        </h2> */}

      </div>
    </div>
  )
}

export default Home