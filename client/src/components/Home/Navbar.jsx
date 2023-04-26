import React from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { useState } from 'react'
import logo from '../../assets/notimiser-logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
    const [nav, setNav]=useState(true);

    const handleNav = () =>{
        setNav(!nav)
    }

  return (
    <div id="home" className='flex  flex-1 justify-between items-center sm:h-24 h-16 w-full mx-auto px-4 text-white bg-[#2abfff] '>
      <img src={logo} alt="logo" className='sm:h-20 h-10 sm:mx-10 mx-3' />
      <ul className='hidden md:flex font-medium text-md'>
        <a href="#home"><li className='p-4'>HOME</li></a>
        <Link to="/login"><li className='p-4'>LOGIN</li></Link>
        <Link to="/signup"><li className='p-4'>SIGNUP</li></Link>
        <a href="#about"><li className='p-4'>ABOUT</li></a>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {
            !nav? <AiOutlineClose size={20} /> :<AiOutlineMenu size={20}/>
        }
        </div>
      <div className={!nav? 'fixed left-0 top-0 w-[60%] border-r h-screen bg-[#ffe] ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <h1 className='w-full text-3xl font-bold m-7 text-[#2abfff]'>NOTIMISER</h1>
        <a href="#home"><li className='p-4 border-b border-[#2abfff] text-[#2abfff]'>HOME</li></a>
        <Link to="/login"><li className='p-4 border-b border-[#2abfff] text-[#2abfff]'>LOGIN</li></Link>
        <Link to="/signup"><li className='p-4 border-b border-[#2abfff] text-[#2abfff]'>REGISTER</li></Link>
        <a href="#about"><li className='p-4 border-b border-[#2abfff] text-[#2abfff]'>ABOUT</li></a>
      </div>
    </div>
  )
}

export default Navbar
