import React from 'react'
import logo from '../../assets/blue-logo.png'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='text-[#2abfff]' id="home">
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <img src={logo} alt='mim-logo' className='w-[20rem] mx-auto' />
            <div className='flex justify-center items-center'>
                
            </div>
            <p className='md:text-2xl text-xl text-bold text-gray-500 pt-5'>A web application that allows you to upload your boring PDF and generate a fun and convinient to read PDF
            </p>
            <Link to="/login"><button className='bg-[#2abfff] w-[200px] rounded-md font-medium my-6 mx-auto py-4 text-white'>Get Started</button></Link>

        </div>
      
    </div>
  )
}

export default Hero
