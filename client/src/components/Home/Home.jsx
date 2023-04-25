import React, { useEffect, useState } from 'react'

import Hero from './Hero'
import Navbar from './Navbar'
import About from './About'


const Home = () => {
  
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default Home